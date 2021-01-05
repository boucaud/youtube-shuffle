const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
    config.plugin("CompressionPlugin").use(CompressionPlugin);

    config.plugin("VuetifyLoaderPlugin").tap(() => [
      {
        match(originalTag, { kebabTag, camelTag }) {
          if (kebabTag.startsWith("core-")) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(
                4
              )}.vue'`,
            ];
          }
        },
      },
    ]);
  },
  devServer: {
    port: 9999,
    proxy: {
      "/api": { target: "http://localhost:8080" },
    },
  },
};
