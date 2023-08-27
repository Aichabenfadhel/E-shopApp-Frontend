import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios"

const CategoryProducts = () => {
    const navigate=useNavigate()
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-category/${params.slug}`
      ); 
      setProducts(data?.product);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(params?.slug) getProductsByCat()
  },[params?.slug])

  return (
    <Layout>
      <div className="container mt-3 p-3 ">
       
            <h2 className="text-center">Category - {categories?.name}</h2>
            <h5 className="text-center">{products?.length} results Found</h5>
            <div className="row">
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
            </div>
          </div>
       
    </Layout>
  );
};

export default CategoryProducts;
