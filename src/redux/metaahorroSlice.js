import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { postMetaAhorro } from '../API/metaahorro';

export const crearMetaAhorro = createAsyncThunk(
    'metaahorros/crearMetaAhorro',
    async (metaahorro, {rejectWithValue}) => {
        try {
            const data = await postMetaAhorro(metaahorro);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const metaahorroSlice = createSlice({
    name: 'metaahorro',
    initialState: {
        metaahorro: null,
        error: null,
        success: false,
        message: '',
    },
    reducers: {

    },
    extraReducers: {
        [crearMetaAhorro.pending]: (state, action) => {

        },
        [crearMetaAhorro.fulfilled]: (state, action) => {
            state.metaahorro = action.payload;
            state.success = true;
            state.message = 'Meta Ahorro creado';
        },
        [crearMetaAhorro.rejected]: (state, action) => {
            state.error = action.payload;
            state.success = false;
            state.message = action.payload.message;
        },
    },
});

export default metaahorroSlice.reducer;