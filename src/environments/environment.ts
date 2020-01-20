// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8000/api/v1',
  baseUrl_manage: 'http://localhost:8000/api/v1/manage/',
  baseUrl_build: 'http://localhost:8000/api/v1/build/',
  baseUrl_predict: 'http://localhost:8000/api/v1/predict/',
  baseUrl_smanage: 'http://localhost:8000/api/v1/smanage/',
  baseUrl_sbuild: 'http://localhost:8000/api/v1/sbuild/',
  baseUrl_search: 'http://localhost:8000/api/v1/search/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
