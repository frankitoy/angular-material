import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { authServiceConfig } from '../config/auth-service.config';

@NgModule({
  imports: [
    CommonModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: authServiceConfig
    }
  ]
})
export class SocialPluginModule {}
