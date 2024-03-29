import React, { useState, useEffect } from "react";
import "./Home.css";
import { Button, Navbar, Nav, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { API } from "../Constant/Constant";
import home from "../../images/home.png";
import PuffLoader from "react-spinners/PuffLoader";
import MockData from "../MockData/Mock.json";
// import energy from "../../images/prodImg/energy.png";
// import wine from "../../images/prodImg/wine.jpeg";
// import honey from "../../images/prodImg/honey.jpeg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    //console.log(MockData);
    getProduct();
  }, []);

  const getProduct = async () => {
    await fetch(API + "/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setDone(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <div className="row">
        <div className="col-md-12">
          <Navbar className="fixed-top">
            <Navbar.Brand className="text-success" href="/home">
              Picnic Super Market
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/order">Orders</Nav.Link>
                <Nav.Link href="/update">Admin</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${home})`,
          height: "45vh",
          width: "100vw",
          display: "block",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
        className="row mb-5 d-flex"
      >
        <div className="col-md-6"></div>

        <div className="col-md-6 mt-5 pt-5">
          <div style={{ display: "flex" }}>
            <p className="text-design">PICNIC</p>
            <PuffLoader color="#36d7b7" size="50" />
          </div>
          <p className="text-design">Best Online Market!</p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <hr />

          <p className="available-prod-txt text-center">Available Products</p>
          <hr />
        </div>
      </div>

      <div className="row justify-content-center mt-2 pt-2 mb-5 pb-5">
        {MockData.map((mockProd) => (
          <div>
            <Card
              className="p-3 m-3"
              style={{ width: "18rem", height: "30rem" }}
            >
              <Card.Img variant="top" src={mockProd.imageURL} />
              <Card.Body>
                <Card.Title>{mockProd.name}</Card.Title>
                <Card.Text>Price:{mockProd.price}$</Card.Text>
                <Card.Text>Weight:{mockProd.weight}</Card.Text>

                <Link to={`/selectedProduct/${mockProd.id}`}>
                  <Button className="buy-button">
                    <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                    Add to cart
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {!done ? (
        <div className="row justify-content-center mt-2 pt-2 mb-5 pb-5">
          <div className="col-md-4"></div>
          <div className="col-md-4 text-center">
            <p>
              If it takes too long to load, please reload the page or clear your
              browser cache.
            </p>
            <div className="text-center ml-5 pl-5">
              <ReactLoading
                type={"spin"}
                color={"green"}
                height={100}
                width={100}
              />
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      ) : (
        <div className="row justify-content-center mt-2 pt-2 mb-5">
          {products.map((product) => (
            <div>
              <Card
                className="p-3 m-3"
                style={{ width: "18rem", height: "30rem" }}
              >
                <Card.Img variant="top" src={product.imageURL} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price:{product.price}$</Card.Text>
                  <Card.Text>Weight:{product.weight}</Card.Text>

                  <Link to={`/selectedProduct/${product._id}`}>
                    <Button className="buy-button">
                      <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                      Add to cart
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}

      <Footer></Footer>
    </Container>
  );
};

export default Home;
