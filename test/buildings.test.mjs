import { normalize } from "../normalizeJapaneseAddress.mjs";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { test, expect } from "./test.mjs";

const data = CSV.decode(Deno.readTextFileSync("./buildings.csv"));

for (let i = 0; i < data.length; i++) {
  if (data[i].length == 0) {
    continue;
  }
  const address = data[i][0].trim();

  await test(address, async () => {
    const res = await normalize(address);
    expect(!!res.pref).toStrictEqual(true);
    expect(!!res.city).toStrictEqual(true);
    // expect(!!res.town).toStrictEqual(true);
    expect(!!res.addr).toStrictEqual(true);
  })
}
