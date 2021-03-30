# @geolonia/normalize-japanese-addresses-es

![build](https://github.com/geolonia/normalize-japanese-addresses/workflows/build/badge.svg)

オープンソースの住所正規化ライブラリです。

経産省の [IMI コンポーネントツール](https://info.gbiz.go.jp/tools/imi_tools/)のジオコーディングの仕組みからインスピレーションをうけて開発された[@geolonia/normalize-japanese-addresses](https://github.com/geolonia/normalize-japanese-addresses)をESモジュール化したものです。

## 使い方

ブラウザでテストする  
[https://code4sabae.github.io/normalize-japanese-addresses-es/test.html](https://code4sabae.github.io/normalize-japanese-addresses-es/test.html)  

### `normalize(address: string)`

住所を正規化します。

```javascript
<script type="module">
import { normalize } from "https://code4sabae.github.io/normalize-japanese-addresses-es/normalizeJapaneseAddress.mjs";

const result = await normalize('北海道札幌市西区24-2-2-3-3');
console.log(result); // {"pref": "北海道", "city": "札幌市西区", "town": "二十四軒二条二丁目", "addr": "3-3"}
</script>
```

## 注意

* この正規化エンジンは、住所の「名寄せ」を目的としており、たとえば京都の「通り名」は削除します。
  * 郵便や宅急便などに使用される住所としては、問題ないと考えています。
* この正規化エンジンは、町丁目及び小字レベルまでは対応していますが、それ以降（例: ）については対応しておりません。
* 住居表示が未整備の地域については全体的に苦手です。

### 貢献方法

プルリクエストや Issue はいつでも歓迎します。

## ライセンス、利用規約

- ソースコードのライセンスは MIT ライセンスです。
- ご利用に際しましては、できればソーシャルでのシェア、[Geolonia](https://geolonia.com/) へのリンクの設置などをしていただけると、開発者たちのモチベーションが上がると思います。

プルリクや Issue は大歓迎です。住所の正規化を工夫すれば精度があがりそうなので、そのあたりのアイディアを募集しています。
