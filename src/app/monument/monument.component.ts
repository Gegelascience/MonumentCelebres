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
   * variable indiquant s'il y a réalité virtuelle ou non
   */

  typeCam:boolean=false;

  /**
   * liste des détails du monument
   */

  details:any=[];

  /**
   * Constructeur du component monument
   */

  constructor(private route: ActivatedRoute, private info:InfosMonumenttService ) {
    var cam='';
    this.route.params.forEach((params: Params) => {
      cam=params['cam'];
      this.monumentName=params['name'];
      this.Monument=this.chooseMonument(this.monumentName)
    });
    if(cam=='vr'){
      this.typeCam=true;
    }
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

    

    var scene = this.createMonument(this.Monument,this.typeCam,canvas,engine); //Call the createScene function

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
   * fonction pour désactiver la réalité virtuelle
   */

  NoVr(event){
    console.log("no vr");
    window.location.pathname="/monument/"+this.monumentName+"/rr";
  }

  /**
   * fonction pour activer la réalité virtuelle
   */

  YesVr(event){
    console.log("vr");
    window.location.pathname="/monument/"+this.monumentName+"/vr";
  }

  /**
  * fonction qui crée en 3d un monument
  */

  createMonument(Monument:any,Cam:boolean,canvas,engine){
      
    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    scene.clearColor=new BABYLON.Color3(0,0,0);

    if (!Cam){
        // Caméra classique
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 50, 0, BABYLON.Vector3.Zero(), scene);
        camera.setPosition(new BABYLON.Vector3(0, 50, 400));
        camera.attachControl(canvas, false);
    }else{
        //Caméra VR	
        var camera = new BABYLON.VRDeviceOrientationArcRotateCamera ("Camera", Math.PI/2, Math.PI/2,150, new BABYLON.Vector3 (0, 0, 0), scene);
        camera.attachControl(canvas, true);
    }

    //dessin tour eiffel
    Monument.Draw(BABYLON,scene);

    return scene;
  };

}
