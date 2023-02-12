import { Component, OnInit } from '@angular/core';
declare const google: any;

@Component({
  selector: 'app-section-two',
  templateUrl: './section-two.component.html',
  styleUrls: ['./section-two.component.scss'],
})
export class SectionTwoComponent implements OnInit {
    //lat = 20.5937;
    //lng = 78.9629;
    lat : number;
    lng : number;
    pointList: { lat: number; lng: number }[] = [];
    map: any;
    drawingManager: any;
    selectedShape: any;
    selectedArea = 0;
  
  
  public origin: any;
  public destination: any;
  
    constructor() {
      this.lat = 43.257;
      this.lng = -2.92344;
    }
  
    ngOnInit() {
      this.setCurrentPosition();      
    }
  
    onMapReady(map: any) {
      this.initDrawingManager(map);
    }
  
    initDrawingManager = (map: any) => {
      const self = this;
      const options = {
        drawingControl: true,
        drawingControlOptions: {
          drawingModes: ['polygon', 'circle', 'marker'],
        },
        polygonOptions: {
          draggable: true,
          editable: true,
        },
        circleOptions : {
          fillColor: "#3f51b5",
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeOpacity: 1,
          clickable: false,
          editable: true,
          suppressUndo: true,
          zIndex: 999
      },
        drawingMode: [google.maps.drawing.OverlayType.CIRCLE,
                      google.maps.drawing.OverlayType.POLYGON,
                      google.maps.drawing.OverlayType.MARKER,
                    ]
      };
      this.drawingManager = new google.maps.drawing.DrawingManager(options);
      this.drawingManager.setMap(map);
      google.maps.event.addListener(
        this.drawingManager,
        'overlaycomplete',
        (event: any) => {
          if (event.type === google.maps.drawing.OverlayType.POLYGON ) {
            /* if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
              console.log("center: " + event.overlay.getCenter());
              console.log("radius: " + event.overlay.getRadius());
            }
            if (event.type === google.maps.drawing.OverlayType.MARKER) {
              console.log("MarkLat: " + event.overlay.getPosition().lat());
              console.log("MarkLng: " + event.overlay.getPosition().lng());
            } */
            const paths = event.overlay.getPaths();
            console.log (paths)
            for (let p = 0; p < paths.getLength(); p++) {
              google.maps.event.addListener(
                paths.getAt(p),
                'set_at',
                () => {
                  if (!event.overlay.drag) {
                    self.updatePointList(event.overlay.getPath());
                  }
                }
              );
              google.maps.event.addListener(
                paths.getAt(p),
                'insert_at',
                () => {
                  self.updatePointList(event.overlay.getPath());
                }
              );
              google.maps.event.addListener(
                paths.getAt(p),
                'remove_at',
                () => {
                  self.updatePointList(event.overlay.getPath());
                }
              );
            }
            
            self.updatePointList(event.overlay.getPath());
            this.selectedShape = event.overlay;
            this.selectedShape.type = event.type;
          }
          if (event.type !== google.maps.drawing.OverlayType.MARKER) {
            
            // Switch back to non-drawing mode after drawing a shape.
            self.drawingManager.setDrawingMode(null);
            // To hide:
            self.drawingManager.setOptions({
              drawingControl: false,
            });
          }
          if (event.type === google.maps.drawing.OverlayType.MARKER) {
            console.log("MarkLatE: " + event.overlay.getPosition().lat());
            console.log("MarkLngE: " + event.overlay.getPosition().lng());
            const paths = event.overlay.getPaths();
            console.log (paths)
            }
            if (event.type === google.maps.drawing.OverlayType.CIRCLE) {
            console.log("center: " + event.overlay.getCenter());
            console.log("radius: " + event.overlay.getRadius());
            const paths = event.overlay.getPaths();
            console.log (paths)
          }
        }
      );
    }
    private setCurrentPosition() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });
      }
    }
  
    deleteSelectedShape() {
      if (this.selectedShape) {
        this.selectedShape.setMap(null);
        this.selectedArea = 0;
        this.pointList = [];
        // To show:
        this.drawingManager.setOptions({
          drawingControl: true,
        });
      }
    }
  
    updatePointList(path: any) {
      this.pointList = [];
      const len = path.getLength();
      for (let i = 0; i < len; i++) {
        this.pointList.push(
          path.getAt(i).toJSON()
        );
      }
      this.selectedArea = google.maps.geometry.spherical.computeArea(path);
      //console.log (this.selectedArea );
    }
  }