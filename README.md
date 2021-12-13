# postcss-css-grid

[PostCSS] plugin to format CSS Grid.

[postcss]: https://github.com/postcss/postcss

Input:

```css
.aacc {
  grid-template-areas: "header header header"
                       "aside nav nav nav"
                       "aside article article"
                       "aside main main"
                       "footer footer footer";
}
```

Output:

```css
.aacc {
  grid-template-areas:
    "header header  header "
    "aside  nav     nav    "
    "aside  article article"
    "aside  main    main   "
    "footer footer  footer ";
}
```


## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-css-grid
```

**Step 2:** Check your project for an existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` key in the `package.json`
or `postcss` in the bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 2:** Check your project for an existing PostCSS config: `postcss.config.js`
in the project root, `"postcss"` key in the `package.json`
or `postcss` in the bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-css-grid'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

## Options (Optional)

While this plugin is intentionally opinionated, you can customize the formatting by providing any of the following options:

```js
module.exports = {
  plugins: [
    require("postcss-css-grid")({
      /**
       * Use single quotes instead of double quotes.
       * @default false
       */
      singleQuote: false,
      /**
       * Use tabs instead of spaces.
       * @default false
       */
      useTabs: false,
      /**
       * Number of spaces to use for indentation.
       * @default 2
       */
      tabWidth: 2,
    }),
  ],
};
```
