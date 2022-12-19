import Chart from "../../adminComps/chart/Chart";
import FeaturedInfo from "../../adminComps/featuredInfo/FeaturedInfo";
import { userData } from "../../dummyData";
import WidgetSm from "../../adminComps/widgetSm/WidgetSm";
import WidgetLg from "../../adminComps/widgetLg/WidgetLg";
import { useEffect, useMemo } from "react";
import { doApiGet, server_url } from "../../../services/apiServices";
import { useState } from "react";
import "./home.css";

export default function HomeAdmin() {
  const [userStats, setUserStats] = useState([]);

  const months = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",
    ], []
  );

  useEffect(() => {
    getStats();
  }, [months]);

  const getStats = async () => {
    let url = server_url + "/users/get/stats";
    try {
      let resp = await doApiGet(url);
      resp.data.map(item =>
        setUserStats(prev => [
          ...prev,
          { name: months[item._id - 1], "Active User": item.total }
        ])
      );
    }
    catch (err) {
      console.log(err);
      alert("order problem,come back later")
    }
  }

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
