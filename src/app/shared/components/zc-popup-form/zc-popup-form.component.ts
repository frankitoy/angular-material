import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillService } from 'app/shared/services/skill.service';
import { LoginProviderType } from '../../enum/login-provider-type.enum';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/services/shared.service';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'zpc-zc-popup-form',
  templateUrl: './zc-popup-form.component.html',
  styleUrls: ['./zc-popup-form.component.scss']
})
export class ZcPopupFormComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  professions: any;
  introClose: boolean;
  isAskOn: boolean;
  LoginProviderType = LoginProviderType;
  isClose: boolean = true; // temp fix
  skill: string;
  isAuthenticating: boolean;

  constructor(
    private skillService: SkillService,
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isAskOn = true;
    this.getProfessions();
    this.introClose = false;

    localStorage.setItem('ask', 'true');
  }

  handleTypeClick(type: boolean): void {
    if (type) {
      this.isAskOn = true;
      localStorage.setItem('ask', 'true');
    } else {
      this.isAskOn = false;
      localStorage.setItem('ask', 'false');
    }
  }
  handleClose(): void {
    this.isClose = !this.isClose;
    this.skill = '';
  }

  handleOnChange(value: string): void {
    localStorage.setItem('type', value);
    this.skill = value;
  }

  getProfessions(): void {
    this.skillService.getSkillsTitle().subscribe(data => {
      this.professions =  Array.of(data);
      this.professions = this.professions[0].response.skills;
    });
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
