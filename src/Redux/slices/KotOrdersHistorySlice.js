import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const GetOrdersHistorySlice = createAsyncThunk(
    "GetOrdersHistorySlice",
    async (body, { rejectWithValue }) => {
      // kot/?restaurant_id=89c2cce5-c2c2-4159-9bb6-ff4dcfa17e82&table_id=51cd9a2d-83c6-4598-bbae-45b445962911'
       try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}kds/kot/?restaurant_id=${body.restaurant_id}&table_id=${body?.tableId?body?.tableId:""}`,
          {
            headers: {
                Authorization: `Bearer ${body.token}`                
            },
          }
        );
        // toast.success("Successful");
        return response;
      } catch (err) {
        // toast.error(err?.response?.data?.message);
        return rejectWithValue(err);
      }
    }
  );

  

  export const OrdersHistoryReducer = createSlice({
    name: "OrdersHistoryReducer",
    initialState: {
      GetOrdersHistoryData: [],
      loading: false,
      error: null,
    },
    reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetOrdersHistorySlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetOrdersHistorySlice.fulfilled, (state, action) => {
        state.loading = false;
        state.GetOrdersHistoryData = action.payload;
      })

      .addCase(GetOrdersHistorySlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    },
});
export default OrdersHistoryReducer.reducer;