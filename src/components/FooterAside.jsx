import React from "react";

const FooterAside = () => {
  return (
    <div className="h-max w-72 flex flex-col space-y-4 text-xs bg-white rounded text-gray-800 p-4 border border-gray-300">
      <div className="flex justify-between h-max w-full space-x-3">
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Aide</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Pièces Connect</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Connect Premium</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Pièces Connect</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Connect Gifts</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Communautés</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">ReConnect</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Thématiques</li>
        </ul>
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Carrières</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Presse</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Publicités</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Blog</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Conditions</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Politique De Contenu</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Politique De Confidentialité</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">Politique De Modération</li>
        </ul>
      </div>
      <span className="w-full text-center">Connect Inc © 2021 - Tous droits réservés</span>
    </div>
  );
};

export default FooterAside;
