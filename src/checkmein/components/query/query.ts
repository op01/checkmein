import {Component} from '@angular/core';
import {LocationService} from '../../services/location'
import {MapService} from '../../services/map'
import {Backand} from '../../services/backand';

@Component({
  selector: 'query',
  templateUrl: 'checkmein/components/query/query.html'
})
export class Query {
  constructor(private locationService:LocationService,private mapService:MapService,private backand:Backand) {}
  query(){
    let location = this.locationService.location;
    this.backand.getCheckin(location,100)
      .subscribe(x=>{
        this.mapService.displayMarkers(x);
      });
  }
  
}
