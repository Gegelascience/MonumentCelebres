import { Component, OnInit } from '@angular/core';
import { TourEiffel } from '../class/tour-eiffel';
import {ActivatedRoute, Params} from '@angular/router';
import { Pyramid } from '../class/pyramid';
import {BigBen} from '../class/big-ben';
import {InfosMonumenttService} from '../services/infos-monumentt.service';

declare var BABYLON:any;

@Component({
  selector: 'app-monument',
  templateUrl: './monument.component.html',
  styleUrls: ['./monument.component.css']
})
export class MonumentComponent implements OnInit {

  Monument:any;
  monumentName:string;
  typeCam:boolean;
  details:any=[];

  constructor(private route: ActivatedRoute, private info:InfosMonumenttService ) {
    this.typeCam=false;
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

  ngOnInit() {
    

    var temp:any;
    this.info.getInfoMonument()
    .subscribe(data=>{
      this.details=data[0];
    });
   

    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true); 

    var createEiffel=function (Monument:any,Cam:boolean){
      
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

    var scene = createEiffel(this.Monument,this.typeCam); //Call the createScene function

    engine.runRenderLoop(function () { // Register a render loop to repeatedly render the scene
          scene.render();
    });


    window.addEventListener("resize", function () { // Watch for browser/canvas resize events
      engine.resize();
    });
  }

  chooseMonument(name:string){
    if (name=="eiffel"){
      return new TourEiffel;
    }
    else if (name=="pyramid") {
      return new Pyramid;
    }
    else if (name=="bigben") {
      return new BigBen;
    }
    else{
      window.location.pathname="/error";
    }
  }

  NoVr(event){
    console.log("no vr");
    window.location.pathname="/monument/"+this.monumentName+"/rr";
  }

  YesVr(event){
    console.log("vr");
    window.location.pathname="/monument/"+this.monumentName+"/vr";
  }

}
