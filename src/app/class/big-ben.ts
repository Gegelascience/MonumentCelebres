
/**
 * Classe de Big Ben
 */

export class BigBen {

  /**
   * Constructeur par défaut
   */
    offset:number=100;

    constructor() {

    }

    /**
     * fonction pour dessiner Big Ben
     */

    public Draw(BABYLON:any,scene:any){
      //couleurs
      var matsocle=new BABYLON.StandardMaterial("matsocle1",scene);
      matsocle.emissiveColor =new BABYLON.Color3(205/255,173/255,0/255);
      matsocle.backFaceCulling = false;

      var clockColor=new BABYLON.StandardMaterial("clockColor",scene);
      clockColor.emissiveColor =new BABYLON.Color3(1,1,1);
      clockColor.backFaceCulling = false;

      var toitColor=new BABYLON.StandardMaterial("toitColor",scene);
      toitColor.emissiveColor =new BABYLON.Color3(153/255,153/255,153/255);
      toitColor.backFaceCulling = false;

      //toit
      var pilier_path = new BABYLON.Path2(0, 12);
      pilier_path.addLineTo(0, -12);
      pilier_path.addLineTo(10, -6);
      pilier_path.addLineTo(10, 6);
      
      var face1pil1lvl3= new BABYLON.PolygonMeshBuilder("face1pil1lvl3",pilier_path,scene);
      var f2p1lvl3=face1pil1lvl3.build(null,0.1);
      f2p1lvl3.material=toitColor;
      f2p1lvl3.position.x=-12;
      f2p1lvl3.position.y=35;
      f2p1lvl3.position.z=this.offset;
      f2p1lvl3.rotation.z=Math.PI/4;
      
      var f2p2lvl3=f2p1lvl3.createInstance("face1pil2lvl3");
      f2p2lvl3.position.x=12;
      f2p2lvl3.position.z=this.offset;
      f2p2lvl3.rotation.y=Math.PI;

      var f2p3lvl3=f2p1lvl3.createInstance("face1pil3lvl3");
      f2p3lvl3.position.z=12+this.offset;
      f2p3lvl3.position.x=0;
      f2p3lvl3.rotation.y=Math.PI/2;

      var f2p3lvl3=f2p1lvl3.createInstance("face1pil3lvl3");
      f2p3lvl3.position.z=-12+this.offset;
      f2p3lvl3.position.x=0;
      f2p3lvl3.rotation.y=-Math.PI/2;

      var haut = BABYLON.MeshBuilder.CreateBox("hautcarre", {height: 5,width:12,depth:12}, scene);
      haut.material=matsocle;
      haut.position.y=44;
      haut.position.z=+this.offset;
      
      var pilier_path = new BABYLON.Path2(0, 6);
      pilier_path.addLineTo(0, -6);
      pilier_path.addLineTo(30, 0);
      
      var toit1= new BABYLON.PolygonMeshBuilder("toit1",pilier_path,scene);
      var meshtoit=toit1.build(null,0.1);
      meshtoit.material=toitColor;
      meshtoit.position.x=-6;
      meshtoit.position.y=45;
      meshtoit.position.z=this.offset;
      meshtoit.rotation.z=Math.PI/2.3;
      
      var toit2=meshtoit.createInstance("toit2");
      toit2.position.x=6;
      toit2.rotation.y=Math.PI;

      var toit3=meshtoit.createInstance("toit3");
      toit3.position.z=6+this.offset;
      toit3.position.x=0;
      toit3.rotation.y=Math.PI/2;

      var toit4=meshtoit.createInstance("toit4");
      toit4.position.z=-6+this.offset;
      toit4.position.x=0;
      toit4.rotation.y=-Math.PI/2;

      //pilier
      var socle1 = BABYLON.MeshBuilder.CreateBox("socle1", {height: 120,width:24,depth:24}, scene);
      socle1.material=matsocle;
      socle1.position.y=-25;
      socle1.position.z=this.offset;

      //support horloge
      var support = BABYLON.MeshBuilder.CreateBox("socle2", {height: 30,width:30,depth:30}, scene);
      support.material=matsocle;
      support.position.y=15;
      support.position.z=this.offset;
      
      //horloge
      var faceClock = BABYLON.MeshBuilder.CreateCylinder("clock", {diameterTop:25, diameterBottom:25, height: 2, tessellation: 96}, scene);
      faceClock.material=clockColor;
      faceClock.rotation.x=Math.PI/2;
      faceClock.position.z=15+this.offset;
      faceClock.position.y=15;
      

      var instanceClock1=faceClock.createInstance("clock2");
      instanceClock1.position.z=-15+this.offset;
      

      var instanceClock2=faceClock.createInstance("clock3");
      instanceClock2.position.z=0+this.offset;
      instanceClock2.position.x=15;
      instanceClock2.rotation.y=Math.PI/2;

      var instanceClock3=faceClock.createInstance("clock4");
      instanceClock3.position.z=0+this.offset;
      instanceClock3.position.x=-15;
      instanceClock3.rotation.y=Math.PI/2;
      
    }
}
