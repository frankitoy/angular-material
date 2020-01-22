import { AnyAction } from 'redux';

import { AskForm } from '../shared/models/forms/ask-form.model';

import { ApplicationActions } from '../actions/application.actions';
import { AskActions } from '../actions/ask.actions';
import { AskFormActions } from '../actions/ask-form.actions';
import { ProfessionActions } from '../actions/profession.actions';
import { SessionActions } from '../actions/session.actions';
import { UserActions } from '../actions/user.actions';

import { Ask } from '../shared/models/ask/ask.model';
import { User } from '../shared/models/users/user.model';
import { CrowdActions } from '../actions/crowd.actions';
import { Skills } from '../shared/models/skills/skills.model';
import { Relation } from '../shared/models/relation/relation.model';

export interface IAppState {
  ask: Ask;
  askForm: AskForm;
  askInfo: Ask;
  askPost: boolean;
  crowd: Array<User>;
  crowdOther: Array<User>;
  fbFriendsNotInMyCrowd: Object;
  getAsk: boolean;
  getCrowd: boolean;
  loadingProfession: boolean;
  loadingFbFriendsNotInMyCrowd: boolean;
  loggedIn: boolean;
  pageLoading: boolean;
  professions: Array<string>;
  updatedUser: boolean;
  updatingUser: boolean;
  user: User;
  skills: Skills;
  recommendations: Object;
  userReputation: Object;
  addCrowdToF1: User;
  userRelation: Relation;
  otherUser: User;
  fbFriend: any;
}

export const INITIAL_STATE: IAppState = {
  ask: undefined,
  askForm: undefined,
  askInfo: undefined,
  askPost: false,
  crowd: undefined,
  fbFriendsNotInMyCrowd: undefined,
  getAsk: false,
  getCrowd: false,
  loadingProfession: false,
  loadingFbFriendsNotInMyCrowd: false,
  loggedIn: false,
  pageLoading: false,
  professions: undefined,
  updatedUser: false,
  updatingUser: false,
  user: undefined,
  skills: undefined,
  recommendations: undefined,
  crowdOther: undefined,
  userReputation: undefined,
  addCrowdToF1: undefined,
  userRelation: undefined,
  otherUser: undefined,
  fbFriend: undefined
};

export function rootReducer(lastState: IAppState, action: AnyAction): IAppState {
  switch (action.type) {

    case ApplicationActions.PAGE_LOAD_START:
      return Object.assign({}, lastState, { pageLoading: true });

    case ApplicationActions.PAGE_LOAD_END:
      return Object.assign({}, lastState, { pageLoading: false });

    case AskActions.ASK_POST_START:
      return Object.assign({}, lastState, { askPost: true });

    case AskActions.ASK_POST_RESOLVE:
      return Object.assign({}, lastState, { askPost: false, ask: action.payload });

    case AskActions.ASK_POST_ERROR:
      return Object.assign({}, lastState, { askPost: false });

    case AskActions.GET_ASK_START:
      return Object.assign({}, lastState, { getAsk: true });

    case AskActions.GET_ASK_RESOLVE:
      return Object.assign({}, lastState, { getAsk: false, askInfo: action.payload });

    case AskActions.GET_ASK_ERROR:
      return Object.assign({}, lastState, { getAsk: false });

    case AskActions.RESET_ASK:
      return Object.assign({}, lastState, { ask: undefined });

    case CrowdActions.GET_CROWD_START:
      return Object.assign({}, lastState, { getCrowd: true });

    case CrowdActions.GET_CROWD_RESOLVE:
      return Object.assign({}, lastState, { getCrowd: false, crowd: action.payload });

    case AskFormActions.SAVE_ASK_FORM:
      return Object.assign({}, lastState, { askForm: action.payload });

    case ProfessionActions.LOAD_PROFESSION_START:
      return Object.assign({}, lastState, { loadingProfession: true });

    case ProfessionActions.LOAD_PROFESSION_END:
      return Object.assign({}, lastState, { loadingProfession: false });

    case ProfessionActions.LOAD_PROFESSION_RESOLVE:
      return Object.assign({}, lastState, { professions: action.payload });

    case SessionActions.GET_SESSION_START:
      return Object.assign({}, lastState, { loggedIn: true, user: action.payload });

    case SessionActions.LOGOUT_END:
      return Object.assign({}, lastState, INITIAL_STATE);

    case UserActions.USER_UPDATE_START:
      return Object.assign({}, lastState, { updatingUser: true });

    case UserActions.USER_UPDATE_RESOLVE:
      return Object.assign({}, lastState, { updatingUser: false, updatedUser: true, user: action.payload });

    case UserActions.USER_UPDATE_ERROR:
      return Object.assign({}, lastState, { updatingUser: false });

    case UserActions.GET_FB_FRIENDS_NOT_IN_CROWD_START:
      return Object.assign({}, lastState, { loadingFbFriendsNotInMyCrowd: true });

    case UserActions.GET_FB_FRIENDS_NOT_IN_CROWD_RESOLVE:
      return Object.assign({}, lastState, { loadingFbFriendsNotInMyCrowd: false, fbFriendsNotInMyCrowd: action.payload });

    case UserActions.GET_FB_FRIENDS_NOT_IN_CROWD_ERROR:
      return Object.assign({}, lastState, { loadingFbFriendsNotInMyCrowd: false });

    case UserActions.USER_GET_SKILLS_START:
      return Object.assign({}, lastState, { skills: false });

    case UserActions.USER_GET_SKILLS_RESOLVE:
      return Object.assign({}, lastState, { skills: action.payload });

    case UserActions.USER_GET_RECOMMENDATIONS_START:
      return Object.assign({}, lastState, { recommendations: false });

    case UserActions.USER_GET_RECOMMENDATIONS_RESOLVE:
      return Object.assign({}, lastState, { recommendations: action.payload });

    case CrowdActions.GET_CROWD_OTHER_START:
      return Object.assign({}, lastState, { crowdOther: false});

    case CrowdActions.GET_CROWD_OTHER_RESOLVE:
      return Object.assign({}, lastState, { crowdOther: action.payload });

    case UserActions.USER_GET_REPUTATION_START:
      return Object.assign({}, lastState, { userReputation: false});

    case UserActions.USER_GET_REPUTATION_RESOLVE:
      return Object.assign({}, lastState, { userReputation: action.payload });

    case CrowdActions.ADD_CROWD_TO_F1_START:
      return Object.assign({}, lastState, { crowdOther: false});

    case CrowdActions.ADD_CROWD_TO_F1_RESOLVE:
      return Object.assign({}, lastState, { addCrowdToF1: action.payload });

    case UserActions.USER_GET_RELATION_START:
      return Object.assign({}, lastState, { userRelation: false});

    case UserActions.USER_GET_RELATION_RESOLVE:
      return Object.assign({}, lastState, { userRelation:  action.payload });

    case UserActions.GET_OTHER_USER_START:
      return Object.assign({}, lastState, { otherUser: false});

    case UserActions.GET_OTHER_USER_RESOLVE:
      return Object.assign({}, lastState, { otherUser:  action.payload});

    case CrowdActions.ADD_FB_FRIEND_TO_START:
      return Object.assign({}, lastState, { fbFriend: false});

    case CrowdActions.ADD_FB_FRIEND_TO_RESOLVE:
      return Object.assign({}, lastState, { fbFriend: action.payload });

    default:
      return lastState;
  }
}
