"use strict";

const gulp = require("./config/gulp-helpers/gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const plugins = gulpLoadPlugins();
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const config = require("./config/settings");
const {
  addTask,
  addMultiTask
} = require("./config/gulp-helpers/task-functions")(gulp, plugins, config);

// Basic dev scripts
addTask("clean:dist", "clean-dist");
addTask("compile:js", "compile-js");
addTask("compile:scss", "compile-scss");
addTask("flipping a table", "table-flip");
addTask("copy:images", "copy-images");
addTask("copy:fonts", "copy-fonts");
addTask("copy:vendor", "copy-vendor");
addMultiTask("compile:all", ["copy:vendor", "compile:js", "compile:scss"]);

gulp.task("browserSync:reload", done => {
  reload();
  done();
});

// Basic watch tasks
gulp.task("watch:all", () => {
  browserSync(config.settings.browserSync);

  gulp.watch(
    [config.paths.files.scss],
    gulp.series("compile:scss", "browserSync:reload")
  );
  gulp.watch(
    [config.paths.files.js],
    gulp.series("compile:js", "browserSync:reload")
  );
  gulp.watch(
    [config.paths.entry.img],
    gulp.series("copy:images")
  );
  gulp.watch(
    [config.paths.entry.font],
    gulp.series("copy:fonts")
  );
  gulp.watch(
    [config.paths.entry.vendor],
    gulp.series("copy:vendor")
  )
});

// Basic release tasks
addMultiTask("release:all", ["clean:dist", "compile:js", "compile:scss", "copy:images", "copy:fonts", "copy:vendor", "flipping a table"]);
