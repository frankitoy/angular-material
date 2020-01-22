// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { SocialLoginProviderType } from '../app/shared/models/social/social-login-provider-type.model';

export const environment = {
  production: false,
  api: 'https://9lmzarykcf.execute-api.ap-southeast-2.amazonaws.com',
  // api: 'http://localhost:48080/s4',
  appName: 'Zippycrowd',
  s3bucketUrl: 'https://s3-ap-southeast-2.amazonaws.com/staging.zippycrowd.com',
  // s3bucketUrl: 'http://localhost:48080/s3',
  socialLoginProvider: <SocialLoginProviderType>{
    fb: {
      id : '1613209142275342',
      shareUrl : {
        phone : 'https://www.facebook.com/dialog/share',
        pc : 'https://www.facebook.com/dialog/share'
      }
    },
    google: {
      id: '485710732956-8rj67gtihknj75gkpkpf4qv78fkhcumc.apps.googleusercontent.com'
    },
    linkedIn: {
      id: ''
    },
    messenger: {
      shareUrl: {
        phone: 'fb-messenger://share',
        pc: 'fb-messenger://share'
      }
    },
    whatsapp: {
      shareUrl: {
        phone: 'whatsapp://send',
        pc: 'https://web.whatsapp.com/send'
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
