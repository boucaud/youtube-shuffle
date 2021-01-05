module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    port: 9999,
    proxy: {
      "/api": { target: "http://localhost:8080" },
    },
  },
};
