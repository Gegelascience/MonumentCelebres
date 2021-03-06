
/**
 * Classe des pyramides de Gizeh
 */

export class Pyramid {

    /**
     * offset du monument par rapport à la caméra
     */
    offset:number=250;
    /**
   * Constructeur par défaut
   */
    constructor() {

    }


     /**
     * fonction pour dessiner les pyramides de Gizeh
     * @param BABYLON Variable de Babylonjs
     * @param scene scène où est dessiné les pyramides de Gizeh
     */
    public Draw(BABYLON:any,scene:any){
        
        //couleurs
        var pyramidColor=new BABYLON.StandardMaterial("pyramidColor",scene);
        pyramidColor.emissiveColor =new BABYLON.Color3(205/255,173/255,0/255);
        pyramidColor.backFaceCulling = false;

        var spaceBetween=50;

        //Khéops
        var arrayKheops=[];
        var semicorner=40;
        for (let index = 0; index < semicorner ; index++) {
            var corner=[
                new BABYLON.Vector2(semicorner-index,semicorner-index),
                new BABYLON.Vector2(-semicorner+index,semicorner-index),
                new BABYLON.Vector2(-semicorner+index,-semicorner+index),
                new BABYLON.Vector2(semicorner-index,-semicorner+index),
            ];
            var carre= new BABYLON.PolygonMeshBuilder("socle"+index,corner,scene);
            var socle=carre.build(null,2);
            socle.material=pyramidColor;
            socle.position.x=-2*spaceBetween;
            socle.position.z=-2*spaceBetween+this.offset;
            socle.position.y=index*2;
            arrayKheops.push(socle);     
        }
        var Kheops = BABYLON.Mesh.MergeMeshes(arrayKheops,true); 

        //Khéphren
        var arrayKhephren=[];
        semicorner=39;
        for (let index = 0; index < semicorner ; index++) {
            var corner=[
                new BABYLON.Vector2(semicorner-index,semicorner-index),
                new BABYLON.Vector2(-semicorner+index,semicorner-index),
                new BABYLON.Vector2(-semicorner+index,-semicorner+index),
                new BABYLON.Vector2(semicorner-index,-semicorner+index),
            ];
            var carre= new BABYLON.PolygonMeshBuilder("socle"+index,corner,scene);
            var socle=carre.build(null,2);
            socle.material=pyramidColor;
            socle.position.y=index*2;
            socle.position.z=this.offset;
            arrayKhephren.push(socle);
        }
        var Khephren=BABYLON.Mesh.MergeMeshes(arrayKhephren,true); 

        //Mykérinos
        var arrayMykenos=[];
        semicorner=19;
        for (let index = 0; index < semicorner ; index++) {
            var corner=[
                new BABYLON.Vector2(semicorner-index,semicorner-index),
                new BABYLON.Vector2(-semicorner+index,semicorner-index),
                new BABYLON.Vector2(-semicorner+index,-semicorner+index),
                new BABYLON.Vector2(semicorner-index,-semicorner+index),
            ];
            var carre= new BABYLON.PolygonMeshBuilder("socle"+index,corner,scene);
            var socle=carre.build(null,2);
            socle.material=pyramidColor;
            socle.position.x=2*(spaceBetween-10);
            socle.position.z=2*(spaceBetween-10)+this.offset;
            socle.position.y=index*2;
            arrayMykenos.push(socle);
        }
        var Mykenos=BABYLON.Mesh.MergeMeshes(arrayMykenos,true); 

        var Gizeh=BABYLON.Mesh.MergeMeshes([Kheops,Khephren,Mykenos],true); 
    }

}
