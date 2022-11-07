import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    datas: {},
    error: ""
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state, action) => {
            state.loading = true
        }).addCase(fetchData.fulfilled, (state, action) => {
            state.datas = action.payload;
            state.loading = false;
        }).addCase(fetchData.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
});

//export const { } = weatherSlice.actions;

export default weatherSlice.reducer;

//Thunk
export const fetchData = createAsyncThunk(
    'weather/fetchData',
    async (name, {rejectWithValue}) => {
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
            // console.log(response.data);
            return response.data;
        }catch(err){
            //console.log(err.response.data.message);
            return rejectWithValue(err.response.data.message);
        }
    }
)