import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Footer from '../Footer/Footer';

const AddAdmin = () => {
    const { register, handleSubmit } = useForm();

    const handleLogout = () => {
        console.log('Clicked');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('email');
    }

    const onSubmit = data => {
        const admin = {
            name: data.adminName,
            email: data.adminEmail
        }
        const url = `https://lychee-surprise-09798.herokuapp.com/admin`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        })
            .then(response => {
                alert("Admin data saved", response);
            });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand className="text-success" href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/addAdmin">Add-New-Admin</Nav.Link>
                                <Nav.Link href="/">Client-Orders</Nav.Link>
                                <Nav.Link href="/update">Update-Products</Nav.Link>
                                <Nav.Link href="/manage">Add-Product</Nav.Link>
                                <Link to="/home">
                                    <Button onClick={handleLogout} className="btn btn-success">Log Out</Button>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

            <div className="row justify-content-center mt-5">
                <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                    <input className="form-control" name="adminName" placeholder="Admin Name" ref={register} required />
                    <br />
                    <input className="form-control" name="adminEmail" placeholder="Admin Email" ref={register} required />
                    <input className="button-design" type="submit" />
                </form>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default AddAdmin;