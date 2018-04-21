
/**
 * Classe de la Tour Eiffel
 */

export class TourEiffel {

  /**
   * Constructeur par défaut
   */
    constructor() {

    }

    /**
     * fonction pour dessiner la tour Eiffel
     */

    public Draw(BABYLON:any,scene:any){
        //couleurs
      var matsocle=new BABYLON.StandardMaterial("matsocle1",scene);
      matsocle.emissiveColor =new BABYLON.Color3(205/255,173/255,0/255);
      
      matsocle.backFaceCulling = false;

      var matetage=new BABYLON.StandardMaterial("matetage",scene);
      matetage.emissiveColor =new BABYLON.Color3(153/255,153/255,153/255);
      //matetage.wireframe=true;
      matetage.backFaceCulling = false;

      //socle piliers
      var corner=[
        new BABYLON.Vector2(-20,20),
        new BABYLON.Vector2(-20,10),
        new BABYLON.Vector2(-10,10),
        new BABYLON.Vector2(-10,20),
                  ]
      var carre= new BABYLON.PolygonMeshBuilder("socle1",corner,scene);
      var socle1=carre.build(null,2);
      socle1.material=matsocle;

      var socle2=socle1.createInstance("socle2");
     
      socle2.position.x=30;
      
      var socle3=socle1.createInstance("socle3");
      
      socle3.position.z=-30;

      var socle4=socle1.createInstance("socle4");
      
      socle4.position.z=-30;
      socle4.position.x=30;

      

      //piliers socle => 1er étage
      var piliercorner1=[
        new BABYLON.Vector2(6,0),
        new BABYLON.Vector2(0,0),
        new BABYLON.Vector2(6,30),
        new BABYLON.Vector2(12,30),
      ]

      var face1Pilier1= new BABYLON.PolygonMeshBuilder("face1p1",piliercorner1,scene);
      var f1p1=face1Pilier1.build(null,0.1);

      f1p1.position.x=-18;
      f1p1.position.z=18;
      f1p1.rotation.x=1.37-Math.PI;

      var piliercorner2=[
        new BABYLON.Vector2(0,-6),
        new BABYLON.Vector2(0,0),
        new BABYLON.Vector2(30,-6),
        new BABYLON.Vector2(30,-12),
      ]

      var face2Pilier1= new BABYLON.PolygonMeshBuilder("face2p1",piliercorner2,scene);
      var f2p1=face2Pilier1.build(null,0.1);

      f2p1.position.x=-18;
      f2p1.position.z=18;
      f2p1.rotation.z=1.37;


      var f1p2=f1p1.createInstance("face1p2");
      f1p2.position.x=18;
      f1p2.rotation.y=Math.PI/2;

      var f2p2=f2p1.createInstance("face2p2");
      f2p2.position.x=18;
      f2p2.rotation.y=Math.PI/2;

      var f1p3=f1p1.createInstance("face1p3");
      f1p3.position.z=-18;
      f1p3.rotation.y=-Math.PI/2;

      var f2p3=f2p1.createInstance("face2p3");
      f2p3.position.z=-18;
      f2p3.rotation.y=-Math.PI/2;

      var f1p4=f1p1.createInstance("face1p4");
      f1p4.position.x=18;
      f1p4.position.z=-18;
      f1p4.rotation.y=Math.PI;

      var f2p4=f2p1.createInstance("face2p4");
      f2p4.position.x=18;
      f2p4.position.z=-18;
      f2p4.rotation.y=Math.PI;


      //arches
      var arch_path = new BABYLON.Path2(15, 9);
      arch_path.addLineTo(30, 6);
      arch_path.addLineTo(30, -6);
      arch_path.addLineTo(15, -9);
      arch_path.addArcTo(25, 0, 15, 9, 100);

      var arch1 = new BABYLON.PolygonMeshBuilder("arch1", arch_path, scene);
      var arch1b = arch1.build(false, 0.1); //updatable, extrusion depth - both optional
      arch1b.position.x=-18;
      arch1b.rotation.z =1.37;
      
      
      var arch2b=arch1b.createInstance("arch2");
      arch2b.position.x=18;
      arch2b.rotation.y=Math.PI;

      
      var arch3b=arch1b.createInstance("arch3");
      arch3b.position.x=0;
      arch3b.position.z=18;
      arch3b.rotation.y=Math.PI/2;

      var arch4b=arch1b.createInstance("arch4");
      arch4b.position.x=0;
      arch4b.position.z=-18;
      arch4b.rotation.y=-Math.PI/2;

      //1er étage
      var etage1corner=[
        new BABYLON.Vector2(15,15),
        new BABYLON.Vector2(-15,15),
        new BABYLON.Vector2(-15,-15),
        new BABYLON.Vector2(15,-15),
      ]

      var hole=[
        new BABYLON.Vector2(5,5),
        new BABYLON.Vector2(-5,5),
        new BABYLON.Vector2(-5,-5),
        new BABYLON.Vector2(5,-5),
      ]
      var etage1= new BABYLON.PolygonMeshBuilder("etage1",etage1corner,scene)
      etage1.addHole(hole);
      var niveau1= etage1.build(null,4);
      niveau1.material=matetage;
      niveau1.position.y=32;

      //piliers 1er étage => 2eme étage
      piliercorner1=[
        new BABYLON.Vector2(6,0),
        new BABYLON.Vector2(0,0),
        new BABYLON.Vector2(3,20),
        new BABYLON.Vector2(9,20),
      ]

      var face1pil2lvl2= new BABYLON.PolygonMeshBuilder("face1pil1lvl2",piliercorner1,scene);
      var f1p1lvl2=face1pil2lvl2.build(null,0.1);
      f1p1lvl2.material=matsocle;

      f1p1lvl2.position.x=-12;
      f1p1lvl2.position.z=12;
      f1p1lvl2.position.y=32;
      f1p1lvl2.rotation.x=1.42-Math.PI;

      piliercorner2=[
        new BABYLON.Vector2(0,-6),
        new BABYLON.Vector2(0,0),
        new BABYLON.Vector2(20,-3),
        new BABYLON.Vector2(20,-9),
      ]

      var face2pil2lvl2= new BABYLON.PolygonMeshBuilder("face2pil1lvl2",piliercorner2,scene);
      var f2p1lvl2=face2pil2lvl2.build(null,0.1);

      f2p1lvl2.position.x=-12;
      f2p1lvl2.position.z=12;
      f2p1lvl2.position.y=32;
      f2p1lvl2.rotation.z=1.42;


      var f1p2lvl2=f1p1lvl2.createInstance("face1pil2lvl2");
      f1p2lvl2.position.x=12;
      f1p2lvl2.rotation.y=Math.PI/2;

      var f2p2lvl2=f2p1lvl2.createInstance("face2pil2lvl2");
      f2p2lvl2.position.x=12;
      f2p2lvl2.rotation.y=Math.PI/2;

      var f1p3lvl2=f1p1lvl2.createInstance("face1pil3lvl2");
      f1p3lvl2.position.z=-12;
      f1p3lvl2.rotation.y=-Math.PI/2;

      var f2p3lvl2=f2p1lvl2.createInstance("face2pil3lvl2");
      f2p3lvl2.position.z=-12;
      f2p3lvl2.rotation.y=-Math.PI/2;

      var f1p4lvl2=f1p1lvl2.createInstance("face1pil4lvl2");
      f1p4lvl2.position.x=12;
      f1p4lvl2.position.z=-12;
      f1p4lvl2.rotation.y=Math.PI;

      var f2p4lvl2=f2p1lvl2.createInstance("face1pil4lvl2");
      f2p4lvl2.position.x=12;
      f2p4lvl2.position.z=-12;
      f2p4lvl2.rotation.y=Math.PI;


      //2eme étage
      var etage2corner=[
        new BABYLON.Vector2(10,10),
        new BABYLON.Vector2(-10,10),
        new BABYLON.Vector2(-10,-10),
        new BABYLON.Vector2(10,-10),
      ]

      var hole=[
        new BABYLON.Vector2(2,2),
        new BABYLON.Vector2(-2,2),
        new BABYLON.Vector2(-2,-2),
        new BABYLON.Vector2(2,-2),
      ]
      var etage2= new BABYLON.PolygonMeshBuilder("etage2",etage2corner,scene)
      etage2.addHole(hole);
      var niveau2= etage2.build(null,4);
      niveau2.material=matetage;
      niveau2.position.y=52;

      //piliers 2eme étage => 3eme étage
      var pilier_path = new BABYLON.Path2(0, 9);
      pilier_path.addLineTo(0, -9);
      pilier_path.addLineTo(60, -3);
      pilier_path.addLineTo(60, 3);

      var face1pil1lvl3= new BABYLON.PolygonMeshBuilder("face1pil1lvl3",pilier_path,scene);
      var f2p1lvl3=face1pil1lvl3.build(null,0.1);
      f2p1lvl3.material=matsocle;
      f2p1lvl3.position.x=-9;
      f2p1lvl3.position.y=52;
      f2p1lvl3.rotation.z=1.47;
      
      var f2p2lvl3=f2p1lvl3.createInstance("face1pil2lvl3");
      f2p2lvl3.position.x=9;
      f2p2lvl3.rotation.y=Math.PI;

      var f2p3lvl3=f2p1lvl3.createInstance("face1pil3lvl3");
      f2p3lvl3.position.z=9;
      f2p3lvl3.position.x=0;
      f2p3lvl3.rotation.y=Math.PI/2;

      var f2p3lvl3=f2p1lvl3.createInstance("face1pil3lvl3");
      f2p3lvl3.position.z=-9;
      f2p3lvl3.position.x=0;
      f2p3lvl3.rotation.y=-Math.PI/2;

      //2eme étage
      var etage3corner=[
        new BABYLON.Vector2(4,4),
        new BABYLON.Vector2(-4,4),
        new BABYLON.Vector2(-4,-4),
        new BABYLON.Vector2(4,-4),
      ]

      var etage3= new BABYLON.PolygonMeshBuilder("etage3",etage3corner,scene)
      var niveau3= etage3.build(null,3);
      niveau3.material=matetage;
      niveau3.position.y=115;

      //dome
      var dome = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 6}, scene);
      dome.material=matsocle;
      dome.position.y=115;

      //antenne
      var pointsAntenne=[
        new BABYLON.Vector3(0,10,0),
        new BABYLON.Vector3(0,0,0)
      ]
      var antenne=BABYLON.MeshBuilder.CreateLines("lines", {points: pointsAntenne}, scene);
      antenne.material=matsocle;
      antenne.position.y=118;
    }
}
