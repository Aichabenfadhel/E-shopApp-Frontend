import Layout  from "../components/Layout/Layout"
import React ,{useState,useEffect}from 'react'
import axios from "axios"
import { json, useParams } from "react-router-dom"

const ProductDetails = () => {

    const params=useParams()
    const [product,setProduct]=useState([])
    const [similarProducts,setSimilarProducts]=useState([])

const getProduct=async()=>{
    try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/products/singleproduct/${params.slug}`
        );
       setProduct(data?.product)
       await getSimilarProducts(data?.product._id,data?.product.category._id)
      } catch (error) {
        console.log(error);
      }
}
useEffect(() => {
    if(params?.slug) getProduct();
  }, [params?.slug]);

  //get similar products
  const getSimilarProducts = async(pid,cid)=>{
    try {
      const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/products/similar-products/${pid}/${cid}`
        );
        
        setSimilarProducts(data?.products);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <Layout>
         <div className="container-fluid m-3 p-3 ">
        <div className="row container mt-2">
          <div className="col-md-6 ">
            
           
                <img className="card-img-top"
                 src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
                  alt={product.name}
                   height="350px"
                   width={"350px"}
                  />
               
              </div>
            
              <div className="col-md-6 ">
                  <h1 className="text-center">Product Details</h1>
                  <h4>Name : {product?.name}</h4>
                  <h4>Description : {product?.description}</h4>
                  <h4>Price : {product?.price} DT</h4>
                  <h4>Quantity : {product?.quantity} </h4>
                  <h4>Category : {product?.category?.name} </h4>
                  <button className="btn btn-secondary m-1">
                      Add To Cart
                    </button>
                  </div>
            </div>
            <hr/>
            <div className="row container"> 
            <h5>Similar Products</h5>
            {similarProducts.length<1 && <p className="text-center">No Similar Products Found</p>}
            <div className="d-flex flex-wrap">
              {similarProducts?.map((p) => (
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
  )
}

export default ProductDetails