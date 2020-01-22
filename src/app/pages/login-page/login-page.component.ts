import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginProviderType } from '../../shared/enum/login-provider-type.enum';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SharedService } from 'app/shared/services/shared.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'zpc-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  isAuthenticating: boolean;
  LoginProviderType = LoginProviderType;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() { }

  cancelLogin() {
    this.router.navigate(['/home']);
  }

  socialSignIn(socialPlatform: LoginProviderType) {
    this.sharedService.setLogin(true);
    const socialPlatformProvider = socialPlatform ? GoogleLoginProvider.PROVIDER_ID : FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then((data) => {
      this.isAuthenticating = true;
      this.auth();
    });
  }

  auth(): void {
    this.sharedService.loginObs.subscribe((resData) => {
      if (resData) {
        if (!this.sharedService.getCookie('authToken')) {
          this.authService.authState.subscribe((res) => {
            this.userService.login(res).subscribe(({ response: { id, first_name, last_name }}: any) => {
              const data = {
                firstName: first_name,
                lastName: last_name,
                id
              };
              localStorage.setItem('user', JSON.stringify(data));
              this.sharedService.setCookie('authToken', res.authToken, 1);
              this.router.navigate(['/profile/about']);
            });
          });
        }
      }
    });
  }
}



