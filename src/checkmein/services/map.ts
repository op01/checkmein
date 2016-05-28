import {Injectable} from '@angular/core';
import {Map,LatLng,Marker} from 'leaflet';

@Injectable()
export class MapService{
    map:Map;
    markers:Marker[]=[];
    init(id:string){
        L.Icon.Default.imagePath='/images';
        this.map= L.map(id).setView([51.505, -0.09], 13);
        let tile=new L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
            	attribution: '&copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(this.map);
    }
    clearMarkers(){
        this.markers.forEach(x=>{
           this.map.removeLayer(x); 
        });
        this.markers=[];
    }
    displayMarker(location:LatLng,x){
        this.markers.push(this.addMarkerWithPopup(location,x.image,x.message));
    }
    displayMarkers(checkins){
        this.clearMarkers();
        checkins.forEach(x=>{
            let coords = x.location.split(' ');
            let location = new LatLng(coords[0],coords[1]);
            this.displayMarker(location,x);
        });
    }
    addMarkerWithPopup(location:LatLng,image:string,message:string){
        let html = `<img class="img-rounded" src="${image}">${message}`;
        let marker = L.marker(location);
        marker.bindPopup(html);
        this.map.addLayer(marker);
        return marker;
    }
    addMarker(location:LatLng){
        L.circleMarker(location).addTo(this.map);
    }
    panTo(location:LatLng){
        this.map.panTo(location);
    }
}