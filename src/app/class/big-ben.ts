
/**
 * Classe de Big Ben
 */

export class BigBen {

  /**
   * Constructeur par défaut
   */

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
      f2p1lvl3.rotation.z=Math.PI/4;
      
      var f2p2lvl3=f2p1lvl3.createInstance("face1pil2lvl3");
      f2p2lvl3.position.x=12;
      f2p2lvl3.rotation.y=Math.PI;

      var f2p3lvl3=f2p1lvl3.createInstance("face1pil3lvl3");
      f2p3lvl3.position.z=12;
      f2p3lvl3.position.x=0;
      f2p3lvl3.rotation.y=Math.PI/2;

      var f2p3lvl3=f2p1lvl3.createInstance("face1pil3lvl3");
      f2p3lvl3.position.z=-12;
      f2p3lvl3.position.x=0;
      f2p3lvl3.rotation.y=-Math.PI/2;


      var cornerhaut=[
        new BABYLON.Vector2(-6,6),
        new BABYLON.Vector2(6,6),
        new BABYLON.Vector2(6,-6),
        new BABYLON.Vector2(-6,-6),
      ]

      var hautcarre= new BABYLON.PolygonMeshBuilder("hautcarre",cornerhaut,scene);
      var haut=hautcarre.build(null,5);
      haut.material=matsocle;
      haut.position.y=45;
      
      var pilier_path = new BABYLON.Path2(0, 6);
      pilier_path.addLineTo(0, -6);
      pilier_path.addLineTo(30, 0);
      
      var toit1= new BABYLON.PolygonMeshBuilder("toit1",pilier_path,scene);
      var meshtoit=toit1.build(null,0.1);
      meshtoit.material=toitColor;
      meshtoit.position.x=-6;
      meshtoit.position.y=45;
      meshtoit.rotation.z=Math.PI/2.3;
      
      var toit2=meshtoit.createInstance("toit2");
      toit2.position.x=6;
      toit2.rotation.y=Math.PI;

      var toit3=meshtoit.createInstance("toit3");
      toit3.position.z=6;
      toit3.position.x=0;
      toit3.rotation.y=Math.PI/2;

      var toit4=meshtoit.createInstance("toit4");
      toit4.position.z=-6;
      toit4.position.x=0;
      toit4.rotation.y=-Math.PI/2;

      //pilier
      var corner=[
        new BABYLON.Vector2(-12,12),
        new BABYLON.Vector2(12,12),
        new BABYLON.Vector2(12,-12),
        new BABYLON.Vector2(-12,-12),
                  ]
      var carre= new BABYLON.PolygonMeshBuilder("socle1",corner,scene);
      var socle1=carre.build(null,120);
      socle1.material=matsocle;
      socle1.position.y=35;

      //support horloge
      var corner2=[
        new BABYLON.Vector2(-15,15),
        new BABYLON.Vector2(15,15),
        new BABYLON.Vector2(15,-15),
        new BABYLON.Vector2(-15,-15),
      ]
      var carresup=new BABYLON.PolygonMeshBuilder("socle2",corner2,scene);
      var support=carresup.build(null,30);
      support.material=matsocle;
      support.position.y=30;
      


      //horloge
      var faceClock = BABYLON.MeshBuilder.CreateCylinder("clock", {diameterTop:25, diameterBottom:25, height: 2, tessellation: 96}, scene);
      faceClock.material=clockColor;
      faceClock.rotation.x=Math.PI/2;
      faceClock.position.z=15;
      faceClock.position.y=15;

      var instanceClock1=faceClock.createInstance("clock2");
      instanceClock1.position.z=-15;

      var instanceClock2=faceClock.createInstance("clock3");
      instanceClock2.position.z=0;
      instanceClock2.position.x=15;
      instanceClock2.rotation.y=Math.PI/2;

      var instanceClock3=faceClock.createInstance("clock4");
      instanceClock3.position.z=0;
      instanceClock3.position.x=-15;
      instanceClock3.rotation.y=Math.PI/2;
      
    }
}
