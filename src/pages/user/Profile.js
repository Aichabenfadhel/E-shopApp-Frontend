import React, { useEffect } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../Context/Auth'
import axios from "axios"
import { toast } from 'react-toastify';

const Profile = () => {

  const [auth,setAuth]=useAuth()
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [adress, setAdress] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, adress, phone}
      );
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth,user:data?.updatedUser})
      let ls=localStorage.getItem("auth")
      ls=JSON.parse(ls)
      ls.user=data?.updatedUser
      localStorage.setItem("auth",JSON.stringify(ls))
      toast.success(data?.message)
      }
     
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  useEffect(()=>{
    const {email,name,adress,phone} = auth?.user
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAdress(adress)
  },[auth?.user])


  return (
    <Layout title={"Your Profile -E-Shop"}>
    <div className='container-fluid m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
            <UserMenu/>
        </div>
        <div className='col-md-9'>
            {/* <h1>Your Profile</h1> */}

        
        <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">USER PROFILE</h1>
          <div class="mb-3 form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              class="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div class="mb-3 form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              
              disabled
            />
          </div>
          <div class="mb-3 form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword1"
              placeholder="Password"
              
            />
          </div>
          <div class="mb-3 form-group">
            <label for="exampleInputEmail1">Phone</label>
            <input
              type="text"
              class="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div class="mb-3 form-group">
            <label for="exampleInputEmail1">Adress</label>
            <input
              type="text"
              class="form-control"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              id="adress"
              placeholder="Enter Your Adress"
              required
            />
          </div>

        

          <button type="submit" class="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </Layout>
  )
}

export default Profile