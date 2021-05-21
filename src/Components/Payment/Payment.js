import React from 'react';
import { Col } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './PaymentCard';

const stripePromise = loadStripe('pk_test_51IhJfaKSu2UCBkjrmudHYyuSve1JRUdu2YnlbhaIRDGM4MM4sHkJUWrZXvficsncoRRozsKBe8QwyVaIJikKpEyp00qYSKyjSj');

const Payment = () => {
    return (
        <> 
                <Col>
                    <h5>This is an example of paymentMethod using Stripe:</h5>
                    <ul>
                        <li>Demo Card number is: 4242 4242 4242 4242</li>
                        <li>Card data is: Any future date</li>
                        <li>CVC: You can enter any 3 digit number</li>
                        <li>Zip: Enter your zip: eg. 45128</li>
                    </ul>
                </Col>
                <Col>
                    <h4 className="mb-5 all-text-color">Payment</h4>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </Col>   
        </>
    );
};

export default Payment;