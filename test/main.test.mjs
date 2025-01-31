import { normalize } from "../normalizeJapaneseAddress.mjs";
import { test, expect } from "./test.mjs";

test('大阪府堺市北区新金岡町4丁1−8', async () => {
  const res = await normalize('大阪府堺市北区新金岡町4丁1−8')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "堺市北区", "town": "新金岡町四丁", "addr": "1-8"})
})

test('大阪府堺市北区新金岡町４丁１ー８', async () => {
  const res = await normalize('大阪府堺市北区新金岡町４丁１ー８')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "堺市北区", "town": "新金岡町四丁", "addr": "1-8"})
})

test('和歌山県串本町串本1234', async () => {
  const res = await normalize('和歌山県串本町串本1234')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": "1234"})
})

test('和歌山県東牟婁郡串本町串本1234', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町串本1234')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": "1234"})
})

test('和歌山県東牟婁郡串本町串本千二百三十四', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町串本千二百三十四')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": "1234"})
})

test('和歌山県東牟婁郡串本町串本一千二百三十四', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町串本一千二百三十四')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": "1234"})
})

test('和歌山県東牟婁郡串本町串本一二三四', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町串本一二三四')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": "1234"})
})

test('京都府京都市中京区寺町通御池上る上本能寺前町488番地', async () => {
  const res = await normalize(
    '京都府京都市中京区寺町通御池上る上本能寺前町488番地',
  )
  expect(res).toStrictEqual({"pref": "京都府", "city": "京都市中京区", "town": "上本能寺前町", "addr": "488"})
})

test('京都府京都市中京区上本能寺前町488', async () => {
  const res = await normalize('京都府京都市中京区上本能寺前町488')
  expect(res).toStrictEqual({"pref": "京都府", "city": "京都市中京区", "town": "上本能寺前町", "addr": "488"})
})

test('大阪府大阪市中央区大手前２-１', async () => {
  const res = await normalize('大阪府大阪市中央区大手前２-１')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "大阪市中央区", "town": "大手前二丁目", "addr": "1"})
})

test('北海道札幌市西区二十四軒二条2丁目3番3号', async () => {
  const res = await normalize('北海道札幌市西区24-2-2-3-3')
  expect(res).toStrictEqual({"pref": "北海道", "city": "札幌市西区", "town": "二十四軒二条二丁目", "addr": "3-3"})
})

test('京都府京都市東山区大和大路2-537-1', async () => {
  const res = await normalize('京都府京都市東山区大和大路2-537-1')
  expect(res).toStrictEqual({"pref": "京都府", "city": "京都市東山区", "town": "大和大路二丁目", "addr": "537-1"})
})

test('京都府京都市東山区大和大路2丁目五百三十七-1', async () => {
  const res = await normalize('京都府京都市東山区大和大路2丁目五百三十七の1')
  expect(res).toStrictEqual({"pref": "京都府", "city": "京都市東山区", "town": "大和大路二丁目", "addr": "537-1"})
})

test('愛知県蒲郡市旭町17番1号', async () => {
  const res = await normalize('愛知県蒲郡市旭町17番1号')
  expect(res).toStrictEqual({"pref": "愛知県", "city": "蒲郡市", "town": "旭町", "addr": "17-1"})
})

test('北海道岩見沢市栗沢町万字寿町１−２', async () => {
  const res = await normalize('北海道岩見沢市栗沢町万字寿町１−２')
  expect(res).toStrictEqual({"pref": "北海道", "city": "岩見沢市", "town": "栗沢町万字寿町", "addr": "1-2"})
})

test('北海道久遠郡せたな町北檜山区北檜山１９３', async () => {
  const res = await normalize('北海道久遠郡せたな町北檜山区北檜山１９３')
  expect(res).toStrictEqual({"pref": "北海道", "city": "久遠郡せたな町", "town": "北檜山区北檜山", "addr": "193"})
})

test('京都府京都市中京区錦小路通大宮東入七軒町466', async () => {
  const res = await normalize('京都府京都市中京区錦小路通大宮東入七軒町466')
  expect(res).toStrictEqual({"pref": "京都府", "city": "京都市中京区", "town": "七軒町", "addr": "466"})
})

test('栃木県佐野市七軒町2201', async () => {
  const res = await normalize('栃木県佐野市七軒町2201')
  expect(res).toStrictEqual({"pref": "栃木県", "city": "佐野市", "town": "七軒町", "addr": "2201"})
})

test('京都府京都市東山区大和大路通三条下る東入若松町393', async () => {
  const res = await normalize(
    '京都府京都市東山区大和大路通三条下る東入若松町393',
  )
  expect(res).toStrictEqual({"pref": "京都府", "city": "京都市東山区", "town": "若松町", "addr": "393"})
})

test('長野県長野市長野東之門町2462', async () => {
  const res = await normalize('長野県長野市長野東之門町2462')
  expect(res).toStrictEqual({"pref": "長野県", "city": "長野市", "town": "長野", "addr": "東之門町2462"})
})

test('岩手県下閉伊郡普代村第１地割上村４３−２５', async () => {
  const res = await normalize('岩手県下閉伊郡普代村第１地割上村４３−２５')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "下閉伊郡普代村", "town": "第一地割字上村", "addr": "43-25"})
})

test('岩手県花巻市下北万丁目１７４−１', async () => {
  const res = await normalize('岩手県花巻市下北万丁目１７４−１')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "花巻市", "town": "下北万丁目", "addr": "174-1"})
})

test('岩手県花巻市十二丁目１１９２', async () => {
  const res = await normalize('岩手県花巻市十二丁目１１９２')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "花巻市", "town": "十二丁目", "addr": "1192"})
})

test('岩手県滝沢市後２６８−５６６', async () => {
  const res = await normalize('岩手県滝沢市後２６８−５６６')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "滝沢市", "town": "後", "addr": "268-566"})
})

test('青森県五所川原市金木町喜良市千苅６２−８', async () => {
  const res = await normalize('青森県五所川原市金木町喜良市千苅６２−８')
  expect(res).toStrictEqual({"pref": "青森県", "city": "五所川原市", "town": "金木町喜良市", "addr": "千苅62-8"})
})

test('岩手県盛岡市盛岡駅西通２丁目９番地１号', async () => {
  const res = await normalize('岩手県盛岡市盛岡駅西通２丁目９番地１号')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "盛岡市", "town": "盛岡駅西通二丁目", "addr": "9-1"})
})

test('岩手県盛岡市盛岡駅西通２丁目９の１', async () => {
  const res = await normalize('岩手県盛岡市盛岡駅西通２丁目９の１')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "盛岡市", "town": "盛岡駅西通二丁目", "addr": "9-1"})
})

test('岩手県盛岡市盛岡駅西通２の９の１', async () => {
  const res = await normalize('岩手県盛岡市盛岡駅西通２の９の１')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "盛岡市", "town": "盛岡駅西通二丁目", "addr": "9-1"})
})

test('東京都文京区千石4丁目15－7', async () => {
  const res = await normalize('東京都文京区千石4丁目15-7')
  expect(res).toStrictEqual({"pref": "東京都", "city": "文京区", "town": "千石四丁目", "addr": "15-7"})
})

test('東京都文京区千石四丁目15－7', async () => {
  const res = await normalize('東京都文京区千石四丁目15-7')
  expect(res).toStrictEqual({"pref": "東京都", "city": "文京区", "town": "千石四丁目", "addr": "15-7"})
})

test('東京都文京区千石4丁目15－7', async () => {
  const res = await normalize('東京都文京区千石4丁目15－7')
  expect(res).toStrictEqual({"pref": "東京都", "city": "文京区", "town": "千石四丁目", "addr": "15-7"})
})

test('東京都 文京区千石4丁目15－7', async () => {
  const res = await normalize('東京都 文京区千石4丁目15－7')
  expect(res).toStrictEqual({"pref": "東京都", "city": "文京区", "town": "千石四丁目", "addr": "15-7"})
})

test('東京都文京区 千石4丁目15－7', async () => {
  const res = await normalize('東京都文京区 千石4丁目15－7')
  expect(res).toStrictEqual({"pref": "東京都", "city": "文京区", "town": "千石四丁目", "addr": "15-7"})
})

test('東京都文京区千石4-15-7 ', async () => {
  const res = await normalize('東京都文京区千石4-15-7 ')
  expect(res).toStrictEqual({"pref": "東京都", "city": "文京区", "town": "千石四丁目", "addr": "15-7"})
})

test('和歌山県東牟婁郡串本町串本 833', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町串本 833')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": " 833"})
})

test('和歌山県東牟婁郡串本町串本　833', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町串本　833')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "串本", "addr": "　833"})
})

test('東京都世田谷区上北沢４の９の２', async () => {
  const res = await normalize('東京都世田谷区上北沢４の９の２')
  expect(res).toStrictEqual({"pref": "東京都", "city": "世田谷区", "town": "上北沢四丁目", "addr": "9-2"})
})

test('東京都品川区東五反田２丁目５－１１', async () => {
  const res = await normalize('東京都品川区東五反田２丁目５－１１')
  expect(res).toStrictEqual({"pref": "東京都", "city": "品川区", "town": "東五反田二丁目", "addr": "5-11"})
})

test('東京都世田谷区上北沢四丁目2-1', async () => {
  const res = await normalize('東京都世田谷区上北沢四丁目2-1')
  expect(res).toStrictEqual({"pref": "東京都", "city": "世田谷区", "town": "上北沢四丁目", "addr": "2-1"})
})

test('東京都世田谷区上北沢4-2-1', async () => {
  const res = await normalize('東京都世田谷区上北沢4-2-1')
  expect(res).toStrictEqual({"pref": "東京都", "city": "世田谷区", "town": "上北沢四丁目", "addr": "2-1"})
})

test('東京都世田谷区上北沢４ー２ー１', async () => {
  const res = await normalize('東京都世田谷区上北沢４ー２ー１')
  expect(res).toStrictEqual({"pref": "東京都", "city": "世田谷区", "town": "上北沢四丁目", "addr": "2-1"})
})

test('東京都世田谷区上北沢４－２－１', async () => {
  const res = await normalize('東京都世田谷区上北沢４－２－１')
  expect(res).toStrictEqual({"pref": "東京都", "city": "世田谷区", "town": "上北沢四丁目", "addr": "2-1"})
})

test('東京都品川区西五反田2丁目31-6', async () => {
  const res = await normalize('東京都品川区西五反田2丁目31-6')
  expect(res).toStrictEqual({"pref": "東京都", "city": "品川区", "town": "西五反田二丁目", "addr": "31-6"})
})

test('東京都品川区西五反田2-31-6', async () => {
  const res = await normalize('東京都品川区西五反田2-31-6')
  expect(res).toStrictEqual({"pref": "東京都", "city": "品川区", "town": "西五反田二丁目", "addr": "31-6"})
})

test('大阪府大阪市此花区西九条三丁目２－１６', async () => {
  const res = await normalize('大阪府大阪市此花区西九条三丁目２－１６')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "大阪市此花区", "town": "西九条三丁目", "addr": "2-16"})
})

test('大阪府大阪市此花区西九条三丁目2番16号', async () => {
  const res = await normalize('大阪府大阪市此花区西九条三丁目2番16号')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "大阪市此花区", "town": "西九条三丁目", "addr": "2-16"})
})

test('大阪府大阪市此花区西九条3-2-16', async () => {
  const res = await normalize('大阪府大阪市此花区西九条3-2-16')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "大阪市此花区", "town": "西九条三丁目", "addr": "2-16"})
})

test('大阪府大阪市此花区西九条３丁目２－１６', async () => {
  const res = await normalize('大阪府大阪市此花区西九条３丁目２－１６')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "大阪市此花区", "town": "西九条三丁目", "addr": "2-16"})
})

test('大阪府大阪市此花区西九条3-2-16', async () => {
  const res = await normalize('大阪府大阪市此花区西九条3-2-16')
  expect(res).toStrictEqual({"pref": "大阪府", "city": "大阪市此花区", "town": "西九条三丁目", "addr": "2-16"})
})

test('千葉県鎌ケ谷市中佐津間２丁目１５－１４－９', async () => {
  const res = await normalize('千葉県鎌ケ谷市中佐津間２丁目１５－１４－９')
  expect(res).toStrictEqual({"pref": "千葉県", "city": "鎌ヶ谷市", "town": "中佐津間二丁目", "addr": "15-14-9"})
})

test('岐阜県不破郡関ケ原町関ヶ原１７０１−６', async () => {
  const res = await normalize('岐阜県不破郡関ケ原町関ヶ原１７０１−６')
  expect(res).toStrictEqual({"pref": "岐阜県", "city": "不破郡関ケ原町", "town": "関ケ原", "addr": "1701-6"})
})

test('岐阜県関ケ原町関ヶ原１７０１−６', async () => {
  const res = await normalize('岐阜県関ケ原町関ヶ原１７０１−６')
  expect(res).toStrictEqual({"pref": "岐阜県", "city": "不破郡関ケ原町", "town": "関ケ原", "addr": "1701-6"})
})

test('東京都町田市木曽東4丁目14-イ22', async () => {
  const res = await normalize('東京都町田市木曽東4丁目14-イ22')
  expect(res).toStrictEqual({"pref": "東京都", "city": "町田市", "town": "木曽東四丁目", "addr": "14-イ22"})
})

test('東京都町田市木曽東4丁目14-イ22', async () => {
  const res = await normalize('東京都町田市木曽東4丁目14ーイ22')
  expect(res).toStrictEqual({"pref": "東京都", "city": "町田市", "town": "木曽東四丁目", "addr": "14-イ22"})
})

test('東京都町田市木曽東4丁目14-イ22', async () => {
  const res = await normalize('東京都町田市木曽東四丁目十四ーイ二十二')
  expect(res).toStrictEqual({"pref": "東京都", "city": "町田市", "town": "木曽東四丁目", "addr": "14-イ22"})
})

test('東京都町田市木曽東4丁目14-イ22', async () => {
  const res = await normalize('東京都町田市木曽東四丁目１４ーイ２２')
  expect(res).toStrictEqual({"pref": "東京都", "city": "町田市", "town": "木曽東四丁目", "addr": "14-イ22"})
})

test('東京都町田市木曽東4丁目14のイ22', async () => {
  const res = await normalize('東京都町田市木曽東四丁目１４のイ２２')
  expect(res).toStrictEqual({"pref": "東京都", "city": "町田市", "town": "木曽東四丁目", "addr": "14-イ22"})
})

test('岩手県花巻市南万丁目127', async () => {
  const res = await normalize('岩手県花巻市南万丁目127')
  expect(res).toStrictEqual({"pref": "岩手県", "city": "花巻市", "town": "南万丁目", "addr": "127"})
})

test('和歌山県東牟婁郡串本町田並1512', async () => {
  const res = await normalize('和歌山県東牟婁郡串本町田並1512')
  expect(res).toStrictEqual({"pref": "和歌山県", "city": "東牟婁郡串本町", "town": "田並", "addr": "1512"})
})

test('神奈川県川崎市多摩区東三田1-2-2', async () => {
  const res = await normalize('神奈川県川崎市多摩区東三田1-2-2')
  expect(res).toStrictEqual({"pref": "神奈川県", "city": "川崎市多摩区", "town": "東三田一丁目", "addr": "2-2"})
})
