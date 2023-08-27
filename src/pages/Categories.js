import useCategory from '../Context/Hooks/useCategory'
import  Layout  from '../components/Layout/Layout'
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories=useCategory()
  return (
    <Layout title={"Categories -E-Shop"}>
<h1>All Categories</h1>
<div className="container-fluid m-3 p-3 ">
        <div className="row">
            {categories?.map((c)=>(
                     <div className="col-md-6 mt-5 gx-3 gy-3 " key={c._id }>

    <Link to={`/category/${c?.slug}`} className='btn btn-primary'>
{c?.name}
    </Link>

</div>
            ))}
     
</div>
</div>
    </Layout>
  )
}

export default Categories