import { normalize } from "./normalizeJapaneseAddress.mjs";

const result = await normalize('北海道札幌市西区24-2-2-3-3');
console.log(result); // {"pref": "北海道", "city": "札幌市西区", "town": "二十四軒二条二丁目", "addr": "3-3"}
