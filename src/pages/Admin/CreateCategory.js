import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import {  Modal, ModalHeader, ModalBody } from "reactstrap";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error("Error in creating category");
      }
    } catch (error) {
      console.log(error);
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
      toast.error("Something went wrong in getting categories");
    }
  };

  //update category
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, {name:updatedName}
      );

 if (data?.success) {
        toast.success(`${updatedName} is updated` );
        setSelected(null)
        setUpdatedName("")
        setIsModalOpen(false)
        getAllCategories()
      } else {
        toast.error("Error in updating category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating categories");
    }
  };

  //delete product 
  const DeleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );

 if (data?.success) {
        toast.success("Category is deleted" );
        getAllCategories()
      } else {
        toast.error("Error in deleting category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1> Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat) => (
                    <>
                      <tr>
                        <td key={cat._id}>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={()=>{setIsModalOpen(!isModalOpen);
                              setUpdatedName(cat.name);
                              setSelected(cat)
                            }}
                              
                          >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2"
                           onClick={()=>{DeleteCategory(cat._id)}}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal isOpen={isModalOpen} toggle={toggle}>
              <ModalHeader toggle={toggle}>Modal title</ModalHeader>
              <ModalBody>
                <CategoryForm
                  handleSubmit={updateCategory}
                  value={updatedName}
                  setValue={setUpdatedName}
                />
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
