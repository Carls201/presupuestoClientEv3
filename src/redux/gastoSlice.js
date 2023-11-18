import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGasto, deleteGasto, updateGasto, postGasto } from '../API/gasto';


// BUSCAR gasto
export const fetchGasto = createAsyncThunk(
    'gastos/fetchGasto',
    async(_, { rejectWithValue }) => {
        try {
            const response = await getGasto();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// ELIMINAR gasto
export const eliminarGasto = createAsyncThunk(
    'gastos/eliminarGasto',
    async(id, { rejectWithValue }) => {
        try {
            const response = await deleteGasto(id);
            console.log(response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// EDITAR gasto
export const editarGasto = createAsyncThunk(
    'gasto/editarGasto',
    async (gasto, { rejectWithValue }) => {
      try {
        const response = await updateGasto(gasto);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// CREAR gasto
export const crearGasto = createAsyncThunk(
    'gasto/crearGasto',
    async (gasto, { rejectWithValue }) => {
      try {
        const response = await postGasto(gasto);
        return response;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const gastoSlice = createSlice({
    name: 'gastos',
    initialState: {
        gastos: [],
        gasto: null,
        error: null,
        success: false,
        message: ''
    },
    extraReducers: {
        // BUSCAR gasto
        [fetchGasto.fulfilled]: (state, action) => {
            state.gastos = action.payload;
            state.success = true;
            state.message = 'gastos cargados';
        },

        // Eliminar gasto
        [eliminarGasto.fulfilled]: (state, action) => {
            state.gastos = state.gastos.filter(gasto => gasto.idGasto !== action.payload);
            state.success = true;
            state.message = 'gasto eliminado correctamente';
        },

        // EDITAR gasto
        [editarGasto.fulfilled]: (state, action) => {
            const index = state.gastos.findIndex(gasto => gasto.idGasto === action.payload.idGasto);
            if (index !== -1) {

                const updatedGasto = Object.entries(action.payload).reduce((newObj, [key, value]) => {
                    if(value !== null) {
                        newObj[key] = value;
                    }
                    return newObj;
                }, {});

                state.gastos[index] = { ...state.gastos[index], ...updatedGasto};
            }
            state.success = true;
            state.message = 'gasto actualizado correctamente';
        },
        [editarGasto.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // CREAR gasto
        [crearGasto.fulfilled]: (state, action) => {
            if (state.gastos === null) {
                state.gastos = [];
            }
            state.gastos.push(action.payload);
            state.success = true;
            state.message = 'gasto creada correctamente.';
        }
        
        
        
    }
})

export default gastoSlice.reducer;