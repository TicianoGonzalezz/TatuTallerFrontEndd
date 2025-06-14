import { configureStore } from "@reduxjs/toolkit";
import usuariosReducer from "../Features/usuariosSlice";

export default configureStore({
  reducer: {
    usuarios: usuariosReducer,
  },
});

