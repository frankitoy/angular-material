/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrowdService } from 'app/shared/services/crowd.service';
import { MatDialog } from '@angular/material';
import { CrowdZipComponent } from 'app/shared/components/crowd-zip/crowd-zip.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, filter } from 'rxjs/operators';
import { select } from '@angular-redux/store';
import { Relation } from '../../../../shared/models/relation/relation.model';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-crowd',
  templateUrl: './crowd.component.html',
  styleUrls: ['./crowd.component.scss']
})
export class CrowdComponent implements OnInit, AfterViewInit {
  @Input() slideToggleColor: string = 'primary';
  @select() readonly userRelation$: Observable<Relation>;

  color = 'primary';
  checked: boolean;
  mapChecked: boolean;
  isLoadedF1: boolean;
  f1Crowd: any;
  f1CrowdAll: any;
  searchControl = new FormControl();
  slideMap = new FormControl();
  userId: number;
  userToken: string;
  pageOwner: boolean;
  _ngUnsubscribe: Subject<void> = new Subject<void>();
  _relation: Relation;
  
  @ViewChild('map') gmapElement: ElementRef;
  map: any;
  userLocations: any;
  fetchLocationsCounter: number;

  constructor(
    private crowdService: CrowdService,
    private dialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.checked = false;
    this.mapChecked = false;
    this.pageOwner = true;
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = userObj['id'];
    this.userToken = this.sharedService.getCookie('authToken');
    this.map = google.maps.Map;
    this.userLocations = [];
    this.fetchLocationsCounter = 0;
    this.getF1();
    this.getSearch();
    this.userRelation();
  }

  ngAfterViewInit() { }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        this._relation = relation;
        if (relation['userId'] !== this.userId) {
          this.pageOwner = false;
        }
      });
  }

  getSearch() {
    this.searchControl.valueChanges
    .pipe(debounceTime(500))
    .subscribe(value => this.filter(value));
  }

  filter(value: any) {
    this.userLocations = [];
    const val = value.toLowerCase();
    this.f1Crowd = this.f1CrowdAll;
    if (val) {
      this.f1Crowd = this.f1Crowd && this.f1Crowd.filter(f1 => {
        return f1.first_name.toLowerCase().includes(val) || f1.last_name.toLowerCase().includes(val);
      });
    } else {
      this.f1Crowd = this.f1CrowdAll;
    }
    this.codeAddress();
  }

  getF1() {
    this.crowdService.getCrowd(this.userToken).subscribe(({response}: any) => {
      this.f1Crowd = response;
      this.f1CrowdAll = response;
      this.isLoadedF1 = true;
      this.codeAddress();
    });
  }

  openCrowdZip(): void {
    this.dialog.open(CrowdZipComponent, {panelClass: 'crowd-zip-container'});
  }

  toogleMapView(): void {
    if (this.slideMap.value !== this.mapChecked) {
      setTimeout(() => {
        this.mapChecked = this.slideMap.value;
      }, 400);
    }
  }

  handleSearchOnBlur() {}

  handleF2ZipViaSearch() {}

  handleChat() {}

  handleRemoveF1(id: number) {
    this.crowdService.getDeleteF1Crowd(this.userToken, id).subscribe((data) => {
      this.f1Crowd = this.f1Crowd.filter((f1) => {
        return f1.id !== id;
      });
      this.codeAddress();
    });
  }

  codeAddress() {
    const geocoder = new google.maps.Geocoder();
    this.fetchLocationsCounter = 0;
    this.f1Crowd.map(({city, state, first_name, last_name, skills}) => {
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

    if (this.f1Crowd.length) {
      this.callGeo();
    }
  }

  // Create a recursive method that will check if fetchinh of locations is finished
  callGeo() {
    if (this.fetchLocationsCounter !== this.f1Crowd.length) {
      setTimeout(() => {
        this.callGeo();
      }, 400);
    } else {
      this.getGeoLocation();
    }
  }

  getGeoLocation() {
    const mapProp = {
      center: new google.maps.LatLng(28.4595, 77.0266),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP // also use ROADMAP, SATELLITE or TERRAIN
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // const marker = new google.maps.Marker({ position: mapProp.center });
    // marker.setMap(this.map);
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
