module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],

  plugins: [
    [
      "module-resolver",
      {
        'alias': {
          "@components": "./src/components",
          "@helpers": "./src/helpers",
          "@store": "./src/store",
        },
      },
    ],
  ],
};
