import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import shopping from "../../images/shopping.jpg";
import { UserContext } from "../../App";
import Footer from "../Footer/Footer";
import CommonNav from "../CommonNav/CommonNav";
import { Link } from "react-router-dom";
import { API } from "../Constant/Constant";

const SelectedProduct = () => {
  let { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [loggedinUser] = useContext(UserContext);

  useEffect(() => {
    fetch(API + `/singleProduct/${productId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [productId]);

  console.log(products);
  console.log(loggedinUser);

  /**add every single ordered product to the database with email */
  const uploadSelectedProduct = (products) => {
    const url = API + "/addOrder";
    const order = {
      name: products[0].name,
      price: products[0].price,
      quantity: 1,
      email: sessionStorage.getItem("email") || loggedinUser.email,
      orderTime: new Date(),
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        console.log("Server", response);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <CommonNav></CommonNav>
      <div className="row mt-5">
        <div className="col-md-6">
          <img
            src={shopping}
            style={{ width: "450px", height: "550px" }}
            alt=""
          />
        </div>

        <div className="col-md-6 d-flex justify-content-center">
          <div
            class="card text-center shadow-lg"
            style={{ width: "18rem", height: "32rem" }}
          >
            <h3 className="text-success">Your selected item</h3>
            <img
              class="card-img-top p-3"
              style={{ height: "250px" }}
              src={products[0]?.imageURL}
              alt="product"
            />
            <div class="card-body">
              <h3 class="card-title text-success">{products[0]?.name}</h3>
              <p class="card-text">Wight:{products[0]?.weight}</p>
              <p class="card-text">Price:{products[0]?.price}$</p>
              <Link to="/order">
                <button
                  onClick={() => uploadSelectedProduct(products)}
                  className="buy-button"
                >
                  Proceed
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SelectedProduct;
