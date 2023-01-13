import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Declare actions here
    addToBasket: (state: any, action: any) => {
      state.items = [...state.items, action.payload]; // preseve the existing items in basket using "...state.items", add new item using "action.payload"
    },
    removeFromBasket: (state: any, action: any) => {
      const index = state.items.findIndex(
        (basketItem: Product) => basketItem.id === action.payload
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        //Item exists in basket... Remove it...
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id:${action.payload}) as it is not in the basket`
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket?.items;
// Calculate the total number of items
export const selectTotal = (state: any) =>
  state.basket?.items.reduce((total: any, item: any) => total + item.price, 0); // total starts at 0. Iterate through the items

export default basketSlice.reducer;
