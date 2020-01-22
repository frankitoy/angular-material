import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LoginOpt } from 'angularx-social-login';

import { environment } from '../../../environments/environment';

export function authServiceConfig() {
  const fbLoginOptions: LoginOpt = {
    // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages,user_friends',
    scope: 'email,user_friends',
    return_scopes: true,
    enable_profile_selector: true
  }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

  const googleLoginOptions: LoginOpt = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.socialLoginProvider.fb.id, fbLoginOptions)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.socialLoginProvider.google.id, googleLoginOptions)
      },
      // @TODO linkedin provider
      // {
      //   id: LinkedinLoginProvider.PROVIDER_ID,
      //   provider: new LinkedinLoginProvider()
      // },
    ]
  );
  return config;
}
