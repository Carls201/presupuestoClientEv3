import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAhorro, deleteAhorro, updateAhorro, postAhorro } from '../API/ahorro';

// BUSCAR ahorro
export const fetchAhorro = createAsyncThunk(
    'ahorros/fetchAhorros',
    async(_, { rejectWithValue }) => {
        try {
            const data = await getAhorro();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// ELIMINAR ahorro
export const eliminarAhorro = createAsyncThunk(
    'ahorros/eliminarAhorro',
    async(id, { rejectWithValue }) => {
        try {
            const data = await deleteAhorro(id);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// EDITAR ahorro
export const editarAhorro = createAsyncThunk(
    'ahorros/editarAhorro',
    async (ahorro, { rejectWithValue }) => {
      try {
        const response = await updateAhorro(ahorro);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// CREAR ahorro
export const crearAhorro = createAsyncThunk(
    'ahorros/crearAhorro',
    async (ahorro, { rejectWithValue }) => {
      try {
        const data = await postAhorro(ahorro);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const ahorrrosSlice = createSlice({
    name: 'ahorros',
    initialState: {
        ahorros: [],
        ahorro: null,
        error: null,
        success: false,
        message: ''
    },
    extraReducers: {
        // BUSCAR ahorro
        [fetchAhorro.fulfilled]: (state, action) => {
            state.ahorros = action.payload;
            state.success = true;
            state.message = 'ahorros cargados';
        },

        // Eliminar ahorro
        [eliminarAhorro.fulfilled]: (state, action) => {
            state.ahorros = state.ahorros.filter(ahorro => ahorro.id !== action.payload);
            state.success = true;
            state.message = 'ahorro eliminado correctamente';
        },

        // EDITAR ahorro
        [editarAhorro.fulfilled]: (state, action) => {
            const index = state.ahorros.findIndex(ahorro => ahorro.id === action.payload.id);
            if (index !== -1) {
            state.ahorros[index] = action.payload;
            }
            state.success = true;
            state.message = 'ahorro actualizado correctamente';
        },
        [editarAhorro.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // CREAR ahorro
        [crearAhorro.fulfilled]: (state, action) => {
            //const { ahorros, ...metaData } = action.payload; // Usando desestructuración para omitir ahorros
            if (state.ahorros === null) {
                state.ahorros = [];
            }
            state.ahorros.push(action.payload); // Solo se añade metaData que no incluye ahorros
            state.success = true;
            state.message = 'ahorro creada correctamente.';
        }
        
        
        
    }
})

export default ahorrrosSlice.reducer;