import { useEffect, useState } from "react";
import { format } from "timeago.js";
import { doApiGet, server_url } from "../../../services/apiServices";
import "./widgetLg.css";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    let url = server_url + "/orders";
    try {
      let resp = await doApiGet(url);
      setOrders(resp.data);
    }
    catch (err) {
      console.log(err.response);
      alert("There problem try come back later")
    }
  }

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order._id} className="widgetLgTr">
                <td className="widgetLgUser">
                  <span className="widgetLgName">{order.userId || order._id}</span>
                </td>
                <td className="widgetLgDate">{format(order.createdAt)}</td>
                <td className="widgetLgAmount">{order.amount} USD</td>
                <td className="widgetLgStatus">
                  <Button type={order.status} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
