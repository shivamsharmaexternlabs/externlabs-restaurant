import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const ToggleBar = createAsyncThunk("ToggleBar", async (body) => (
    {
        toggle: body,
    }))


export const ToggleNewLeads = createAsyncThunk("ToggleNewLeads", async (body) => (
    {
        togglenewleads: body,
    }
))


export const LoadingSpinner = createAsyncThunk("LoadingSpinner", async (body) => (
    {
        loadingspinner: body,
    }
))



export const toggleBarReducer = createSlice({
    name: "toggleBarReducer",
    initialState: {
        toggle: true,
        togglenewleads: false,
        loadingspinner: false,
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
            })



            .addCase(ToggleNewLeads.pending, (state) => {
                state.loading = true;
            })

            .addCase(ToggleNewLeads.fulfilled, (state, { payload }) => {
                state.togglenewleads = payload?.togglenewleads;
            })


            .addCase(ToggleNewLeads.rejected, (state, action) => {
                state.error = action.error.message;
            })

            // for loader
            .addCase(LoadingSpinner.pending, (state) => {
                state.loading = true;
            })

            .addCase(LoadingSpinner.fulfilled, (state, { payload }) => {
                state.loadingspinner = payload?.loadingspinner;
            })


            .addCase(LoadingSpinner.rejected, (state, action) => {
                state.error = action.error.message;
            })
    },

});

export default toggleBarReducer.reducer;
