import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/Notification";

// Variable to prevent Alert on first load
let isFirstRender = true;
function App() {

  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log(isLoggedIn)

  // const cartItems = useSelector((state) => state.cart.itemsList);
  // console.log(cartItems);

  useEffect(() => { 

    if(isFirstRender) {
      isFirstRender = false;
      return;
    }

    const sendRequest = async () => {
      //  Send state as sending request
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request",
        type: 'warning'
      }))
      const res = await fetch('https://practice-redux-toolkit-default-rtdb.firebaseio.com/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
      }
      ); 
      const data = await res.json(); 
      // Send state as Request is successful
      dispatch(uiActions.showNotification({
        open: true,
        message: "Request sent successfully",
        type: 'success'
      }))
    };

     sendRequest().catch(error => {
       // Send state as Error
       dispatch(uiActions.showNotification({
        open: true,
        message: "Sending Request Failed",
        type: 'error '
      }))
     });
  }, [cart])
  // useEffect(() => { 
  //    fetch('https://practice-redux-toolkit-default-rtdb.firebaseio.com/cartItems.json', {
  //      method: 'PUT',
  //      body: JSON.stringify(cart)
  //    })
  // }, [cart])

  return ( 
    <div className="App">
      {/* <Notification type="success" message={"Dummy message"} /> */}
    { notification && <Notification type={notification.type} message={notification.message} /> }
      { !isLoggedIn && <Auth />}
      
      { isLoggedIn &&  <Layout /> }
    </div>
  );
}
 
export default App;
