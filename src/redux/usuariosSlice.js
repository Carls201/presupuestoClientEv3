import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUsuario, getUsuarios, deleteUsuario, updateUsuario } from '../API/usuario';
import { getToken } from '../API/auth';
import { jwtDecode } from "jwt-decode";


// Buscar usuarios
export const fetchUsuarios = createAsyncThunk(
  'usuarios/fetchUsuarios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsuarios();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      console.log(usuario);
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
      const response = await postUsuario(usuario);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Busxar token 
export const meIdUsuario = createAsyncThunk(
  'usuario/token',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const decodedToken = jwtDecode(token);
      return decodedToken.IdUsuario;
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
    id: null,
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

    [fetchUsuarios.fulfilled]: (state, action) => {
      state.usuarios = action.payload;
      state.success = true;
      state.message = 'Usuarios cargados';
    },

    // Editar Usuario
    [editarUsuario.fulfilled]: (state, action) => {

      const index = state.usuarios.findIndex(usuario => usuario.idUsuario === action.payload.idUsuario);
      if (index !== -1) {
        const updatedUsuario = Object.entries(action.payload).reduce((newObj, [key, value]) => {
          if(value !== null) {
            newObj[key] = value;
          }
          return newObj;
        }, {});

        state.usuarios[index] = {
          ...state.usuarios[index],
          ...updatedUsuario
        };
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
      state.usuarios = state.usuarios.filter(usuario => usuario.idUsuario !== action.payload);
      state.success = true;
      state.message = 'Usuario eliminado correctamente';
    },

   

    // Obtener token
    [meIdUsuario.fulfilled]: (state, action) => {
      state.id = action.payload;
      state.success = true;
      state.message = 'token encontrado';
    },

    // Crear Usuario
    [crearUsuario.fulfilled]: (state, action) => {

      if(state.usuarios === null){
        state.usuarios = [];
      }
      state.usuarios.push(action.payload);
      state.success = true;
      state.message = 'Usuario guardado';
    }
  },
});

export const { resetUsuario } = usuariosSlice.actions;
export default usuariosSlice.reducer;
