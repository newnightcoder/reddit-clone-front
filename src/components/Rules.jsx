import React from "react";

const Rules = () => {
  return (
    <div className="h-max w-full flex flex-col rounded">
      <div className="header h-24 w-full bg-blue-400 rounded-tl rounded-tr relative">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">Règles du Forum</span>
      </div>
      <ul className="flex flex-col items-center justify-start px-2 pt-2 border-l border-r border-b border-gray-300 bg-white">
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-1 border-b border-gray-300">
          <span>1.</span>
          <p>Souvenez vous de l'être humain.</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-1 border-b border-gray-300">
          <span>2.</span>
          <p>Comportez-vous comme vous le feriez dans la vraie vie.</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-1 border-b border-gray-300">
          <span>3.</span>
          <p>Cherchez la source originale du contenu.</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-1 border-b border-gray-300">
          <span>4.</span>
          <p>Evitez de publier des doublons.</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-1">
          <span>5.</span>
          <p>Respectez les règles de la communauté.</p>
        </li>
      </ul>
    </div>
  );
};

export default Rules;
