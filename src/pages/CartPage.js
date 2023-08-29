import Layout from "../components/Layout/Layout";
import React from "react";
import { useCart } from "../Context/Cart";
import { useAuth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const totalPrice=()=>{
    try {
        let total=0
        cart?.map((item) =>{

           total = total +item.price
        })
        return total
        
    } catch (error) {
        console.log(error);
    }
  }

const removeCartItem =(pid)=>{
try {
    const myCart=[...cart]
    let index=myCart.findIndex(item=> item._id === pid)
    myCart.splice(index,1)
    setCart(myCart)
    localStorage.setItem('cart',JSON.stringify(myCart))
} catch (error) {
    console.log(error);
}
}

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  } `
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    className="card-img-top"
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                    width="50px"
                    height="150px"
                  />
                </div>
                <div className="col-md-8">
                    <h4>Name :{p.name}</h4>
                    <p>
                        {p.description.substring(0,30)}
                    </p>
                    <h4>Price : {p.price}</h4>
                    <button className="btn btn-danger"
                    onClick={()=>removeCartItem(p._id)}
                    >Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h3>Cart Summary</h3>
            <p>Total | Checkout | Payment</p>
            <hr/>
            <h4>Total : {totalPrice()} DT </h4>
            {auth?.user?.adress ?(
              <>
              <div className="mb-3" >
                <h4>Current Address</h4>
                <h5>{auth?.user?.adress}</h5>
                <button className="btn btn-outline-warning"
                onClick={()=>navigate('/dashboard/user/profile')}
                >
                  Update Address
                </button>
              </div>
              </>
            ):(<>
            <div className="mb-3">
              {auth?.token ? (
                <button className="btn btn-outline-warning"
                onClick={()=>navigate('/dashboard/user/profile')}
                >
                  Update Address
                </button>
              ) : (<button className="btn btn-outline-warning"
                onClick={()=>navigate('/login',{
                  state:"/cart",
                })}
              >
Please Login To Checkout
              </button>)}
            </div>
            </>)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
