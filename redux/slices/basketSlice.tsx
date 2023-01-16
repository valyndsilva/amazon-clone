import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  totalItemQty: 0,
  // totalBasketQty: 0,
  tax: 0,
  subAmount: 0,
  totalAmount: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Declare actions here
    addToBasket: (state: any, action: any) => {
      // state.items = [...state.items, action.payload]; // preseve the existing items in basket using "...state.items", add new item using "action.payload"

      // When you add more than 1 qty of the same product to basket it is added as a separate product instead of just increasing the qty of the product. Let's handle this below:
      // check if item is already in the basket that you are trying to add in the basket
      const itemIndex = state.items.findIndex(
        (item: any) => item.id === action.payload.id
      ); // finds position of the item that already exists in the basket
      // if item is already in the basket itemIndex is >= 0
      if (itemIndex >= 0) {
        state.items[itemIndex].itemQty += 1;
        toast.info(
          `Product already in basket. Increased product quantity by 1.`,
          {
            position: "bottom-left",
          }
        );
      } else {
        // if item does not exist itemIndex is -1
        const tempProduct = { ...action.payload, itemQty: 1 };
        // state.items.push(action.payload);
        state.items.push(tempProduct);
        toast.success(`${action.payload.title} added to the basket.`, {
          position: "bottom-left",
        });
      }
    },
    increment: (state: any, action: any) => {
      const itemIndex = state.items.findIndex(
        (item: any) => item.id === action.payload
      ); // finds position of the item that already exists in the basket

      console.log(itemIndex);
      state.items[itemIndex].itemQty += 1;
      toast.info(`Increased product quantity by 1.`, {
        position: "bottom-left",
      });
    },
    decrement: (state: any, action: any) => {
      const itemIndex = state.items.findIndex(
        (item: any) => item.id === action.payload
      ); // finds position of the item that already exists in the basket

      let newBasket = [...state.items];
      if (state.items[itemIndex]?.itemQty <= 1) {
        // state.items[itemIndex].itemQty = 0;
        newBasket.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].itemQty -= 1;
        toast.info(`Decreased product quantity by 1.`, {
          position: "bottom-left",
        });
      }
      state.items = newBasket;
    },
    removeFromBasket: (state: any, action: any) => {
      const itemIndex = state.items.findIndex(
        (item: Product) => item.id === action.payload
      );
      let newBasket = [...state.items];
      if (itemIndex >= 0) {
        //Item exists in basket... Remove it...
        newBasket.splice(itemIndex, 1);
      } else {
        console.warn(
          `Cannot remove product (id:${action.payload}) as it is not in the basket`
        );
      }
      state.items = newBasket;
    },
    getBasketCount: (state: any) => {
      let cartCount = state.items.reduce(
        (total: any, item: any) => item.itemQty + total,
        0
      );
      state.totalItemQty = cartCount;
    },
    getSubTotal: (state: any) => {
      state.subAmount = state.items?.reduce(
        (acc: any, item: any) => item.price * item.itemQty + acc,
        0
      ); // total starts at 0. Iterate through the items
    },
    getTax: (state: any) => {
      // GST value: 18% => action.payload
      state.tax = (18 / 100) * state.subAmount;
    },
    getTotalAmount: (state: any) => {
      // state.totalAmount = state.tax + state.subAmount;
      state.totalAmount = state.subAmount;
    },

    clearBasket: (state: any) => {
      state.items = []; //
      state.totalItemQty = 0;
      state.tax = 0;
      state.subAmount = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToBasket,
  increment,
  decrement,
  removeFromBasket,
  getBasketCount,
  getSubTotal,
  getTax,
  getTotalAmount,
  clearBasket,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: any) => state.basket?.items;

export default basketSlice.reducer;
