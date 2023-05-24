// mount the DisplaySVG and DisplayTags components to this file

import { useEffect, useState } from 'react';
import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Input, Row } from 'reactstrap';
// import React, { useState } from 'react';

const SVGFinder = (props) => {
  const [hasActiveStripeSub, setHasActiveStripeSub] = useState(false);

  useEffect(() => {
    // fetch the user's stripe subscription status from the backend

    const fetchStripeSubscriptionStatus = async () => {
      const response = await fetch('http://localhost:4000/stripe/subscription/status/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 'active') {
        setHasActiveStripeSub(true);
      } else {
        setHasActiveStripeSub(false);
      }
    };

    fetchStripeSubscriptionStatus();
  }, []);

  if (!hasActiveStripeSub) {
    return (
      <div>
        <h1>Sorry, you do not have an active subscription.</h1>
        <h2>Please visit the Pricing page to sign up for a subscription.</h2>
        <form action='/create-checkout-session' method='POST'>
          <button type='submit'>Checkout</button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row className='align-items-center'>
          <Col lg='2'></Col>

          <Col lg='7' style={{ paddingLeft: 0, paddingRight: 0, marginTop: '20px', marginBottom: '40px' }}>
            <Input placeholder='Search' />
          </Col>

          <Col lg='1'>
            <button>Search</button>
          </Col>

          <Col lg='2'></Col>
        </Row>

        <Row>
          <Col lg='2' style={{ paddingLeft: 0, paddingRight: 0 }}>
            <DisplayTags />
          </Col>

          <Col lg='10' style={{ paddingLeft: 0, paddingRight: 0 }}>
            <DisplaySVG />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SVGFinder;
