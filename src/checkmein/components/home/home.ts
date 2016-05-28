import {Component} from '@angular/core';
import {LocationService} from '../../services/location'
import {Backand} from '../../services/backand';
import {MapService} from '../../services/map';
import {LatLng} from 'leaflet'
@Component({
  selector: 'home',
  templateUrl: 'checkmein/components/home/home.html'
})
export class Home {
  message:string;
  image:string;
  filename:string;
  constructor(private mapService:MapService,private locationService:LocationService,private fileReader:FileReader,private backand:Backand) {}
  ngOnInit() {
    this.fileReader.onload = (e:any)=>{
      this.onImageDataChange(e.target.result);
    }
  }
  onImageChange(e){
    let files = (<any>event.srcElement).files;
    let f=files[0];
    this.filename=f.name;
    this.fileReader.readAsDataURL(f);
  }
  onImageDataChange(d){
    this.image=d;
  }
  submit(){
    let location = this.locationService.location;
    let message = this.message;
    let image = this.image.substr(this.image.indexOf(',') + 1, this.image.length);
    if(message && image)
    {
      this.backand.createCheckin(message,location,image)
        .subscribe( x=>{
          this.message = ''
          let location = new LatLng(x.location[0],x.location[1]);
          this.mapService.displayMarker(location,x);
        });
    }
  }
}
