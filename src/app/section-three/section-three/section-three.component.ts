import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-section-three',
  templateUrl: './section-three.component.html',
  styleUrls: ['./section-three.component.scss'],
})
export class SectionThreeComponent implements OnInit {
  panelOpenState = false;

  public latO = 43.2630126;
  public lngO = -2.9349852;  

  public latD = 43.328128; 
  public lngD = -3.0336586;

  public locOri:Object= {lat:this.latO, lng:this.lngO};
  public locDes:Object= {lat:this.latD, lng:this.lngD};

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;

  public origin: any;
  public destination: any;

  private geoCoder: any;

  @ViewChild( 'searchDestiny') public searchDestinyElementRef: ElementRef;
  @ViewChild('searchOrigin') public searchOriginElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){}

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {
      this.getDirection(this.locOri, this.locDes);
      this.geoCoder = new google.maps.Geocoder;

      let autocompleteDes = new google.maps.places.Autocomplete(this.searchDestinyElementRef.nativeElement);
      let autocompleteOri = new google.maps.places.Autocomplete(this.searchOriginElementRef.nativeElement);

      autocompleteDes.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteDes.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          
          this.getAddress(this.latitude, this.longitude);
          this.destination = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          //this.getDirection(this.latitude, this.longitude);
        });
      });

      autocompleteOri.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteOri.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          
          this.getAddress(this.latitude, this.longitude);
          this.origin = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
          //this.getDirection(this.latitude, this.longitude);
        });
      });

    });
  }

  getDirection(orig:object, dest:object) {
    this.origin = orig;
    this.destination = dest;  
  } 

  getAddress(latitude:number, longitude:number) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status:any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }

}