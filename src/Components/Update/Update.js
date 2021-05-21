import React, { useState, useEffect } from 'react';
import './Update.css';
import { Button, Nav, Navbar, Container, Table } from "react-bootstrap";
//import { Link } from "react-router-dom";

const Update = () => {
    const [products, setProducts] = useState([]);
    const [updateProduct, setUpdateProduct] = useState([]);

    useEffect(() => {
        fetch('https://lychee-surprise-09798.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const deleteItem = (id) => {
        fetch(`https://lychee-surprise-09798.herokuapp.com/deleteItem/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted');
                window.location.reload();
            })
    }

    const getUpdateItem = (id) => {
        fetch(`https://lychee-surprise-09798.herokuapp.com/productForUpdate/${id}`)
            .then(response => response.json())
            .then(data => setUpdateProduct(data))
    }

    const updateItem = (id) => {
        // e.preventDefault();
        console.log('update..', id);
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const weight = document.getElementById('product-weight').value;
        const product = { id, name, price, weight };
        console.log(product);
        fetch(`https://lychee-surprise-09798.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Updated');
                window.location.reload();
            })
    }

    return (
        <Container>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/update">Update Products</Nav.Link>
                                <Nav.Link href="/manage">Add Product</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                products.map(product =>
                                    <tr id="pData">
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.weight}</td>
                                        <td className="d-flex justify-content-center">
                                            <Button onClick={() => deleteItem(product._id)} className="btn btn-warning mr-5">Delete</Button>
                                            <Button onClick={() => getUpdateItem(product._id)} className="btn btn-warning">Update</Button>
                                        </td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>

                <div className="col-md-4">
                    <form className="form-group">
                        <h3 className="text-success">Updating...</h3>

                        <input className="form-control" id="product-name" type="text" defaultValue={updateProduct.name} placeholder="Name" required />
                        <input className="form-control" id="product-price" type="text" defaultValue={updateProduct.price} placeholder="Price" required />
                        <input className="form-control" id="product-weight" type="text" defaultValue={updateProduct.weight} placeholder="Weight" required />
                        <br />
                        <button onClick={() => updateItem(updateProduct._id)} className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Update;