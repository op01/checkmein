import {Injectable} from '@angular/core';
import {LatLng} from 'leaflet';
export class Location{
    latitude:number;
    longitude:number;
    get toLL(){
        let ret=new LatLng(this.latitude,this.longitude)
        return ret;
    }
    get toA(){
        return [this.latitude,this.longitude];
    }
    get toS(){
        return this.latitude.toFixed(5)+' '+this.longitude.toFixed(5);
    }
}

@Injectable()
export class LocationService{
    location:Location;
    init():Promise<Location>{
        return new Promise((res,rej)=>{
            if(navigator.geolocation)navigator.geolocation.getCurrentPosition(p => {
                let l=new Location();
                l.latitude=p.coords.latitude;
                l.longitude=p.coords.longitude;
                this.location=l;
                res(l);
            });
            else rej(Error('Not support Geolocation API'));
        });
    }
}