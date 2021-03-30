const expect = (p1) => {
  return {
    toStrictEqual(p2) {
      const s1 = JSON.stringify(p1);
      const s2 = JSON.stringify(p2);
      if (s1 !== s2) {
        throw new Error(s2 + " is not " + s1);
      }
    }
  };
};

let ntest = 0;
let nfail = 0;
const test = async (name, func) => {
  ntest++;
  try {
    await func();
    if (!nfail) {
      console.log(name, "ok"); // , ntest - nfail, "tests passed");
    } else {
      console.log(name, "ok", nfail, "failed");
    }
  } catch (e) {
    nfail++;
    console.log(name, "NG!", nfail, "failed", e);
    Deno.exit(1);
  }
};

export { test, expect };
