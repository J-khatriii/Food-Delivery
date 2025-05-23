import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems, url } = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({...data,[name]:value})
  }

  // useEffect(() => {
  //   console.log(data)
  // },[data])


  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    });

    // console.log(orderItems)
    let orderData  = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response  = await axios.post(`${url}/api/order/place`,orderData,{ headers:{token} });
    console.log("Order placed successfully:", response.data);
    if(response.data.success){
      const {session_url} = response.data;
      console.log("Order placed successfully:", session_url);
      window.location.replace(session_url);
    }else{
      console.log("Order failed")
    }
  }

  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
          <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName}  placeholder='Last Name'/>
        </div>
        <input required type="email" name='email' onChange={onChangeHandler} value={data.email}  placeholder='Email Address' />
        <input required type="text" name='street' onChange={onChangeHandler} value={data.street}  placeholder='Street'/>
        <div className="multi-fields">
          <input required type="text" name='city' onChange={onChangeHandler} value={data.city}  placeholder='City' />
          <input required type="text" name='state' onChange={onChangeHandler} value={data.state}  placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required type="text" name='zipCode' onChange={onChangeHandler} value={data.zipCode}  placeholder='ZipCode' />
          <input required type="text" name='country' onChange={onChangeHandler} value={data.country}  placeholder='Country'/>
        </div>
        <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone}  placeholder='Phone'/>
      </div>

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
