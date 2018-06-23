import { Component, OnInit } from '@angular/core';
import { TourEiffel } from '../class/tour-eiffel';
import {ActivatedRoute, Params} from '@angular/router';
import { Pyramid } from '../class/pyramid';
import {BigBen} from '../class/big-ben';
import {InfosMonumenttService} from '../services/infos-monumentt.service';

/**
 * Variable d'export de BabylonJS
 */

declare var BABYLON:any;

/**
 * Page affichant un monument en 3d et ses détails
 */

@Component({
  selector: 'app-monument',
  templateUrl: './monument.component.html',
  styleUrls: ['./monument.component.css']
})
export class MonumentComponent implements OnInit {

  /**
   * Monument à afficher
   */

  Monument:any;

  /**
   * index du choix de monument
   */

  choixInfo:number;

  /**
   * nom du monument
   */

  monumentName:string;

  /**
   * liste des détails du monument
   */

  details:any=[];

  /**
   * Constructeur du component monument
   */

  constructor(private route: ActivatedRoute, private info:InfosMonumenttService ) {
    this.route.params.forEach((params: Params) => {
      this.monumentName=params['name'];
      this.Monument=this.chooseMonument(this.monumentName)
    });
   }

   /**
   * onInit du component monument
   */

  ngOnInit() {
    

    var temp:any;
    this.info.getInfoMonument()
    .subscribe(data=>{
      this.details=data[this.choixInfo];
    });
   

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true); 

    

    var scene = this.createMonument(this.Monument,canvas,engine); //Call the createScene function

    engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
          scene.render();
    });


    window.addEventListener("resize", function () { // Watch for browser/canvas resize events
      engine.resize();
    });
  }

  /**
   * fonction pour détecter le monument à afficher
   */

  chooseMonument(name:string){
    if (name=="eiffel"){
      this.choixInfo=0;
      return new TourEiffel;
    }
    else if (name=="pyramid") {
      this.choixInfo=1;
      return new Pyramid;
    }
    else if (name=="bigben") {
      this.choixInfo=2;
      return new BigBen;
    }
    else{
      window.location.pathname="/error";
    }
  }

 

  /**
  * fonction qui crée en 3d un monument
  */

  createMonument(Monument:any,canvas,engine){
      
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    var vrHelper= scene.createDefaultVRExperience();

    var camPosition=new BABYLON.Vector3(0, 0, 0);
    var camera = new BABYLON.FreeCamera("Camera",camPosition,scene);
    camera.attachControl(canvas, true);

    
  
    scene.clearColor=new BABYLON.Color3(240/255,1,1);
    //dessin monument
    var offset=100;
    Monument.Draw(BABYLON,scene);


    return scene;
  };

}
