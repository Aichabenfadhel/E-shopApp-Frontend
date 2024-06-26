import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShopify } from "react-icons/fa";
import { useAuth } from "../../Context/Auth";
import { toast } from "react-toastify";
import SearchInput from "../form/SearchInput";
import useCategory from "../../Context/Hooks/useCategory";
import { useCart } from "../../Context/Cart";
import {  Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart()
  const categories=useCategory()
  const handleLogout = () => {
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <FaShopify /> E-Shop
          </Link>
          <ul className="navbar-nav navbar-nav-right ms-auto mb-2 mb-lg-0">
            <SearchInput />
            <li className="nav-item ">
              <NavLink to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            {/* <li className="nav-item ">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li> */}

<li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle" to={"/categories"} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </NavLink>
        <ul className="dropdown-menu"  >
          <li>
            <Link className="dropdown-item"  to={"/categories"}>
              All Categories
            </Link>
          </li>
        {categories?.map((c)=>(
          <li key={c?._id}>

          <Link className="dropdown-item"  to={`/category/${c?.slug}`}>{c?.name}</Link>
          </li>
   
   ))}
   </ul>
       
      </li>

            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
               
                <li className="nav-item dropdown">
                  <button
                    className=" nav-link dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li className="nav-item">
                      <NavLink to={`/dashboard/${auth?.user?.role ===1 ? "admin" : "user"}` }className="nav-link">
                        Dashboard
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="nav-link"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
            <Badge  count={cart?.length} showZero>
      <NavLink to="/cart" className="nav-link">
                Cart
              </NavLink>
    </Badge>
              
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0"></form>
        </div>
      </nav>
    </>
  );
};

export default Header;
