import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngreso, deleteIngreso, updateIngreso, postIngreso } from '../API/ingreso';


// BUSCAR INGRESO
export const fetchIngreso = createAsyncThunk(
    'ingresos/fetchIngresos',
    async(_, { rejectWithValue }) => {
        try {
            const response = await getIngreso();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// ELIMINAR INGRESO
export const eliminarIngreso = createAsyncThunk(
    'ingresos/eliminarIngresos',
    async(id, { rejectWithValue }) => {
        try {
            const response = await deleteIngreso(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

// EDITAR INGRESO
export const editarIngreso = createAsyncThunk(
    'ingreso/editarIngreso',
    async (ingreso, { rejectWithValue }) => {
      try {
        
        const response = await updateIngreso(ingreso);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// CREAR INGRESO
export const crearIngreso = createAsyncThunk(
    'ingreso/crearIngreso',
    async (ingreso, { rejectWithValue }) => {
      try {
        const response = await postIngreso(ingreso);
        return response;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const ingresosSlice = createSlice({
    name: 'ingresos',
    initialState: {
        ingresos: [],
        ingreso: null,
        error: null,
        success: false,
        message: ''
    },
    extraReducers: {
        // BUSCAR ingreso
        [fetchIngreso.fulfilled]: (state, action) => {
            state.ingresos = action.payload;
            state.success = true;
            state.message = 'ingresos cargados';
        },

        // Eliminar ingreso
        [eliminarIngreso.fulfilled]: (state, action) => {
            state.ingresos = state.ingresos.filter(ingreso => ingreso.idIngreso !== action.payload);
            state.success = true;
            state.message = 'ingreso eliminado correctamente';
        },

        // EDITAR ingreso
        [editarIngreso.fulfilled]: (state, action) => {
            const index = state.ingresos.findIndex(ingreso => ingreso.idIngreso === action.payload.idIngreso);
            if (index !== -1) {
                const updatedIngreso = Object.entries(action.payload).reduce((newObj, [key, value]) => {
                    if(value !== null) {
                        newObj[key] = value;
                    } 
                    return newObj;
                }, {});


                state.ingresos[index] = {...state.ingresos[index], ...updatedIngreso}
            }
            state.success = true;
            state.message = 'ingreso actualizado correctamente';
        },
        
        [editarIngreso.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.Message;
        },

        // CREAR ingreso
        [crearIngreso.fulfilled]: (state, action) => {
            if (state.ingresos === null) {
                state.ingresos = [];
            }
            state.ingresos.push(action.payload);
            state.success = true;
            state.message = 'ingreso creada correctamente.';
        }
        
        
        
    }
})

export default ingresosSlice.reducer;