import { Component, OnInit,OnDestroy } from '@angular/core';
import {InfosMonumenttService} from '../services/infos-monumentt.service';
import {D3Service,D3,Selection} from 'd3-ng2-service';
import {Map,View,Feature} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';
import { Point } from "ol/geom";
import { Icon,Style } from "ol/style";
import VectorSource from 'ol/source/Vector.js';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  private d3: D3;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  /**
   * exemple type de données
   */
  private evol=[
    {
      "nom":"Tour Eiffel",
      "description":"Tour de fer puddlé construite en 1887. Symbole de la capitale française, elle est le monument payant le plus visité du monde.",
      "hauteur":324,
      "pays":"France"
    }
  ];

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
    var temp:any;
    this.info.getInfoMonument()
    .subscribe(data=>{
      this.evol=data;
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
    var centerMap=fromLonLat([2.287592000000018,40.862725 ]);
    var london = new Feature({
      type: 'icon',
      geometry: new Point(fromLonLat([-0.12755, 51.507222]))
    });
    var paris = new Feature({
      type: 'icon',
      geometry: new Point(fromLonLat([2.287592000000018, 48.862725]))
    });
    var gizeh = new Feature({
      type: 'icon',
      geometry: new Point(fromLonLat([31.132495500000005, 29.9772962]))
    });
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
        features: [london, paris, gizeh]
      }),
      style: function(feature) {
        
        return style[feature.get('type')];
      }
    });
    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM({
            
          })
        }),
        vectorLayer
      ],
      view: new View({
        center: centerMap,
        zoom: 4
      })
    });
  }

}
