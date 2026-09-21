import { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const getCartImageUrl = (imageName) => {
    if (!imageName) return "/images/parcel_icon.png";

    const normalizedImage =
      typeof imageName === "string" && !imageName.includes(".")
        ? `${imageName}.png`
        : imageName;

    if (normalizedImage.startsWith("http")) return normalizedImage;
    if (normalizedImage.startsWith("/")) return normalizedImage;

    if (
      /^(food_|menu_|header_|logo|app_store|play_store|rating_starts)/i.test(
        normalizedImage,
      )
    ) {
      return `/images/${normalizedImage}`;
    }
    return `${url}/images/${normalizedImage}`;
  }

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

        {food_list.map((item, index) => {
          const itemKey = String(item._id ?? item.name ?? "");
          if ((cartItems[itemKey] ?? 0) > 0) {
            return (
              <div key={itemKey}>
                <div className="cart-items-title cart-items-item">
                  <img src={getCartImageUrl(item.image)} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[itemKey]}</p>
                  <p>${item.price * cartItems[itemKey]}</p>
                  <p className="cross" onClick={() => removeFromCart(itemKey)}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="">
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            Proceed To Checkout
          </button>
        </div>

        <div className="cart-promocode">
          <div className="">
            <p>If you have a promocode. Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promocode" />
              <button>APPLY</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
