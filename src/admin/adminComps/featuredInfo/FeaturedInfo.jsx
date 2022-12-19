import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from 'react';
import { doApiGet, server_url } from '../../../services/apiServices';
import "./featuredInfo.css";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [incomeObj, setIncomeObj] = useState({});
  const [lastItem, setLastItem] = useState({});
  const [beforeLastItem, setBeforeLastItem] = useState({});
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    getIncome();
  }, [])

  const getIncome = async () => {
    let url = server_url + "/orders/get/income";
    try {
      let resp = await doApiGet(url);
      setIncome(resp.data);
      setIncomeObj(resp.data[1]);
      setLastItem(resp.data[resp.data.length-1])
      setBeforeLastItem(resp.data[resp.data.length-2])
      setPerc((resp.data[1].total * 100) / resp.data[0].total - 100);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  const sales = (lastItem.total)-(beforeLastItem.total);
  const cost = ((lastItem.total)-(beforeLastItem.total)) / 5;

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{incomeObj?.total}$</span>
          <span className="featuredMoneyRate">
            {perc.toFixed(2)}%
            {perc < 0
              ? <ArrowDownwardIcon className="featuredIcon negative" />
              : <ArrowUpwardIcon className="featuredIcon" />
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{sales}$</span>
          <span className="featuredMoneyRate">
            {sales < 0
              ? <ArrowDownwardIcon className="featuredIcon negative" />
              : <ArrowUpwardIcon className="featuredIcon" />
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{cost}$</span>
          <span className="featuredMoneyRate">
          {cost < 0
              ? <ArrowDownwardIcon className="featuredIcon negative" />
              : <ArrowUpwardIcon className="featuredIcon" />
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
