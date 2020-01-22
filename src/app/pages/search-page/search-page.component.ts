
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CreateAskRecDialogComponent } from 'app/shared/components/create-ask-rec-dialog/create-ask-rec-dialog.component';
import { CreateSkillDialogComponent } from 'app/shared/components/create-skill-dialog/create-skill-dialog.component';
import { MatDialog, MatSelectionList, MatListOption } from '@angular/material';
import { CrowdZipComponent } from 'app/shared/components/crowd-zip/crowd-zip.component';
import { SearchService } from 'app/shared/services/search.service';
import { Subject, Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { Relation } from 'app/shared/models/relation/relation.model';
import { User } from 'app/shared/models/users/user.model';
import { takeUntil, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CrowdService } from 'app/shared/services/crowd.service';
import { UserService } from 'app/shared/services/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  @select() readonly otherUser$: Observable<User>;
  @select() readonly userRelation$: Observable<Relation>;
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  userId: number;
  textFilter: string;
  mainFilter: string;
  subFilter: string;
  userToken: string;
  isRecordLoaded: boolean;

  peopleAll: any[];
  peoplePreview: any[];

  asksAll: any[];
  asksPreview: any[];

  skillsAll: any[];
  skillsPreview: any[];

  asks: any[] = [];
  skils: any[] = [];
  people: any[] = [];
  filters: any[] = [];

  titles: any[] = [];
  userIds: any[] = [];
  userDetails: any[] = [];

  @Input() slideToggleColor: string = 'primary';
  color: string = 'primary';
  checked: boolean;
  mapChecked: boolean;
  isLoaded: boolean;
  f1Crowd: any;
  f1CrowdAll: any;
  searchControl = new FormControl();
  slideMap = new FormControl();
  pageOwner: boolean;
  @ViewChild('map') gmapElement: ElementRef;
  map: any;
  userLocations: any = [];
  fetchLocationsCounter: number;
  skills: any[] = [];

  constructor(
    private dialog: MatDialog,
    private searchService: SearchService,
    private crowdService: CrowdService,
    private userService: UserService,
    private sharedService: SharedService
  ) { }

  async ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userToken = this.sharedService.getCookie('authToken');
    this.userId = userObj['id'];

    const searchType = localStorage.getItem('searchType') || '';
    this.mainFilter = searchType;

    await this.searchService.getMainFilter.subscribe(type => {
      this.mainFilter = type;
      if (type) {
        this.sideListFilter();
      }
    });

    await this.searchService.getSearchText.subscribe(text => {
      this.textFilter = text;
      this.sideListFilter();
    });

    this.userRelation();
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  handleFilter(type: string): void {
    this.mainFilter = type;
    this.titles = [];
    this.sideListFilter();
  }

  async search() {
    this.isRecordLoaded = false;
    this.userIds = [];

    await this.searchService.getSearch(this.userToken, this.textFilter, this.mainFilter, this.subFilter).then(({ response }: any) => {
      this.peoplePreview = [];
      this.asksPreview = [];
      this.skillsPreview = [];
      let skills = [];
      let asks = [];
      let people = [];
      let peopleAll = [];
      let asksAll = [];
      let skillsAll = [];

      response.f1.users.map((person: any, index: number) => {
        if (index < 3) {
          people = [...people, { ...person, relations: 'f1'}];
        }
        peopleAll = [...peopleAll, people];
      });

      response.f1.asks.map((ask: any, index: number) => {
        if (index < 3) {
          asks = [...asks, { ...ask, relations: 'f1'}];
        }
        asksAll = [...asksAll, ask];
      });

      response.f1.skills.map((skill: any, index: number) => {
        if (index < 3) {
          skills = [...skills, { ...skill, relations: 'f1'}];
        }
        skillsAll = [...skillsAll, skill];
      });

      response.f2.users.map((person: any, index: number) => {
        if (index < 3) {
          people = [...people, { ...person, relations: 'f2'}];
        }
        peopleAll = [...peopleAll, person];
      });

      response.f2.asks.map((ask: any, index: number) => {
        if (index < 3) {
          asks = [...asks, { ...ask, relations: 'f2'}];
        }
        asksAll = [...asksAll, ask];
      });

      response.f2.skills.map((skill: any, index: number) => {
        if (index < 3) {
          skills = [...skills, { ...skill, relations: 'f2'}];
        }
        skillsAll = [...skillsAll, skill];
      });

      // Return only the first 3 people
      this.peoplePreview = people.filter((person, index) => index < 3);
      this.peopleAll = peopleAll;

      // Return only the first 3 asks
      this.asksPreview = asks.filter((ask, index) => index < 3);
      this.asksAll = asksAll;

      // Return only the first 3 skills
      this.skillsPreview = skills.filter((skill, index) => index < 3);
      this.skillsAll = skillsAll;

      // Get All the userIds, remove duplicate
      [...this.peoplePreview, ...this.asksPreview, ...this.skillsPreview].map(({ user_id }) => {
        if (this.userIds.indexOf(user_id) === -1) {
          this.userIds = [...this.userIds, user_id];
        }
      });

      this.isRecordLoaded = true;
    });
  }

  handleAskRecs(): void {
    this.dialog.open(CreateAskRecDialogComponent, {panelClass: 'create-ask-rec-dialog-container'});
  }

  handleGetWork(): void {
    this.dialog.open(CreateSkillDialogComponent, {panelClass: 'create-skill-dialog-container'});
  }

  handleZipCrowd(): void {
    this.dialog.open(CrowdZipComponent, {panelClass: 'crowd-zip-container'});
  }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        if (relation['userId'] !== this.userId) {
          this.pageOwner = false;
        }
      });
  }

  openCrowdZip(): void {
    this.dialog.open(CrowdZipComponent, {panelClass: 'crowd-zip-container'});
  }

  toggleMapView(): void {
    if (this.slideMap.value) {
      this.codeAddress();
    }
    if (this.slideMap.value !== this.mapChecked) {
      setTimeout(() => {
        this.mapChecked = this.slideMap.value;
      }, 400);
    }
  }

  handleRemove(id: number) {
    this.crowdService.getDeleteF1Crowd(this.userToken, id).subscribe((res) => {
      let data;
      if (this.mainFilter === 'skills') {
        data = this.skills;
      } else if (this.mainFilter === 'asks') {
        data = this.asks;
      } else if (this.mainFilter === 'people') {
        data = this.people;
      }
      data = data.filter((f1) => {
        return f1.id !== id;
      });
      this.codeAddress();
    });
  }

  codeAddress() {
    const geocoder = new google.maps.Geocoder();
    this.fetchLocationsCounter = 0;
    const data = this.mainFilter === 'skills' ? this.skills : this.asks;
    data.map(({city, state, first_name, last_name, skills}) => {
      if (city !== null && state !== null) {
        const address = `${city} ${state}`;
        const fullname = `${first_name} ${last_name}`;

        geocoder.geocode( { 'address' : address }, (results, status) => {
          if (results) {
            if (results.length) {
              const location = results[0] && results[0].geometry.location;
              if (location) {
                this.userLocations = [
                  ...this.userLocations, {
                    lat: location.lat(),
                    lng: location.lng(),
                    name: fullname,
                    skill: skills ? skills[0] : 'Web Developer'
                  }
                ];
              }
            }
          }
          // Add to the fetch counter
          this.fetchLocationsCounter += 1;
        });
      } else {
        // Add to the fetch counter
        this.fetchLocationsCounter += 1;
      }

    });

    if (data.length) {
      this.callGeo();
    }
  }

  countInArray(array, val): number {
    let count = 0;
    array.map((data) => {
      const string = val ? val.toLowerCase() : '';
      if (data.title && data.title.toLowerCase().includes(string)) {
        count++;
      }
    });
    return count;
  }

  loadAskSkillPeople(type) {
    if (this.mainFilter === 'asks') {
      this.asks = [];
      this.asksAll.map((data) => {
        if (data.relations === type) {
          this.userDetails.filter(({ user_id, avatar, first_name, last_name,  city, skill }) => {
            if (user_id === data.user_id) {
              this.asks = [...this.asks, {...data, avatar, first_name, last_name,  city, skill }];
              const count = this.countInArray(this.asksAll, data.title);

              const isExist = this.titles.some((fData) => {
                return fData.title === data.title;
              });

              if (!isExist) {
                this.titles = [...this.titles, { title:  data.title, count }];
              }
            }
          });
        } else if (!!data.relations) {
          this.userDetails.filter(({ user_id, avatar, first_name, last_name,  city, skill }) => {
            if (user_id === data.user_id) {
              this.asks = [...this.asks, {...data, avatar, first_name, last_name,  city, skill }];
            }
          });
        }
      });

      this.filters = this.asks;

    } else if (this.mainFilter === 'skills') {
      this.skills = [];
      this.skillsAll.map((data) => {
        if (data.relations === type) {
          this.userDetails.filter(({ user_id, avatar, first_name, last_name,  city, skill }) => {
            if (user_id === data.user_id) {
              this.skills = [...this.skills, {...data, avatar, first_name, last_name,  city, skill }];
              const count = this.countInArray(this.skillsAll, data.title);

              const isExist = this.titles.some((fData) => {
                return fData.title === data.title;
              });

              if (!isExist) {
                this.titles = [...this.titles, { title:  data.title, count }];
              }
            }
          });
        } else if (!!data.relations) {
          this.userDetails.filter(({ user_id, avatar, first_name, last_name,  city, skill }) => {
            if (user_id === data.user_id) {
              this.skills = [...this.skills, {...data, avatar, first_name, last_name,  city, skill }];
            }
          });
        }
      });

      this.filters = this.skills;
    } else if (this.mainFilter === 'people') {
      this.people = [];
      this.peopleAll.map((data) => {
        if (data.relations === type) {
          this.userDetails.filter(({ user_id, avatar, first_name, last_name,  city, skill }) => {
            if (user_id === data.user_id) {
              this.people = [...this.people, {...data, avatar, first_name, last_name,  city, skill }];
              const count = this.countInArray(this.peopleAll, data.title);

              const isExist = this.titles.some((fData) => {
                return fData.title === data.title;
              });

              if (!isExist) {
                this.titles = [...this.titles, { title:  data.title, count }];
              }
            }
          });
        } else if (!!data.relations) {
          this.userDetails.filter(({ user_id, avatar, first_name, last_name,  city, skill }) => {
            if (user_id === data.user_id) {
              this.people = [...this.people, {...data, avatar, first_name, last_name,  city, skill }];
            }
          });
        }
      });

      this.filters = this.people;
    }
  }

  handleCheck(value: string) {
    this.subFilter = this.subFilter !== value ? value : '';
    this.textFilter = '';
    this.titles = [];
    this.sideListFilter();
  }

  handleTitleChange(title: string): void {
    this.textFilter = this.selectionList.selectedOptions.selected.length ? title : '';
    this.sideListFilter();
  }

  async sideListFilter() {
    this.isLoaded = false;
    await this.search();
    await this.fetchUserDetailsByIds();
    await this.loadAskSkillPeople(this.subFilter);
    this.isLoaded = true;
  }

  async fetchUserDetailsByIds() {
    let data = [];
    for (let x = 0; x < this.userIds.length; x++) {
      await this.userService.getUserById(this.userIds[x]).toPromise().then(({ response: { avatar, first_name, last_name, city, skill } }: any) => {
        data = [...data, { user_id: this.userIds[x], avatar, first_name, last_name,  city, skill }];
      });
    }
    this.userDetails = data;
  }

  // Create a recursive method that will check if fetchinh of locations is finished
  callGeo() {
    let data;
    if (this.mainFilter === 'skills') {
      data = this.skills;
    } else if (this.mainFilter === 'asks') {
      data = this.asks;
    } else if (this.mainFilter === 'people') {
      data = this.people;
    }
    if (this.fetchLocationsCounter !== data.length) {
      setTimeout(() => {
        this.callGeo();
      }, 400);
    } else {
      this.getGeoLocation();
    }
  }

  handleChat() {}

  getGeoLocation() {
    const mapProp = {
      center: new google.maps.LatLng(28.4595, 77.0266),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.setMultipleMarker(this.userLocations);
  }

  setMultipleMarker(markers) {
    const bounds = new google.maps.LatLngBounds();
    const infowindow = new google.maps.InfoWindow();

    markers.map(({lat, lng, name, skill}) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: this.map,
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });

      // extend the bounds to include each marker's position
      bounds.extend(marker['position']);

      marker.addListener('click', () => {
        this.openMarkerWindow(infowindow, marker, name, skill);
      });
    });

    // Fit the map to the newly inclusive bounds
    this.map.fitBounds(bounds);
  }

  openMarkerWindow(infowindow, marker, name, skill) {
    infowindow.setContent(`<p id="infoWindow"><img src="assets/img/blank-user.png" class="staticGMImg">${name}<br><span class="mgSkill">${skill}</span></p>`);
    infowindow.open(this.map, marker);
  }
}
