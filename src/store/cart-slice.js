import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'auth',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            // to check if the item already exists (as in chosen by user)
            const existingItem = state.itemsList.find((item) => item.id === newItem.id);

            if(existingItem) {
                existingItem.quantity++;
                // existingItem.price += newItem.price;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });

                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;

            const existingItem = state.itemsList.find(item => item.id === id);

            if(existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id);
                state.totalQuantity--
            } else {
                existingItem.quantity--;
                // existingItem.price += newItem.price;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state) {
            // state.showCart = true
            state.showCart = !state.showCart
        }
    }
});

// const sendCart = (cart) => {
//     return (dispatch)
// }

export const cartActions = cartSlice.actions;

export default cartSlice;