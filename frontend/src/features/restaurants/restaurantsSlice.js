import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import restaurantService from "./restaurantsService";
const initialState = {
  restaurants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Restaurant
export const createRestaurant = createAsyncThunk(
  "restaurants/create",
  async (restaurantData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await restaurantService.createRestaurant(restaurantData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all Restaurants
export const getRestaurants = createAsyncThunk(
  "restaurants/getAll",
  async (_, thunkAPI) => {
    try {
      return await restaurantService.getRestaurants();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get restaurant details
export const getRestaurantDetails = createAsyncThunk(
  "restaurants/details",
  async (restaurantId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await restaurantService.restaurantDetails(restaurantId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete restaurant
export const deleteRestaurant = createAsyncThunk(
  "restaurants/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await restaurantService.deleteRestaurant(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// edit restaurant
export const editRestaurant = createAsyncThunk(
  "restaurnt/edit",
  async (restaurantId, restaurantDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await restaurantService.editRestaurant(
        restaurantId,
        restaurantDetails,
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRestaurant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRestaurants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRestaurantDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRestaurant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editRestaurant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editRestaurant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(editRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = restaurantSlice.actions;
export default restaurantSlice.reducer;
