import React from "react";
import {  Routes, Route } from "react-router-dom";
import {ContextProvider} from './page/dashbored/categorie/contextCategorie'
import {ContextProviderSouCategorie} from './page/dashbored/sousCategorie/contextSousCategorie'
import {ContextProviderSousSousCategorie} from './page/dashbored/sousSousCategorie/contextSousSousCategorie'
import {ContextProviderForniseur} from './page/dashbored/forniseur/contextForniseur'
import {ContextProviderMarque} from './page/dashbored/marque/marque'
import {ContextProviderProduit} from './page/dashbored/produit/produit'
import "./App.css";
import { Login,Dashbored,Home ,Categorie,SousCategorie,SousSousCategorie,Forniseur,Marque,Produit} from "./page";
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
                  <ContextProviderProduit>
                    <Produit/>
                  </ContextProviderProduit>
                  
                }/>
                
              </Route>
              
             
            </Routes>
              
              
         
  );
};

export default App;
