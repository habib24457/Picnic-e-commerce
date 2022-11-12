import React, { useState } from "react";
import "./ManageProducts.css";
import { useForm } from "react-hook-form";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { API } from "../Constant/Constant";

const axios = require("axios").default;
const ManageProducts = () => {
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      name: data.productName,
      price: data.productPrice,
      weight: data.productWeight,
      imageURL: imageURL,
    };
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

  const handleLogout = () => {
    console.log("Clicked");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-12">
          <Navbar bg="light" variant="light">
            <Navbar.Brand className="text-success" href="/home">
              Picnic Super Market
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/addAdmin">Add-New-Admin</Nav.Link>
                <Nav.Link href="/update">Update-Products</Nav.Link>
                <Nav.Link href="/manage">Add-Product</Nav.Link>
                <Link to="/home">
                  <Button onClick={handleLogout} className="btn btn-success">
                    Log Out
                  </Button>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>

      <div className="row justify-content-center mt-5 pt-5">
        <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="mb-5">Add new products to the database.</h4>
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
          {errors.exampleRequired && <span>This field is required</span>}
          <br />
          <input className="button-design" type="submit" />
        </form>
      </div>

      <Footer></Footer>
    </Container>
  );
};

export default ManageProducts;
