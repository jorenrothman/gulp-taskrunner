"use strict";

const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const plugins = gulpLoadPlugins();
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const config = require("./src/config/settings");
const {
  addTask,
  addMultiTask
} = require("./src/config/gulp-helpers/task-functions")(gulp, plugins, config);

// Basic dev scripts
addTask("clean:dist", "clean-dist");
addTask("compile:js", "compile-js");
addTask("compile:scss", "compile-scss");
addMultiTask("compile:all", ["compile:js", "compile:scss"]);

gulp.task("browserSync:reload", done => {
  reload();
  done();
});

// Basic watch tasks
gulp.task("watch:all", () => {
  plugins.beer.server.start();
  browserSync(config.settings.browserSync);

  gulp.watch(
    [config.paths.files.scss],
    gulp.series("compile:scss", "browserSync:reload")
  );
  gulp.watch(
    [config.paths.files.js],
    gulp.series("compile:js", "browserSync:reload")
  );
});

// Basic release tasks
addMultiTask("release:all", ["clean:dist", "compile:js", "compile:scss"]);