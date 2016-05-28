import {Component} from '@angular/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Home} from './components/home/home';
import {Query} from './components/query/query';
import {Map} from './components/map/map';
import {LocationService} from './services/location';
import {MapService} from './services/map';
import {Backand} from './services/backand';

@Component({
  selector: 'checkmein',
  providers: [LocationService,MapService,Backand,FileReader],
  directives: [ROUTER_DIRECTIVES,Map],
  templateUrl: 'checkmein/checkmein.html',
})
@RouteConfig([
  { path: '/home',       component: Home,        name: 'Home', useAsDefault: true },
  { path: '/query',      component: Query,       name: 'Query' },
])
export class Checkmein {
  constructor(private router:Router){
    
  }
}
