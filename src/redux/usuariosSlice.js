import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUsuario, getUsuarios, deleteUsuario, updateUsuario } from '../API/usuario';


// Eliminar Usuario
export const eliminarUsuario = createAsyncThunk(
  'usuarios/eliminarUsuario',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteUsuario(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Editar Usuario
export const editarUsuario = createAsyncThunk(
  'usuarios/editarUsuario',
  async (usuario, { rejectWithValue }) => {
    try {
      const response = await updateUsuario(usuario);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Crear Usuario
export const crearUsuario = createAsyncThunk(
  'usuarios/crearUsuario',
  async (usuario, { rejectWithValue }) => {
    try {
      const data = await postUsuario(usuario);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Buscar usuarios
export const fetchUsuarios = createAsyncThunk(
  'usuarios/fetchUsuarios',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUsuarios();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: {
    usuarios: [],
    usuario: null,
    error: null,
    success: false,
    message: '',
  },
  reducers: {
    //restablecer el estado
    resetUsuario: (state) => {
      state.usuarios = [];
      state.usuario = null;
      state.error = null;
      state.success = false;
      state.message = '';
    }
  },
  extraReducers: {
    [crearUsuario.pending]: (state, action) => {
      // Cambia el estado a loading o añade flags como necesites
    },
    // Editar Usuario
    [editarUsuario.fulfilled]: (state, action) => {
      const index = state.usuarios.findIndex(usuario => usuario.id === action.payload.id);
      if (index !== -1) {
        state.usuarios[index] = action.payload;
      }
      state.success = true;
      state.message = 'Usuario actualizado correctamente';
    },
    [editarUsuario.rejected]: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.message = action.payload.Message;
    },

    // Eliminar Usuario
    [eliminarUsuario.fulfilled]: (state, action) => {
      // Elimina el usuario del estado. Suponiendo que la acción incluye el ID del usuario.
      state.usuarios = state.usuarios.filter(usuario => usuario.id !== action.meta.arg);
      state.success = true;
      state.message = 'Usuario eliminado correctamente';
    },

    // Buscar Usuario
    [fetchUsuarios.fulfilled]: (state, action) => {
      state.usuarios = action.payload;
      state.success = true;
      state.message = 'Usuarios cargados';
    },

    // Crear Usuario
    [crearUsuario.fulfilled]: (state, action) => {
      state.usuario = action.payload;
      state.success = true;
      state.message = 'Usuario guardado';
    },
    [crearUsuario.rejected]: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.message = action.payload.Message;
    },
  },
});

export const { resetUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;
