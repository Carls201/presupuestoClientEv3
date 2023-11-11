import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRol, deleteRol, updateRol, postRol } from '../API/rol';

// BUSCAR ROLES
export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async(_, { rejectWithValue }) => {
        try {
            const data = await getRol();
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// ELIMINAR ROL
export const eliminarRol = createAsyncThunk(
    'roles/eliminarRol',
    async(id, { rejectWithValue }) => {
        try {
            const data = await deleteRol(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// EDITAR ROL
export const editarRol = createAsyncThunk(
    'roles/editarRoles',
    async (rol, { rejectWithValue }) => {
      try {
        const response = await updateRol(rol);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// CREAR ROL
export const crearRol = createAsyncThunk(
    'roles/crearRol',
    async (rol, { rejectWithValue }) => {
      try {
        const data = await postRol(rol);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        rol: null,
        error: null,
        success: false,
        message: ''
    },
    reducers: {
        resetRol: (state) => {
            state.roles = [];
            state.rol = null;
            state.error = null;
            state.success = false;
            state.message = '';
        },
        resetErrorState: (state) => {
            state.error = null;
        },
    },
    extraReducers: {
        // BUSCAR USUARIO
        [fetchRoles.fulfilled]: (state, action) => {
            state.roles = action.payload;
            state.success = true;
            state.message = 'Roles cargados';
        },

        // Eliminar Usuario
        [eliminarRol.fulfilled]: (state, action) => {
            state.roles = state.roles.data.filter(rol => rol.id !== action.meta.arg);
            state.success = true;
            state.message = 'Rol eliminado correctamente';
        },
        [eliminarRol.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // EDITAR USUARIO
        // Editar Usuario
        [editarRol.fulfilled]: (state, action) => {
            const index = state.roles.findIndex(rol => rol.id === action.payload.id);
            if (index !== -1) {
            state.roles[index] = action.payload;
            }
            state.success = true;
            state.message = 'Rol actualizado correctamente';
        },
        [editarRol.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // Crear Usuario
        [crearRol.fulfilled]: (state, action) => {
            state.usuario = action.payload;
            state.success = true;
            state.message = 'Rol guardado';
        }
    }
})

export const { resetRol, resetErrorState } = rolesSlice.actions;
export default rolesSlice.reducer;