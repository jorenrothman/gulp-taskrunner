module.exports = {
  entry: {
    js: "./src/js/site.js",
    scss: "./src/scss/base.scss"
  },
  out: {
    js: {
      path: "./dist/js",
      name: "bundle.js"
    },
    scss: {
      path: "./dist/css",
      name: "site.min.css"
    }
  },
  files: {
    js: "./src/js/**/*.js",
    scss: "./src/scss/**/*.scss"
  }
};
