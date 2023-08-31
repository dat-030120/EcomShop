import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const user = useSelector((state) => state.user?.allUsers);
  const Product = useSelector((state) => state.product?.products);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("/orders/income");
        setIncome(res.data);
        setPerc((res.data[0].total * 100) / res.data[1].total - 10);
      } catch (err) {console.dir(err)}
    };
    getIncome();
    console.log(user?.filter(name => name.verif === true))

  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0]?.total} &#8363;</span>
          <span className="featuredMoneyRate">  
            %{Math.floor(perc)+" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month {income[1]?.total} &#8363;</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{Product?.length}</span>

        </div>
        <span className="featuredSub">All product</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{user?.length}</span>
        </div>
        <span className="featuredSub">All user</span>
      </div>
    </div>
  );
}