import {Component} from '@angular/core';
import {MapService} from '../../services/map';
import {LocationService} from '../../services/location';
@Component({
  selector: 'llmap',
  templateUrl: 'checkmein/components/map/map.html'
})
export class Map{
  constructor(private mapService:MapService,private locationService:LocationService){}
  ngOnInit(){
    this.mapService.init('map');
    this.locationService.init()
    .then(l=>{
      console.log(l);
      this.mapService.addMarker(l.toLL);
      this.mapService.panTo(l.toLL);  
    });
    
  }
  
}
