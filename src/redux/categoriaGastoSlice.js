import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriaGasto, deleteCategoriaGasto, updateCategoriaGasto, postCategoriaGasto } from "../API/categoriaGasto";

// BUSCAR categoria
export const fetchCategoriaGasto = createAsyncThunk(
    'categorias/fetcCategoria',
    async(_, { rejectWithValue }) => {
        try {
            const response = await getCategoriaGasto();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// ELIMINAR categoria
export const eliminarCategoriaGasto = createAsyncThunk(
    'categorias/eliminarCategoria',
    async(id, { rejectWithValue }) => {
        try {
            const response = await deleteCategoriaGasto(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// EDITAR categoria
export const editarCategoriaGasto = createAsyncThunk(
    'categorias/editarCategoria',
    async(categoria, { rejectWithValue }) => {
        try {
            const response = updateCategoriaGasto(categoria);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// CREAR categoria
export const crearCategoriaGasto = createAsyncThunk(
    'categorias/crearCategoria',
    async(categoria, { rejectWithValue }) => {
        try {
            const response = postCategoriaGasto(categoria);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const categoriasSlice = createSlice({
    name: 'categoriaGasto',
    initialState: {
        categorias: [],
        categoria: null,
        error: null,
        success: false,
        message: ''
    },

    extraReducers: {
        // BUSCAR categorias
        [fetchCategoriaGasto.fulfilled]: (state, action) => {
            state.categorias = action.payload;
            state.success = true;
            state.message = 'categorias de ingreso cargadas';
        },

        // ELIMINAR categoria
        [editarCategoriaGasto.fulfilled]: (state, action) => {
            state.categorias = state.categorias.filter(categoria => categoria.id !== action.payload);
            state.success = true;
            state.message = 'categoria de ingreso eliminada';
        },

        // EDITAR categoria
        [editarCategoriaGasto.fulfilled]: (state, action) => {
            const index = state.categorias.findIndex(categoria => categoria.id === action.payload.id);
            if( index !== -1 ){
                state.categorias[index] = action.payload;
            }
            state.success = true;
            state.message = 'categoria actualizada correctamente';
        },

        [editarCategoriaGasto.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message
        },
        // CREAR categoria
        [crearCategoriaGasto.fulfilled]: (state, action) => {
            const { gastos, ...categoriaData } = action.payload;
            if(state.categorias === null){
                state.categorias = [];
            }
            state.categorias.push(categoriaData);
            state.success = true;
            state.message = 'categoria creada';
        }
    }
});

export default categoriasSlice.reducer;