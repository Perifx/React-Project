import { Link, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductByID,
} from "../../store/reducers/productSlice";
import { useState } from "react";
import { useEffect } from "react";

export default function Product() {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { productId } = useParams();
  console.log(productId);
  const { productById } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductByID(productId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  console.log(productById);
  console.log(product);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct({ productId, product }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={productById.img} alt="" className="productInfoImg" />
            <span className="productName">{productById.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID: </span>
              <span className="productInfoValue">{productById._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{productById.desc}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {productById.inStock ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form
          className="productForm"
          onSubmit={submitHandler}
          onChange={changeHandler}
        >
          <div className="productFormLeft">
            <label>Product Name</label>
            <input name="title" type="text" placeholder={productById.title} />
            <label>Product Price</label>
            <input name="price" type="number" placeholder={productById.price} />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={productById.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button type="submit" className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
