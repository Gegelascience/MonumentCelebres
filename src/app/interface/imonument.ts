/**
 * Modèle d'un monument
 */
export interface IMonument {
    /**
     * Nom du monument
     */
    nom:String,
    /**
     * description du monument
     */
    description:String,
    /**
     * hauteur du monument
     */
    hauteur:Number,
    /**
     * longitude de l'emplacement du monument
     */
    longitude:Number,
    /**
     * lattitude de l'emplacement du monument
     */
    latitude:Number,
    /**
     * pays du monument
     */
    pays:String
}
