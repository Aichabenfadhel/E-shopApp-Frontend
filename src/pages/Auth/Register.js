import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from 'react-toastify';
import "../../styles/AuthStyles.css"

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, adress, phone,answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong !");
    }
  };

  return (
    <Layout title={"Register- E-Shop"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">Register Page</h1>
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
              required
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
              required
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
            <label for="exampleInputEmail1">Address</label>
            <input
              type="text"
              class="form-control"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              id="adress"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div class="mb-3 form-group">
            <label for="exampleInputEmail1">Answer</label>
            <input
              type="text"
              class="form-control"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              id="answer"
              placeholder="answerrr"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
