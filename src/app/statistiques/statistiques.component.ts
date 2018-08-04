import { Component, OnInit,OnDestroy } from '@angular/core';
import {InfosMonumenttService} from '../services/infos-monumentt.service';
import {D3Service,D3,Selection} from 'd3-ng2-service';




@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit,OnDestroy {

  private gridApi;
  private gridColumnApi;

  private columnDefs = [
    {headerName: 'Monument', field: 'monument' },
    {headerName: 'Pays', field: 'pays' },
    {headerName: 'Hauteur (m)', field: 'hauteur'}
  ];

  private rowData:any[];

  /**
   * Variables D3js
   */
  private d3: D3;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  /**
   * Données
   */
  private data:any[]=[];

  
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
      this.data=data.json();
      this.DrawCharHeight();
      this.fillTab();
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

    let xDomain = this.data.map(d => d.nom);
    let yDomain = [0, this.d3.max(this.data, d=> d.hauteur)];

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
      .data(this.data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("fill","#28a745")
      .attr("x", function(d) { return margin.left + x(d.nom) ; })
      .attr("width", x.bandwidth)
      .attr("y", function(d) { return y(d.hauteur); })
      .attr("height", function(d) { return height - y(d.hauteur); });
  }


  fillTab(){

    for (let index = 0; index < this.data.length; index++) {
      var newData={
        monument :this.data[index].nom, 
        pays:this.data[index].pays,
        hauteur:this.data[index].hauteur
      }
      var res=this.gridApi.updateRowData({add:[newData]});
      
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  

}
