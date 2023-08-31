import Chart from "../../components/chart/Chart";
import Annalis from "../../components/featuredInfo/annalis";
import "./analytics.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function Analytics() {
  const [userStats, setUserStats] = useState([]);
  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {  
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
        setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    const get = async () => {

      try {  
        const res = await userRequest.get("orders/income");
        res.data.map((item) =>
        setPStats((prev) => [
            ...prev,
            { name: MONTHS[item?._id - 1], "Active User": item?.total },
          ])
        );
      } catch {}
    };
    getStats();
    get();
  }, [MONTHS]);


  return (
    <div className="home">
      <Annalis />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />

      <Chart
        data={pStats}
        title="Product"
        grid
        dataKey="Active User"
      />

    </div>
  );
}
