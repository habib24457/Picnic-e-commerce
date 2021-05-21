import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CommonNav = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand className="text-success" href="/home">Picnic Super Market</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Link to="/home">
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>

        </div>
    );
};

export default CommonNav;