import React from "react";

export default function ToolTip  ({ offset = 0 }){

    return (
        <div
        className="absolute z-50 w-max rounded-lg border-2 border-gray-200 bg-white px-3 py-2 font-bold uppercase text-purple-500 shadow-lg animate-bounce"
        style={{ top: '-50px'}} // Ajustez la position pour qu'il soit centré
      >
        Start
        <div
          className="absolute h-3 w-3 bg-white border-b-2 border-r-2 border-gray-200 "
          style={{
            top: '88.5%', // Positionner en bas de l'encadré
            left: 'calc(50% - 6px)', // Centrer horizontalement
            // border: 'solid 2px', // Ajouter une bordure
            // borderColor: 'transparent transparent gray-200 gray-200', // Couleurs de la bordure pour créer la flèche
            transform: 'rotate(45deg)', // Appliquez la rotation après le positionnement
          }}
        ></div>
      </div>
    )
};