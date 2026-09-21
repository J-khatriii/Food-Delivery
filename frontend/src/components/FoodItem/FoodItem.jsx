import { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {
    cartItems = {},
    addToCart,
    removeFromCart,
    url,
  } = useContext(StoreContext) || {};

  const itemKey = String(id ?? name ?? "");
  const itemCount = cartItems?.[itemKey] ?? 0;

  const getFoodImageUrl = (imageName) => {
    if (!imageName) return assets.parcel_icon;
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

  const imageUrl = getFoodImageUrl(image);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={imageUrl} alt={name} />

        {/* <img className='food-item-image' src={`/images/${image}.png`} alt="" /> */}

        {!itemCount ? (
          <img
            className="add"
            onClick={() => addToCart?.(itemKey)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart?.(itemKey)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{itemCount}</p>
            <img
              onClick={() => addToCart?.(itemKey)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
