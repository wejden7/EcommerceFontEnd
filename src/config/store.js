import { configureStore } from "@reduxjs/toolkit";
import produitReducer from "../page/dashbored/pages/produit/produitSlice"
export const store = configureStore({
  reducer: {
    produit : produitReducer,
  }
});