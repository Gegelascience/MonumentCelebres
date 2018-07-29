import { Component, OnInit,OnDestroy } from '@angular/core';
import {InfosMonumenttService} from '../services/infos-monumentt.service';
import {D3Service,D3,Selection} from 'd3-ng2-service';
import {Map,View,Feature,Overlay} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM';
import {fromLonLat,toLonLat} from 'ol/proj.js';
import { Point } from "ol/geom";
import { Icon,Style } from "ol/style";
import VectorSource from 'ol/source/Vector.js';
import {toStringHDMS} from 'ol/coordinate.js';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit,OnDestroy {

  private d3: D3;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  /**
   * exemple type de données
   */
  private evol:any[]=[];

  /**
   * initialisation des services
   */
  constructor(d3Service: D3Service,private info:InfosMonumenttService) {
    this.d3 = d3Service.getD3();
   }

   ngOnDestroy() {
    if (this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }
/**
 * initialisation des données et dessin des statistiques 
 */
  ngOnInit() {
    this.info.getInfoMonument()
    .subscribe(data=>{
      this.evol=data.json();
      this.DrawCharHeight();
      this.DrawMap();
    });
  }

   /**
   * Histogramme de comparaison des hauteurs des monuments
   */
  DrawCharHeight(){
    let margin = {top: 5, right: 20, bottom: 30, left: 40};
    let width = 600 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;
 
    let svg = this.d3.select('#hauteur')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('background-color', 'white');

    let chart = svg.append("g")
      .attr('class', 'bar')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    let xDomain = this.evol.map(d => d.nom);
    let yDomain = [0, this.d3.max(this.evol, d=> d.hauteur)];

    let x = this.d3.scaleBand()
            .domain(xDomain)
            .rangeRound([0, width])
            .padding(0.2);

    let y = this.d3.scaleLinear()
            .domain(yDomain)
            .range([height, 0]);

    // add the x Axis
    svg.append("g")
      .attr('class', 'x axis')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(this.d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(this.d3.axisLeft(y));

    svg.selectAll("bar")
      .data(this.evol)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill","#28a745")
      .attr("x", function(d) { return margin.left + x(d.nom) ; })
      .attr("width", x.bandwidth)
      .attr("y", function(d) { return y(d.hauteur); })
      .attr("height", function(d) { return height - y(d.hauteur); });
  }

  /**
   *Dessin de la carte des monuments
   */
  DrawMap(){
    //centre de la map
    var centerMap=fromLonLat([2.287592000000018,40.862725 ]);
    //dessin des markers
    var markers=[];
    for (let index = 0; index < this.evol.length; index++) {
      var tmp = new Feature({
        type: 'icon',
        geometry: new Point(fromLonLat([this.evol[index].longitude, this.evol[index].latitude])),
        name:this.evol[index].nom
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
    var map = new Map({
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
    map.on('singleclick', function(evt) {
      var coordinate = evt.coordinate;
      var coordClick;
      var infoPopup;
      var lonlat = toLonLat(coordinate);
      for (let index = 0; index < markers.length; index++) {
        coordClick=toLonLat(markers[index].values_.geometry.flatCoordinates);
        if (lonlat[1]>=coordClick[1] && lonlat[1]-coordClick[1]<=1.2) {
          if (Math.abs(lonlat[0]-coordClick[0])<0.8) {
            infoPopup=markers[index].values_.name;
            content.innerHTML = '<p>'+ infoPopup +'</p>';
            overlay.setPosition(coordinate);
            break;
          }
        }
        
      }

      
    });

  }

}
