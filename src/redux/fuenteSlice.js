import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFuenteIngreso, deleteFuenteIngreso, updateFuenteIngreso, postFuenteIngreso } from "../API/fuenteIngreso";

// BUSCAR FUENTE
export const fetchFuentes = createAsyncThunk(
    'fuentes/fetchFuntes',
    async(_, { rejectWithValue }) => {
        try {
            const response = await getFuenteIngreso();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// ELIMINAR FUENTE
export const eliminarFuente = createAsyncThunk(
    'fuentes/eliminarFuente',
    async(id, { rejectWithValue }) => {
        try {
            const response = await deleteFuenteIngreso(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// EDITAR FUENTE
export const editarFuente = createAsyncThunk(
    'fuentes/editarFuente',
    async(fuente, { rejectWithValue }) => {
        try {
            const response = updateFuenteIngreso(fuente);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// CREAR FUENTE
export const crearFuente = createAsyncThunk(
    'fuentes/crearFuente',
    async(fuente, { rejectWithValue }) => {
        try {
            const response = postFuenteIngreso(fuente);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const fuentesSlice = createSlice({
    name: 'fuentes',
    initialState: {
        fuentes: [],
        fuente: null,
        error: null,
        success: false,
        message: ''
    },

    extraReducers: {
        // BUSCAR FUENTES
        [fetchFuentes.fulfilled]: (state, action) => {
            state.fuentes = action.payload;
            state.success = true;
            state.message = 'Fuentes de ingreso cargadas';
        },

        // ELIMINAR FUENTE
        [eliminarFuente.fulfilled]: (state, action) => {
            state.fuentes = state.fuentes.filter(fuente => fuente.id !== action.payload);
            state.success = true;
            state.message = 'Fuente de ingreso eliminada';
        },

        // EDITAR FUENTE
        [editarFuente.fulfilled]: (state, action) => {
            const index = state.fuentes.findIndex(fuente => fuente.id === action.payload.id);
            if( index !== -1 ){
                state.fuentes[index] = action.payload;
            }
            state.success = true;
            state.message = 'Fuente actualizada correctamente';
        },
        [editarFuente.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // CREAR FUENTE
        [crearFuente.fulfilled]: (state, action) => {
            const { ingresos, ...fuenteData } = action.payload;
            if(state.fuentes === null){
                state.fuentes = [];
            }
            state.fuentes.push(fuenteData);
            state.success = true;
            state.message = 'Fuente creada';
        }
    }
});

export default fuentesSlice.reducer;
