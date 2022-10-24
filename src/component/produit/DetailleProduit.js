import React,{}from 'react'

const DetailleProduit = ({produit})=>{
    return (
        <div className="mt-2 mr-4 grid gap-2 col-span-2">
          <table className="table-fixed w-full  ">
            <thead>
              <tr className="bg-gray-300 ">
                <th className="py-3">Name</th>
                <th>Prix (TND)</th>
                <th>Tva</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 ">
                <td className="text-center py-3 ">{produit.name}</td>
                <td className="text-center py-3">{produit.prix}</td>
                <td className="text-center py-3">{produit.tva}</td>
                <td className="text-center py-3">{produit.quantity}</td>
              </tr>
            </tbody>
          </table>
          <table className="table-fixed w-full  ">
            <thead>
              <tr className="bg-gray-300 ">
                <th className="py-3">Categorie</th>
                <th>Forniseur</th>
                <th>Marque</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 ">
                <td className="text-center py-3 ">{produit.categorie.label}</td>
                <td className="text-center py-3">{produit.forniseur.name}</td>
                <td className="text-center py-3">{produit.marque.label}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );

}

export default DetailleProduit;