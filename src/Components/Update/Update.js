import React, { useState, useEffect } from "react";
import "./Update.css";
import { Button, Nav, Navbar, Container, Table } from "react-bootstrap";
//import { Link } from "react-router-dom";
import { API } from "../Constant/Constant";
import { useForm } from "react-hook-form";
const axios = require("axios").default;

const Update = () => {
  const [products, setProducts] = useState([]);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);

  console.log(isUpdate);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    fetch(API + "/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  };

  console.log(imageURL);

  const deleteItem = (id) => {
    fetch(API + `/deleteItem/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted");
        getAllProducts();
      })
      .catch((err) => console.log(err));
  };

  const getUpdateItem = (id) => {
    fetch(API + `/productForUpdate/${id}`)
      .then((response) => response.json())
      .then((data) => setUpdateProduct(data))
      .catch((err) => console.log(err));
  };

  const updateItem = (id) => {
    //e.preventDefault();
    //console.log("update..", id);
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const weight = document.getElementById("product-weight").value;
    const product = { id, name, price, weight, imageURL };
    console.log(product);
    fetch(API + `/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated", data);
        getAllProducts();
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (data) => {
    const productData = {
      name: data.productName,
      price: data.productPrice,
      weight: data.productWeight,
      imageURL: imageURL,
    };
    console.log(productData);
    const url = API + "/addProduct";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        alert("Product saved", response);
        refreshInputs();
        getAllProducts();
      })
      .catch((err) => console.log(err));
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "f7675ca9a0ed0f2cd7c6d55c64d847b9");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const refreshInputs = () => {
    document.getElementById("product-form").reset();
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-12">
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="/home">Picnic Super Market</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-8">
          <Table striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Price</th>
                <th>Weight</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr id="pData">
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.weight}</td>
                  <td>
                    <img
                      style={{ height: "50px", width: "50px" }}
                      src={product.imageURL}
                      alt="prodImg"
                    />
                  </td>
                  <td className="d-flex justify-content-center">
                    <Button
                      onClick={() => {
                        setIsUpdate(true);
                        getUpdateItem(product._id);
                      }}
                      className="btn btn-success mr-5"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => deleteItem(product._id)}
                      className="btn btn-danger "
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="col-md-4">
          {isUpdate ? (
            <>
              <form className="form-group">
                <h3 className="text-success">Update product</h3>

                <input
                  className="form-control"
                  id="product-name"
                  type="text"
                  defaultValue={updateProduct.name}
                  placeholder="Name"
                  required
                />
                <input
                  className="form-control"
                  id="product-price"
                  type="text"
                  defaultValue={updateProduct.price}
                  placeholder="Price"
                  required
                />
                <input
                  className="form-control"
                  id="product-weight"
                  type="text"
                  defaultValue={updateProduct.weight}
                  placeholder="Weight"
                  required
                />
                <br />
                <input
                  name="exampleRequired"
                  type="file"
                  onChange={handleImageUpload}
                />
                <br />
                <div className=" mt-5 btn-div d-flex justify-content-around">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsUpdate(false)}
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      updateItem(updateProduct._id);
                    }}
                    className="btn btn-success"
                  >
                    Save Updated Data
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div>
              <div className="justify-content-center mt-3">
                <form
                  className="form-group"
                  id="product-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <h4 className="mb-5 text-success">
                    Add new products to the database.
                  </h4>
                  <input
                    className="form-control"
                    name="productName"
                    placeholder="Product Name"
                    ref={register}
                    required
                  />
                  <br />
                  <input
                    className="form-control"
                    name="productPrice"
                    placeholder="Price"
                    ref={register}
                    required
                  />
                  <br />
                  <input
                    className="form-control"
                    name="productWeight"
                    placeholder="Weight"
                    ref={register}
                    required
                  />
                  <br />
                  <input
                    name="exampleRequired"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <br />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                  <br />
                  <input className="button-design" type="submit" />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Update;
