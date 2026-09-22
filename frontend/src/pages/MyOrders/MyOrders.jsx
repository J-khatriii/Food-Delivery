import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      setData(Array.isArray(response?.data?.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData([]);
    }
  }

  const getImageUrl = (image) => {
    if (!image) return assets.parcel_icon;

    const normalizedImage =
      typeof image === "string" && !image.includes(".")
        ? `${image}.png`
        : image;

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

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2 className="myorders">My Orders</h2>

      <div className="container">
        {data.length === 0 ? (
          <div className="my-orders-empty">
            <h3>No orders yet</h3>
            <p>
              Looks like you haven’t placed an order yet. Ready to find something delicious?
            </p>
            <button className="my-orders-menu-btn" onClick={() => navigate("/")}>
              Go to Menu
            </button>
          </div>
        ) : (
          (Array.isArray(data) ? data : []).map((order, index) => {
            const items = Array.isArray(order?.items) ? order.items : [];
            const firstItemImage = items[0]?.image;
            const orderImage = getImageUrl(firstItemImage);

            return (
              <div key={order?._id || index} className="my-orders-order">
                <img src={orderImage} alt={items[0]?.name || "Order item"} />

                <p>
                  {items.map((item, index) => {
                    if (index === items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ",";
                    }
                  })}
                </p>

                <p>${order?.amount ?? 0}.00</p>
                <p>Items: {items.length}</p>

                <p>
                  <span>&#x25cf;</span> <b>{order?.status || "pending"}</b>
                </p>

                <button onClick={fetchOrders}>Track Order</button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyOrders;
