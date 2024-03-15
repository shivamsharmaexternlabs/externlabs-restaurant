import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const GetOrdersHistorySlice = createAsyncThunk(
  "GetOrdersHistorySlice",
  async (body, { rejectWithValue }) => {
      try {
          // Construct the base URL
          let url = `${process.env.REACT_APP_BASE_URL}kds/order_history/?restaurant_id=${body.restaurant_id}`;

          // Check if start_date is provided and not undefined
          if (body.start_date !== undefined) {
              // Append the start_date parameter to the URL
              url += `&start_date=${body.start_date}`;
          }

          // Check if end_date is provided and not undefined
          if (body.end_date !== undefined) {
              // Append the end_date parameter to the URL
              url += `&end_date=${body.end_date}`;
          }

          // Check if waiter is provided and not undefined
          if (body.waiter !== undefined) {
              // Append the waiter parameter to the URL
              url += `&waiter=${body.waiter}`;
          }
          if (body.page !== undefined) {
            // Append the page parameter to the URL
            url += `&page=${body.page}`;
        }

          const response = await axios.get(url, {
              headers: {
                  Authorization: `Bearer ${body.token}`                
              }
          });

          return response;
      } catch (err) {
          return rejectWithValue(err);
      }
  }
);



  export const GetWaiterNameSlice = createAsyncThunk(
    "GetWaiterNameSlice",
    async (body, { rejectWithValue }) => {
       try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}restaurant_app/staff/?restaurant_id=${body.restaurant_id}`,
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
      GetWaiterData:[],
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
      .addCase(GetWaiterNameSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(GetWaiterNameSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.GetWaiterData = action.payload;
      })

      .addCase(GetWaiterNameSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    },
});
export default OrdersHistoryReducer.reducer;