import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../services/apiServices";

const Success = () => {
  const details = useSelector(state => state.cart.details);
  const data = details.stripeData;
  const cart = useSelector(state => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser.user._id,
          username: currentUser.user.username,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          adress: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch (err) { console.log(err) }
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button onClick={() => window.location.href = window.location.href} style={{ padding: 10, marginTop: 20 }}>
        <Link style={{textDecoration:"none",color:"black"}} to={"/"}>Go to Homepage </Link>
      </button>
    </div>
  );
};

export default Success;