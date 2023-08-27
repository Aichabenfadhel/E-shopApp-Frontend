import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../Context/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate=useNavigate()
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState("")

  //getTotal count
  const getTotal =async()=>{
    try {
      const {data}= await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total)
    } catch (error) {
      console.log();
    }
  }

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //load more
  const loadMore =async()=>{
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false)
      setProducts([...products,...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

useEffect(()=>{
  if(page===1) return ;
  loadMore();
},[page])
  //get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Something went wrong");
    }
  };

 

  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/allcategories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, []);
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked,radio]);

  //get filtred products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"E-Shop"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-2">
            {/* CATEGORY FILTER */}

            <h4 className="text-center mt-4">Filter by category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            {/* PRICE FILTER */}

            <h4 className="text-center">Filter by Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio
                      value={p.array}
                      onChange={(e) => setRadio(e.target.value)}
                    >
                      {p.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="d-flex flex-column">
              <button className="btn btn-danger"
              onClick={()=>window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>

          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">{p.price} DT</p>
                    <button className="btn btn-primary m-1"
                    onClick={()=>navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary m-1">
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
 <div className="m-2 p-3">
            {products && products.length < total &&(
              <button className="btn btn-warning" onClick={(e)=>{
                e.preventDefault()
                setPage(page+1);
              }}>
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )} 
          </div>

          </div>
         
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
