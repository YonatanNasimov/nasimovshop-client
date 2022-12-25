import { Link, useNavigate, useParams } from "react-router-dom";
import Chart from "../../adminComps/chart/Chart";
import {  useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { doApiGet, server_url } from "../../../services/apiServices";
import UpdateProd from "../../adminComps/updateProd";
import "./product.css";

export default function ProductAdmin() {
    const params = useParams();
    const productId = params["productId"];
    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );
    const [pStats, setPStats] = useState([]);
    const months = useMemo(
        () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec",
        ], []
    );

    useEffect(() => {
        getStats();
    }, [productId, months]);

    const getStats = async () => {
        let url = server_url + "/orders/get/income?pId=" + productId;
        try {
            let resp = await doApiGet(url);
            const list = resp.data.sort((a, b) => {
                return a._id - b._id
            })
            list.map((item) =>
                setPStats(prev => [
                    ...prev,
                    { name: months[item._id - 1], sales: item.total },
                ])
            );
        }
        catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/admin/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="sales" title="sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img_url} alt={product.title} className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey"><b>id:</b></span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey"><b>in stock:</b></span>
                            <span className="productInfoValue">{(product.inStock).toString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <UpdateProd/>
            </div>
        </div>
    );
}
