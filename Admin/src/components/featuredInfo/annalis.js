import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

export default function Annalis() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const user = useSelector((state) => state.user?.allUsers);
  const Product = useSelector((state) => state.product?.products);



  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{user?.length}</span>
        </div>
        <span className="featuredSub">All user</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Accout verify</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{user?.filter(name => name?.verif === true).length}</span>
        </div>
        <span className="featuredSub">All product</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{Product?.length}</span>
        </div>
        <span className="featuredSub">All product</span>
      </div>
    </div>
  );
}