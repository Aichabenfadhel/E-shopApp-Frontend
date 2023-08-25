import React,{useState,useEffect} from 'react'
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios"
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Products = () => {

    const [products,setProducts]=useState([])

    //get All Products
    const getAllProducts = async ()=>{
        try {
            const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/products/allproducts`)
            setProducts(data.products)
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

useEffect(()=>{
getAllProducts();
},[])

  return (
    <Layout>
         <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1 className='text-center'>All Products List </h1>
            <div className='d-flex flex-wrap'>
            {products?.map( p=>(
                <Link to={`/dashboard/admin/product/${p.slug}`}
                 key={p._id}
                 className='product-list '
                 >
                    <div className="card m-2" style={{width: "18rem"}} >
                <img className="card-img-top"
                 src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}/>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                </div>
              </div>
                </Link>
                
            )
            )}
            </div>
            </div>
            </div>
            </div>
    </Layout> 
  )
}

export default Products