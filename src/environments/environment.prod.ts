import { SocialLoginProviderType } from '../app/shared/models/social/social-login-provider-type.model';

export const environment = {
  production: true,
  api: 'https://9lmzarykcf.execute-api.ap-southeast-2.amazonaws.com',
  appName: 'Zippycrowd',
  s3bucketUrl: 'https://s3-ap-southeast-2.amazonaws.com/staging.zippycrowd.com/data/',
  socialLoginProvider: <SocialLoginProviderType>{
    fb: {
      id : '1613209142275342',
      shareUrl : {
        phone : 'https://www.facebook.com/dialog/share',
        pc : 'https://www.facebook.com/dialog/share'
      },
    },
    google: {
      id: '485710732956-8rj67gtihknj75gkpkpf4qv78fkhcumc.apps.googleusercontent.com'
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
