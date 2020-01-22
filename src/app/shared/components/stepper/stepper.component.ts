import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { WindowService } from '../../services/window.service';

import { Ask } from '../../models/ask/ask.model';
import { AskForm } from '../../models/forms/ask-form.model';
import { User } from '../../models/users/user.model';
import { StepperState } from '../../enum/stepper-state.enum';
import { environment } from '../../../../environments/environment';

declare var FB: any;

@Component({
  selector: 'zpc-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent implements OnInit, OnDestroy {

  @Input() askForm: AskForm;
  @Input() askFormGroup: FormGroup;
  @Input() askFriendsFormGroup: FormGroup;
  @Input() askInfo: Ask;
  @Input() currentUrl: string;
  @Input() currentUser: User;
  @Input() durationOptions: Array<string>;
  @Input() enabledAdditionalDetails: boolean;
  @Input() facebookLink: string;
  @Input() formGroupOptional: boolean;
  @Input() formEditable: boolean;
  @Input() getCrowd: boolean;
  @Input() professions: Array<string>;
  @Input() selectedIndex: number = 0;
  @Input() user: User;

  @Output() askFormUpdatedEmitted: EventEmitter<AskForm> = new EventEmitter<AskForm>();
  @Output() askMyCrowdEmitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() stepperStateEmitted: EventEmitter<StepperState> = new EventEmitter<StepperState>();

  public isLinear = true;
  public isSmallScreen: boolean = false;
  public StepperState = StepperState;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private windowService: WindowService, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).
    pipe(
      takeUntil(this._ngUnsubscribe),
      filter(result => !!result && !!result.matches)
    ).
    subscribe(_ => this.isSmallScreen = true);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  get title(): string {
    return `${this.user.first_name} ${this.user.last_name} on ZippyCrowd needs ${this.askInfo.title}`;
  }

  get description(): string {
    return `Need recommendations for a good ${this.askInfo.title}. Click here for more details and to recommend...`;
  }

  askFormUpdated($event): void {
    this.askFormUpdatedEmitted.emit($event);
  }

  askMyCrowd($event): void {
    $event.preventDefault();
    this.askMyCrowdEmitted.emit($event);
  }

  handleStepper(stepperState: StepperState): void {
    this.stepperStateEmitted.emit(stepperState);
  }

  handleFacebookShare($event): void {
    $event.preventDefault();
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            'og:url': this.currentUrl,
            'og:title': this.title,
            'og:description': this.description,
            'og:image': 'https://staging.zippycrowd.com/assets/img/social-cover.png',
            'og:site_name': 'can be anything'
          }
        })
      }// ,
    // callback
    // response => {
    //   if (response && !response.error_message) {
    //       // then get post content
    //       alert('successfully posted. Status id : '+response.post_id);
    //   } else {
    //       alert('Something went error.');
    //   }
    // }
    );
  }

  handleFacebookMessenger($event): void {
    $event.preventDefault();
    this.windowService.nativeWindow.open(`fb-messenger://share?link=${encodeURIComponent(this.currentUrl)}&app_id=${encodeURIComponent(environment.socialLoginProvider.fb.id)}`);
  }

  handleWhatsAppShare($event): void {
    $event.preventDefault();
    this.windowService.nativeWindow.open(`whatsapp://send?text=${encodeURIComponent(this.currentUrl)}&app_id=${encodeURIComponent(environment.socialLoginProvider.fb.id)}`);
  }
}
