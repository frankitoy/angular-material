// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('karma-junit-reporter'),
      require('karma-istanbul-threshold'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'json'],
      fixWebpackSourcePaths: true,
      dir: 'reports/test/coverage' // overriding default /coverage folder to place all test reports in the same base folder
    },
    istanbulThresholdReporter: {
      // TODO fix code coverage
      src: 'reports/test/coverage/coverage-final.json',
      reporters: ['text'],
      thresholds: {
        global: {
          statements: 0,
          branches: 0,
          lines: 0,
          functions: 0
        },
        each: {
          statements: 0,
          branches: 0,
          lines: 0,
          functions: 0
        }
      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['spec', 'junit', 'coverage-istanbul', 'istanbul-threshold'],
    specReporter: {
      suppressSkipped: true  // do not print information about skipped tests
    },
    junitReporter: {
      outputDir: 'reports/test/junit'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
