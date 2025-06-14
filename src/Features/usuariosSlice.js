import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk para cargar usuarios solo una vez o cuando lo necesites
export const fetchUsuarios = createAsyncThunk(
  "usuarios/fetchUsuarios",
  async () => {
    const res = await fetch("http://localhost:8080/usuario/listar");
    if (!res.ok) throw new Error("Error al cargar usuarios");
    return await res.json();
  }
);

const usuariosSlice = createSlice({
  name: "usuarios",
  initialState: {
    lista: [],
    loading: false,
    error: null,
  },
  reducers: {
    agregarUsuario: (state, action) => {
      state.lista.push(action.payload);
    },
    actualizarUsuario: (state, action) => {
      const idx = state.lista.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.lista[idx] = action.payload;
    },
    eliminarUsuario: (state, action) => {
      state.lista = state.lista.filter(u => u.id !== action.payload);
    },
    limpiarUsuarios: (state) => {
      state.lista = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuarios.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { agregarUsuario, actualizarUsuario, eliminarUsuario, limpiarUsuarios } = usuariosSlice.actions;
export default usuariosSlice.reducer;