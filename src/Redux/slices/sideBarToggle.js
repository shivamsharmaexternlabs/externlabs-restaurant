import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const ToggleBar = createAsyncThunk("ToggleBar", async (body) => (
    
    
    {

    toggle: body,
}))




export const toggleBarReducer = createSlice({
    name: "toggleBarReducer",
    initialState: { 
        toggle:true,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(ToggleBar.pending, (state) => {
                state.loading = true;
            })

            .addCase(ToggleBar.fulfilled, (state, { payload }) => {

                 
                state.toggle = payload?.toggle;
            })


            .addCase(ToggleBar.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },

});

export default toggleBarReducer.reducer;
