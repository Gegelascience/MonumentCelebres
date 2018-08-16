import { Component, OnInit, OnDestroy } from '@angular/core';
import { TourEiffel } from '../class/tour-eiffel';
import {ActivatedRoute, Params,Router} from '@angular/router';
import { Pyramid } from '../class/pyramid';
import {BigBen} from '../class/big-ben';
import {InfosMonumenttService} from '../services/infos-monumentt.service';
import * as BABYLON from '../../assets/script/babylon.custom.js'
import { TranslateService,LangChangeEvent } from "@ngx-translate/core";


/**
 * Page affichant un monument en 3d et ses détails
 */

@Component({
  selector: 'app-monument',
  templateUrl: './monument.component.html',
  styleUrls: ['./monument.component.css']
})
export class MonumentComponent implements OnInit, OnDestroy {

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
   * Gestion VR
   */
  vrHelper:any;


  /**
   * Constructeur du component monument
   */

  constructor(private route: ActivatedRoute, private info:InfosMonumenttService,private router: Router,private translate:TranslateService ) {
    this.route.params.forEach((params: Params) => {
      this.monumentName=params['name'];
      this.Monument=this.chooseMonument(this.monumentName)
    });
    var lang=info.getlangue();
    console.log("langue début component",lang)
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
      console.log("langue après update monument",event.lang);
    });
   }

   /**
   * onInit du component monument
   */

  ngOnInit() {
    

    var temp:any;
    this.info.getInfoMonument()
    .subscribe(data=>{
      temp=data.json();
      this.details=temp[this.choixInfo];
    });
   

    var canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true); 

    

    var scene = this.createMonument(this.Monument,canvas,engine); //Call the createScene function

    var context=this;
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
    if (name=="0"){
      this.choixInfo=0;
      return new TourEiffel;
    }
    else if (name=="1") {
      this.choixInfo=1;
      return new Pyramid;
    }
    else if (name=="2") {
      this.choixInfo=2;
      return new BigBen;
    }
    else{
      this.router.navigateByUrl("/error");
      
    }
  }

 

  /**
  * fonction qui crée en 3d un monument
  */

  createMonument(Monument:any,canvas,engine){
      
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    this.vrHelper= scene.createDefaultVRExperience();

    var camPosition=new BABYLON.Vector3(0, 0, 0);
    var camera = new BABYLON.FreeCamera("Camera",camPosition,scene);
    camera.attachControl(canvas, true);

    
  
    scene.clearColor=new BABYLON.Color4(240/255,1,1,1);
    //dessin monument
    var offset=100;
    Monument.Draw(BABYLON,scene);


    return scene;
  };

  ngOnDestroy(){
    if(this.vrHelper!=null){
      this.vrHelper.dispose();
    }
    
  }

}
