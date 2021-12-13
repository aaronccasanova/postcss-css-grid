/**
 * Note: Test are intentionally minimal as extensive testing
 * is done in the `format-css-grid` package:
 * https://github.com/aaronccasanova/format-css-grid/blob/main/src/grid-template-areas.test.ts
 */

const postcss = require("postcss");
const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("formats a single grid-template-areas row", async () => {
  const input = `
a {
  grid-template-areas: "a   b";
}
    `.trim();

  const output = `
a {
  grid-template-areas: "a b";
}
    `.trim();

  await run(input, output, {});
});

it("formats multiple grid-template-areas rows", async () => {
  const input = `
a {
  grid-template-areas: "aa b" "c dd";
}
  `.trim();

  const output = `
a {
  grid-template-areas:
    "aa b "
    "c  dd";
}
  `.trim();

  await run(input, output, {});
});

it("formats grid-template-areas with comments", async () => {
  const input = `
a {
  grid-template-areas:
    /* comment 1 */ "aa b" /* comment 2 */
    "c d";
}
  `.trim();

  const output = `
a {
  grid-template-areas:
    /* comment 1 */
    "aa b"
    /* comment 2 */
    "c  d";
}
  `.trim();

  await run(input, output, {});
});

it("formats with single quotes", async () => {
  const input = `
a {
  grid-template-areas:
    "aa b"
    "c d";
}
  `.trim();

  const output = `
a {
  grid-template-areas:
    'aa b'
    'c  d';
}
  `.trim();

  await run(input, output, { singleQuote: true });
});

it("formats with 4 space indentation", async () => {
  const input = `
a {
    grid-template-areas:
        "aa b"
        "c d";
}
  `.trim();

  const output = `
a {
    grid-template-areas:
        "aa b"
        "c  d";
}
  `.trim();

  await run(input, output, { tabWidth: 4 });
});
