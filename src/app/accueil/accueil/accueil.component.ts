import { Component, OnInit } from '@angular/core';
import {Map,View,Feature,Overlay} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';
import { Point } from "ol/geom";
import { Icon,Style } from "ol/style";
import VectorSource from 'ol/source/Vector.js';
import {InfosMonumenttService} from '../../services/infos-monumentt.service';
import { TranslateService,LangChangeEvent } from "@ngx-translate/core";

/**
 * page d'accueil
 */

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  /**
   * Données
   */
  private data:any[]=[];
  /**
  * constructeur par défaut
  */

  /**
   * carte des emplacements
   */
  private map;

  constructor(private info:InfosMonumenttService,private translate:TranslateService) { 
    var lang=info.getlangue();
    console.log("langue début component",lang)
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      console.log("langue après update accueil",event.lang);
    });
  }

  /**
  * onInit par défaut
  */
  ngOnInit() {
    this.info.getInfoMonument()
    .subscribe(data=>{
      this.data=data.json();
      this.DrawMap();
    });
  }

  /**
   *Dessin de la carte des monuments
   */
  DrawMap(){
    //centre de la map
    var centerMap=fromLonLat([2.287592000000018,40.862725 ]);
    //dessin des markers
    var markers=[];
    for (let index = 0; index < this.data.length; index++) {
      var tmp = new Feature({
        type: 'icon',
        geometry: new Point(fromLonLat([this.data[index].longitude, this.data[index].latitude])),
        name:this.data[index].nom,
        id:index
      });
      markers.push(tmp);
      
    }
    /**
    * Elements that make up the popup.
    */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    /**
     * Create an overlay to anchor the popup to the map.
     */
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });


    /**
     * Add a click handler to hide the popup.
     * @return {boolean} Don't follow the href.
      */
    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    var style={
      'icon': new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/marker.png'
        })
      }),
    };
    var vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: markers
      }),
      style: function(feature) {
        
        return style[feature.get('type')];
      }
    });
    //dessin de la carte
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM({
            
          })
        }),
        vectorLayer
      ],
      overlays:[overlay],
      view: new View({
        center: centerMap,
        zoom: 4
      })
    });

     /**
      * Add a click handler to the map to render the popup.
     */
    this.map.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;
      var hasMarker=this.hasFeatureAtPixel(evt.pixel);
      if (hasMarker) {
        var marker=this.getFeaturesAtPixel(evt.pixel);
        var nom = marker[0].values_.name;  
        for (let index = 0; index < content.children.length; index++) {
          if(content.children[index].innerHTML==nom){
            content.children[index].setAttribute("style","visibility:visible");
          }
          else{
            content.children[index].setAttribute("style","visibility:hidden");
          }
        }
        overlay.setPosition(coordinate);
      }
    });
  }

}
