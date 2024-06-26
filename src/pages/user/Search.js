import  Layout  from "../../components/Layout/Layout"
import React from 'react'
import { useSearch } from "../../Context/search"

const Search = () => {
    const [values,setValues]=useSearch()

  return (
    <Layout title={"Search Results"}>
        <div className="container">
        <div className="text-center" >
    <h1>Search Results</h1>
    <h6>{values?.results.length<1 ? 'No Products Found' : `Found ${values?.results.length}`}</h6>
    
            <div className="d-flex flex-wrap mt-4">
              {values?.results.map((p) => (
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
                    <button className="btn btn-primary m-1">
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
  )
}

export default Search