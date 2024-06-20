import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Cart = () => {
  const [isOrdering, setIsOrdering] = useState(false);
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, removeAllCard, addToCart, url } = useContext(StoreContext);

  const navigate = useNavigate();
  const proceedToCheckout = () => {
    setIsOrdering(true);
    if (getTotalCartAmount() === 0) {
      setTimeout(() => {
        alert("Please select items to proceed.");
        setIsOrdering(false);
        setTimeout(() => {
          navigate("/search");
        }, 1000);
      }, 2000);
    } else {
      setTimeout(() => {
        navigate("/order");
      }, 3000);
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p className="para-items">
                    <img
                      className="image-icon"
                      onClick={() => removeFromCart(item._id)}
                      src={assets.remove_icon_red}
                      alt="Remove"
                    />
                    {cartItems[item._id]}
                    <img
                      className="image-icon1"
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_white}
                      alt="Add"
                    />
                  </p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeAllCard(item._id)} className="cross">X</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</b>
            </div>
          </div>
          <button onClick={proceedToCheckout} disabled={isOrdering}>
            {isOrdering ? 'Processing...' : 'PROCEED TO CHECKOUT'}
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
