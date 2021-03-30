import {
  kanji2number,
  findKanjiNumbers,
} from './japaneseNumeral.mjs'
//const tmpdir = path.join(os.tmpdir(), 'normalize-japanese-addresses')
import dict from './dict.mjs'

const endpoint = 'https://geolonia.github.io/japanese-addresses/api/ja'

const kan2num = (string/*: string*/) => {
  const kanjiNumbers = findKanjiNumbers(string)
  for (let i = 0; i < kanjiNumbers.length; i++) {
    // @ts-ignore
    string = string.replace(kanjiNumbers[i], kanji2number(kanjiNumbers[i]))
  }

  return string
}

const zen2han = (str/*: string*/) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９ー−]/g, (s) => {
    if ('ー' === s || '−' === s) {
      return '-'
    } else {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    }
  })
}

export /*interface*/class NormalizeResult {
  pref/*: string*/
  city/*: string*/
  town/*: string*/
  addr/*: string*/
}

export const normalize/*: (input: string) => Promise/*<NormalizeResult>*/ = async (address) => {
  let addr = address

  // 都道府県名の正規化

  const responsePrefs = await fetch(`${endpoint}.json`)
  const prefectures = await responsePrefs.json()
  const prefs = Object.keys(prefectures)

  let pref = '' // 都道府県名
  addr = addr.trim()
  for (let i = 0; i < prefs.length; i++) {
    const _pref = prefs[i].replace(/(都|道|府|県)$/, '') // `東京` の様に末尾の `都府県` が抜けた住所に対応
    const reg = new RegExp(`^${_pref}(都|道|府|県)`)
    if (addr.match(reg)) {
      pref = prefs[i]
      addr = addr.substring(pref.length) // 都道府県名以降の住所
      break
    }
  }

  if (!pref) {
    throw new Error("Can't detect the prefecture.")
  }

  // 市区町村名の正規化

  const cities = prefectures[pref]

  // 少ない文字数の地名に対してミスマッチしないように文字の長さ順にソート
  cities.sort((a/*: string*/, b/*: string*/) => {
    return b.length - a.length
  })

  let city = '' // 市区町村名
  addr = addr.trim()
  for (let i = 0; i < cities.length; i++) {
    if (0 === dict(addr).indexOf(dict(cities[i]))) {
      city = cities[i]
      addr = addr.substring(cities[i].length) // 市区町村名以降の住所
      break
    } else {
      // 以下 `xxx郡` が省略されているケースに対する対応
      if (0 < cities[i].indexOf('郡')) {
        // `郡山市` のように `郡` で始まる地名はスキップ
        const _city = cities[i].replace(/.+郡/, '')
        if (0 === dict(addr).indexOf(dict(_city))) {
          city = cities[i]
          addr = addr.substring(_city.length) // 市区町村名以降の住所
          break
        }
      }
    }
  }

  if (!city) {
    throw new Error("Can't detect the city.")
  }

  // 町丁目以降の正規化

  const responseTowns = await fetch(
    `${endpoint}/${encodeURI(pref)}/${encodeURI(city)}.json`,
  )
  const towns = await responseTowns.json()

  // 少ない文字数の地名に対してミスマッチしないように文字の長さ順にソート
  towns.sort((a/*: string*/, b/*: string*/) => {
    return b.length - a.length
  })

  const units = '(丁目|丁|番町|条|軒|線|の町|号|地割|の|[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━])'

  let town = ''
  addr = addr.trim()

  for (let i = 0; i < towns.length; i++) {
    const regex1 = new RegExp(
      towns[i].replace(
        /([0-9]+)(丁目|丁|番町|条|軒|線|の町|号|地割|の|[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━])/gi,
        `$1${units}`,
      ),
    )

    const reg = new RegExp(`[〇一二三四五六七八九十百千]+${units}`, 'g')

    const _town = dict(towns[i]).replace(reg, (s) => {
      return kan2num(s) // API からのレスポンスに含まれる `n丁目` 等の `n` を数字に変換する。
    })

    const regex2 = new RegExp(
      _town.replace(
        /([0-9]+)(丁目?|番町|条|軒|線|の町?|号|地割|[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━])/gi,
        `$1${units}`,
      ),
    )

    const match1 = dict(zen2han(addr)).match(regex1) // n丁目などのnの部分を漢数字にした場合のパターンマッチ
    const match2 = dict(zen2han(addr)).match(regex2) // n丁目などのnの部分を数字にした場合のパターンマッチ
    const match3 = kan2num(dict(zen2han(addr))).match(regex1) // 入力側の住所内の数字を数字に変換してパターンマッチ
    const match4 = kan2num(dict(zen2han(addr))).match(regex2) // 入力側の住所内の数字を数字に変換してパターンマッチ

    const match = match1 || match2 || match3 || match4

    if (match) {
      town = towns[i].replace(/^大字/, '')
      const _m = addr.match(/字/g)

      if (_m && _m.length) {
        // 住所内に `字` がある場合、正規化でそれらを削除してしまっているので、その文字数分だけずれるのでそれを補正する。
        addr = addr.substring(dict(zen2han(addr)).lastIndexOf(match[0]) + match[0].length + _m.length) // 町丁目以降の住所
      } else {
        addr = addr.substring(dict(zen2han(addr)).lastIndexOf(match[0]) + match[0].length) // 町丁目以降の住所
      }
      break
    }
  }

  addr = zen2han(addr)

  addr = addr
    .replace(/^-/, '')
    .replace(/^目/, '') // `丁目`に対して`丁`がマッチして目が取り残される事例がある
    .replace(/^町/, '') // `の町`に対して`の`がマッチして`町`が取り残される事例がある
    .replace(/([(0-9〇一二三四五六七八九十百千]+)(番|番地)([0-9]+)号/, '$1-$3')
    .replace(/([0-9〇一二三四五六七八九十百千]+)番地/, '$1')
    .replace(/([0-9〇一二三四五六七八九十百千]+)の/g, '$1-')
    .replace(/([0-9〇一二三四五六七八九十百千]+)[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]/g, '$1-')
    .replace(/[-－﹣−‐⁃‑‒–—﹘―⎯⏤ーｰ─━]([0-9〇一二三四五六七八九十百千]+)/g, '-$1')
    .replace(/([0-9〇一二三四五六七八九十百千]+)(-([0-9〇一二三四五六七八九十百千]+))+/, (s) => { // 1-2-3 のようなケース
      return kan2num(s)
    })
    .replace(/([0-9〇一二三四五六七八九十百千]+)-/, (s) => { // `1-あ2` のようなケース
      return kan2num(s)
    })
    .replace(/-([0-9〇一二三四五六七八九十百千]+)/, (s) => { // `あ-1` のようなケース
      return kan2num(s)
    })
    .replace(/([0-9〇一二三四五六七八九十百千]+)$/, (s) => { // `串本町串本１２３４` のようなケース
      return kan2num(s)
    })

  return {
    pref,
    city,
    town,
    addr
  }
}
