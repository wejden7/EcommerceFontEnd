import React from "react";

import {  Routes, Route } from "react-router-dom";
import {ContextProvider} from './contexts/dashbored/contextProviderCategorie'
import {ContextProviderSouCategorie} from './contexts/dashbored/contextProviderSousCategorie'
import {ContextProviderSousSousCategorie} from './contexts/dashbored/contextProviderSousSousCategorie'
import {ContextProviderForniseur} from './contexts/dashbored/contextProviderForniseur'
import {ContextProviderMarque} from './contexts/dashbored/contextProviderMarque'
import "./App.css";
import { Login,Dashbored,Home ,Categorie,SousCategorie,SousSousCategorie,Forniseur,Marque,Produit,ProduitDetailler} from "./page";
import {ProtectedRoute} from "./component"

const App = () => {
  
  return (
    
            <Routes>
              <Route path="/" element={<Login/>} >

              </Route>
              
              <Route path="/dashbored" element={
                <ProtectedRoute>
                      <Dashbored/>
                </ProtectedRoute>
              
              } >
                <Route index element={<Home/>} />
                <Route path="home" element={<Home/>} />
                <Route path="categorie" element={
                  <ContextProvider>
                        <Categorie/>
                  </ContextProvider>
               } />
                <Route path="sousCategorie" element={
                  <ContextProviderSouCategorie>
                        <SousCategorie/>
                  </ContextProviderSouCategorie>
                  
                }/>
                <Route path="sousCategorie/:id" element={
                  <ContextProviderSouCategorie>
                        <SousCategorie/>
                  </ContextProviderSouCategorie>
                  
                }/>
                <Route path="sousSousCategorie" element={
                  <ContextProviderSousSousCategorie>
                        <SousSousCategorie/>
                  </ContextProviderSousSousCategorie>
                  
                }/>
                 <Route path="forniseur" element={
                  <ContextProviderForniseur>
                        <Forniseur/>
                  </ContextProviderForniseur>
                  
                }/>
                <Route path="marque" element={
                  <ContextProviderMarque>
                        <Marque/>
                  </ContextProviderMarque>
                  
                }/>
                <Route path="produit" element={
               
                    <Produit/>
               
                  
                }/>
                <Route path="produit/:id" element={
               
               <ProduitDetailler/>
          
             
           }/>
                
              </Route>
              
             
            </Routes>
              
              
         
  );
};

export default App;
