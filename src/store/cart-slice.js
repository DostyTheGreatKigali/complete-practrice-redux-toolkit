import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

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

// ABOUT TO CALL ASYNCHRONOUS FUNCTION IN REDUX 
// DATA REQUESTS TO BE MADE FROM HERE

export const sendCartData = (cart) => {
    return async (dispatch) => {
    //  Send state as sending request
        dispatch(
            uiActions.showNotification({
              open: true,
              message: 'Sending Request',
              type: 'warning'
            })
        );

        const sendRequest = async () => {
            //  Send state as sending request
            // dispatch(uiActions.showNotification({
            //   open: true,
            //   message: "Sending Request",
            //   type: 'warning'
            // }))
            const res = await fetch('https://practice-redux-toolkit-default-rtdb.firebaseio.com/cartItems.json', {
              method: 'PUT',
              body: JSON.stringify(cart)
             }
            ); 
            const data = await res.json(); 
            // Send state as Request is successful
            dispatch(
               uiActions.showNotification({
                    open: true,
                    message: "Request sent successfully",
                    type: 'success'
            })
            );
          };

          // HTTP REQUEST
            try {
                await sendRequest()
            } catch(error) {   
            // Send state as Error
                dispatch(
                    uiActions.showNotification({
                        open: true,
                        message: "Sending Request Failed",
                        type: 'error '
                })
            );
        }
    }  
}

export const cartActions = cartSlice.actions;

export default cartSlice;

