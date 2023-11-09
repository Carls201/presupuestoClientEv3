import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMetaAhorro, deleteMetaAhorro, updateMetaAhorro, postMetaAhorro } from '../API/metaahorro';

// BUSCAR META
export const fetchMetas = createAsyncThunk(
    'metas/fetchMetas',
    async(_, { rejectWithValue }) => {
        try {
            const data = await getMetaAhorro();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// ELIMINAR META
export const eliminarMeta = createAsyncThunk(
    'metas/eliminarMeta',
    async(id, { rejectWithValue }) => {
        try {
            const data = await deleteMetaAhorro(id);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// EDITAR META
export const editarMeta = createAsyncThunk(
    'metas/editarMetas',
    async (meta, { rejectWithValue }) => {
      try {
        const response = await updateMetaAhorro(meta);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// CREAR META
export const crearMeta = createAsyncThunk(
    'metas/crearMeta',
    async (meta, { rejectWithValue }) => {
      try {
        const data = await postMetaAhorro(meta);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const metasSlice = createSlice({
    name: 'metas',
    initialState: {
        metas: [],
        meta: null,
        error: null,
        success: false,
        message: ''
    },
    extraReducers: {
        // BUSCAR META
        [fetchMetas.fulfilled]: (state, action) => {
            state.metas = action.payload;
            state.success = true;
            state.message = 'metas cargados';
        },

        // Eliminar META
        [eliminarMeta.fulfilled]: (state, action) => {
            state.metas = state.metas.filter(meta => meta.id !== action.payload);
            state.success = true;
            state.message = 'meta eliminado correctamente';
        },

        // EDITAR META
        [editarMeta.fulfilled]: (state, action) => {
            const index = state.metas.findIndex(meta => meta.id === action.payload.id);
            if (index !== -1) {
            state.metas[index] = action.payload;
            }
            state.success = true;
            state.message = 'meta actualizado correctamente';
        },
        [editarMeta.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // CREAR META
        [crearMeta.fulfilled]: (state, action) => {
            const { ahorros, ...metaData } = action.payload; // Usando desestructuración para omitir ahorros
            if (state.metas === null) {
                state.metas = [];
            }
            state.metas.push(metaData); // Solo se añade metaData que no incluye ahorros
            state.success = true;
            state.message = 'Meta creada correctamente.';
        }
        
        
        
    }
})

export default metasSlice.reducer;