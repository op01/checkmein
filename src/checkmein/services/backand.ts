import {Injectable} from '@angular/core';
import {Http, Headers , RequestOptions, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Location} from './location';

@Injectable()
export class Backand {
  constructor(private http: Http) {}
  url='https://api.backand.com/1';
  getHeader(){
      return new Headers({ 
        'AnonymousToken':'4f00aa38-c32c-4e8f-8212-50088692995c',
        'Content-type':'application/json'
      });
  }
  createCheckin(message:string,location:Location,image:string) {
    let search = new URLSearchParams();
    search.set('returnObject','true');
    let headers = this.getHeader();
    let options = new RequestOptions({ headers:headers ,search:search});
    let url = this.url+'/objects/checkins/';
    let body = JSON.stringify({message:message,location:location.toA,image:image});
    return this.http.post(url,body,options)
      .map(x => x.json());
  }
  getCheckin(location:Location,dist:number){
    let headers = this.getHeader();
    let options = new RequestOptions({ headers:headers});
    let body = JSON.stringify( {
      lan:location.latitude,
      lon:location.longitude,
      dist:dist
    });
    let url = this.url + '/query/data/checkin';
    return this.http.post(url,body,options)
      .map(x=>x.json());
  }
}
