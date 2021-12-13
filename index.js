const { getGridTemplateAreas } = require("format-css-grid");

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (options = {}) => {
  return {
    postcssPlugin: "postcss-css-grid",
    OnceExit: (root) => {
      root.walkDecls("grid-template-areas", (decl) => {
        const { between, value: { raw } = {} } = decl.raws;

        const hasLeadingComment = between.includes("/*");
        const rawValue = hasLeadingComment ? between + raw : raw;

        const gridTemplateAreas = getGridTemplateAreas({
          /* Use `rawValue` if `grid-template-areas` has comments */
          value: raw ? rawValue : decl.value,
          singleQuote: options.singleQuote,
          startColumn: decl.source.start.column,
          useTabs: options.useTabs,
          tabWidth: options.tabWidth,
        });

        if (between.includes(":")) decl.raws.between = ":";

        decl.value = gridTemplateAreas;
      });
    },
  };
};

module.exports.postcss = true;
