# Zippycrowd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server
To make it run you need to generate a cert file.

Open terminal and run
`openssl genrsa -out key.pem 1024`
`openssl req -newkey rsa:1024 -new -key key.pem -out csr.pem`
`openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem`
`rm csr.pem`

Then go to the project root directory `zc-web-spa`

Run `ng serve --ssl --ssl-key *directory*/key.pem --ssl-cert *directory*/cert.pem` for a dev server. Navigate to `https://localhost:4209/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
