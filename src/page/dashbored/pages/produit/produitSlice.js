import {
  getAll,
  update,
  deleteById,
  create,
  uplodeImageById,
  addNewDiscription,
  updateDiscription,
  deleteDiscription,
  deleteImage
} from "../../../../service/produit";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";

const produitAdapter = createEntityAdapter({
  selectId: (a) => a._id,
});

const initialState = produitAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
});

export const fetchProduit = createAsyncThunk("produit/fetchProduit", getAll);
export const creatProduit = createAsyncThunk(
  "produit/creatProduit",
  (initialProduit) => create(initialProduit, null)
);
export const updateProduit = createAsyncThunk(
  "produit/updateProduit",
  (initialProduit) => update(initialProduit)
);
export const addImageProduit = createAsyncThunk(
  "produit/addImageProduit",
  (initialProduit) => uplodeImageById(initialProduit)
);
export const addDescription = createAsyncThunk(
  "produit/addDescription",
  (initialProduit) => addNewDiscription(initialProduit)
);
export const modifierDiscription = createAsyncThunk(
  "produit/modifierDiscription",
  (initialProduit) => updateDiscription(initialProduit)
);
export const supprumeDiscription = createAsyncThunk(
  "produit/supprumeDiscription",
  (initialProduit) => deleteDiscription(initialProduit)
);
export const supprumeImage = createAsyncThunk(
  "produit/supprumeImage",
  (initialProduit) => deleteImage(initialProduit)
);
export const deleteProduit = createAsyncThunk(
  "produit/deleteProduit",
  (initialProduit) => {
    const { id } = initialProduit;
    console.log(id);
    return deleteById(id)
      .then(() => initialProduit)
      .catch((error) => error.message);
  }
);
const produitSlice = createSlice({
  name: "produit",
  initialState,
  reducers: {
    increaseCount(state, action) {
      state.count += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduit.pending, (state, action) => {
        console.log("loading");
        state.status = "loading";
      })
      .addCase(fetchProduit.fulfilled, (state, action) => {
        console.log("succeeed");
        //state.Produit = [];
        state.status = "succeded";
        //Adding date and reactions

        //state.Produit = state.Produit.concat(loadedProduit);
        console.log(action.payload);
        produitAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchProduit.rejected, (state, action) => {
        console.log("failed");

        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(creatProduit.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("add succeeded");

          produitAdapter.addOne(state, action.payload);
        }
      }).addCase(updateProduit.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("update succeeded produit");

          produitAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(addImageProduit.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("add succeeded Image");

          produitAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(addDescription.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("add succeeded Description");

          produitAdapter.upsertOne(state, action.payload);
        }
      }).addCase(modifierDiscription.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("update succeeded Description");

          produitAdapter.upsertOne(state, action.payload);
        }
      }).addCase(supprumeDiscription.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("update succeeded Description");

          produitAdapter.upsertOne(state, action.payload);
        }
      }).addCase(supprumeImage.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          console.log("update succeeded Description");

          produitAdapter.upsertOne(state, action.payload);
        }
      })
      .addCase(deleteProduit.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("delete not");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        console.log("delete");
        console.log(action.payload);
        produitAdapter.removeOne(state, id);
      });
  },
});

export const {
  selectAll: selectAllProduit,
  selectById: selectProduitById,
  selectIds: selectProduitIds,
  selectEntities: selectEntitiesProduit,
  selectTotal: selectTotalProduit,
  // pass in a selctor that returns the Produit slice of state
} = produitAdapter.getSelectors((state) => state.produit);

export const getProduitstatus = (state) => state.produit.status;
export const getProduitError = (state) => state.produit.error;
export const getCount = (state) => state.produit.count;
export const { increaseCount } = produitSlice.actions;
export default produitSlice.reducer;
