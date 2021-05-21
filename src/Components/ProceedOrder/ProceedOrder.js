import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../App";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from '../Footer/Footer';
import './ProceedOrder.css';
import Payment from '../Payment/Payment';

const handleLogout = () => {
    console.log('Clicked');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
}

const ProceedOrder = () => {
    const [order, setOrder] = useState([]);
    const [loggedinUser] = useContext(UserContext);
    const email = loggedinUser.email;
    console.log(email);
    const userMail = sessionStorage.getItem('email');
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch(`https://lychee-surprise-09798.herokuapp.com/orders/${userMail}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                calculatePrice(data);
            });
    }, [userMail])


    const removeItem = (id) => {
        fetch(`https://lychee-surprise-09798.herokuapp.com/removeItem/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
    }

    const calculatePrice = (order) => {
        //console.log(order[0].price);
        let price = 0;
        for (let i = 0; i < order.length; i++) {
            let a = parseFloat(order[i].price);
            price = (price + a);
            setTotalPrice(price);
        }
    }

    return (
        <Container>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand className="text-success" href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
                            </Nav>
                            <Link to="/home">
                                <Button onClick={handleLogout} className="btn btn-success">Log Out</Button>
                            </Link>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>


            <div className="row mt-5">
                <div className="col-md-6">
                    <h3> <span className="text-success">You have {order.length} orders.</span></h3>

                    {
                        order.map(eachOrder =>
                            <div className="d-flex justify-content-between ordered-product">
                                <div>
                                    <h5>{eachOrder.name}</h5>
                                    <p>Price:{eachOrder.price}</p>
                                </div>
                                <Button onClick={() => removeItem(eachOrder._id)} className="buy-button">Remove</Button>
                            </div>

                        )
                    }

                </div>

                <div className="col-md-6">
                    <h3 className="text-success">Total Price: {totalPrice.toFixed(2)}$</h3>
                    <Payment></Payment>
                </div>
            </div>
            <Footer></Footer>
        </Container>
    );
};

export default ProceedOrder;