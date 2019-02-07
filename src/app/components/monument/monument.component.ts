import { Component, OnInit, OnDestroy } from "@angular/core";
import { TourEiffel } from "../../class/tour-eiffel";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Pyramid } from "../../class/pyramid";
import { BigBen } from "../../class/big-ben";
import { InfosMonumenttService } from "../../services/infos-monumentt.service";
import * as BABYLON from "../../../assets/script/babylon.custom.js";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

/**
 * Page affichant un monument en 3d et ses détails
 */
@Component({
  selector: "app-monument",
  templateUrl: "./monument.component.html",
  styleUrls: ["./monument.component.css"]
})
export class MonumentComponent implements OnInit, OnDestroy {
  /**
   * Monument à afficher
   */
  Monument: any;

  /**
   * index du choix de monument
   */
  choixInfo: number;

  /**
   * nom du monument
   */
  monumentName: string;

  /**
   * liste des détails du monument
   */
  details: any = [];

  /**
   * Gestion VR
   */
  vrHelper: any;

  /**
   * memoire handler traduction
   */
  langMemo: any;

  /**
   * Constructeur du component monument
   * @param route Route active
   * @param info Service InfosMonumentt
   * @param router Router
   * @param translate Service de traduction
   */
  constructor(
    private route: ActivatedRoute,
    private info: InfosMonumenttService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.route.params.forEach((params: Params) => {
      this.monumentName = params["name"];
      this.Monument = this.chooseMonument(this.monumentName);
    });
    this.langMemo = translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        // do something
        var temp: any;
        this.info.getInfoMonument().subscribe(data => {
          temp = data;
          this.details = temp[this.choixInfo];
        });
      }
    );
  }

  /**
   * Initialise le composant avec les informations sur le monument affiché
   */
  ngOnInit() {
    var temp: any;
    this.info.getInfoMonument().subscribe(data => {
      temp = data;
      this.details = temp[this.choixInfo];
    });

    var canvas = <HTMLCanvasElement>document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var scene = this.createMonument(this.Monument, canvas, engine); //Call the createScene function

    engine.runRenderLoop(function() {
      // Register a render loop to repeatedly render the scene
      scene.render();
    });

    window.addEventListener("resize", function() {
      // Watch for browser/canvas resize events
      engine.resize();
    });
  }

  /**
   * Choisit le bon monument à afficher
   * @param name Nom du monument
   */
  chooseMonument(name: string) {
    if (name == "0") {
      this.choixInfo = 0;
      return new TourEiffel();
    } else if (name == "1") {
      this.choixInfo = 1;
      return new Pyramid();
    } else if (name == "2") {
      this.choixInfo = 2;
      return new BigBen();
    } else {
      this.router.navigateByUrl("/error");
    }
  }

  /**
   * fonction qui crée en 3d un monument
   * @param Monument monument à dessiner
   * @param canvas endroit où dessiner
   * @param engine babylon engine
   */
  createMonument(Monument: any, canvas, engine) {
    // Create the scene space
    var scene = new BABYLON.Scene(engine);
    this.vrHelper = scene.createDefaultVRExperience();

    var camPosition = new BABYLON.Vector3(0, 0, 0);
    var camera = new BABYLON.FreeCamera("Camera", camPosition, scene);
    camera.attachControl(canvas, true);

    scene.clearColor = new BABYLON.Color4(240 / 255, 1, 1, 1);
    //dessin monument
    var offset = 100;
    Monument.Draw(BABYLON, scene);
    return scene;
  }

  /**
   * Destruction du composant
   */
  ngOnDestroy() {
    this.langMemo.unsubscribe();
    if (this.vrHelper != null) {
      this.vrHelper.dispose();
    }
  }
}
