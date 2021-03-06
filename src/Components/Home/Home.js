import React, { useState, useEffect } from 'react';
import './Home.css';
import { Button, Navbar, Nav, Container, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';



const Home = () => {
    const [products, setProducts] = useState([]);
    const [done, setDone] = useState(false);


    useEffect(() => {
        fetch('https://lychee-surprise-09798.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setDone(true);
            })

    }, [])


  
    return (
        <Container>
            <div className="row">
                <div className="col-md-12">
                    <Navbar className="fixed-top">
                        <Navbar.Brand className="text-success" href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/order">Orders</Nav.Link>
                                <Nav.Link href="/continue">Admin</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
            {
                !done ?
                    <div className="row justify-content-center mt-5 pt-5">
                        <ReactLoading type={"spin"} color={"green"} height={200} width={200} />
                    </div>
                    :
                    <div className="row justify-content-center mt-3 pt-5 mb-5">
                        {
                            products.map(product => <div>
                                <Card className="p-3 m-3" style={{ width: '18rem', height: '30rem' }}>
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
                            </div>)
                        }
                    </div>
            }

            <Footer></Footer>
        </Container>
    );
};

export default Home;