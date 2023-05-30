// mount the DisplaySVG and DisplayTags components to this file
import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Input, Row } from 'reactstrap';
import './SVG-Styles.css';
import React, { useState, useEffect } from 'react';

const SVGFinder = (props) => {
  const [selectedTags, setSelectedTags] = useState('');
  const [totalTagArray, setTotalTagArray] = useState([]);
  const [search, setSearch] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [chosenSearchTag, setChosenSearchTag] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function handleSelect(item) {
    setChosenSearchTag(item);
  }

  async function displayByInput(e) {
    setSearch(e.target.value);
    let searchTagName = totalTagArray.filter((searchTag) => searchTag.includes(e.target.value.toLowerCase()));
    setSearchList(searchTagName);
    console.log('Search List', searchList);
  }

  async function checkSubscriptionStatus() {
    const token = localStorage.getItem('token');
    let url = `http://localhost:4000/user/get-user`;
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', token);

    const requestOptions = {
      headers: myHeaders,
      method: 'GET',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data.user.Usergroups);
      if (data.user.Usergroups.includes(':')) {
        setSubscribed(true);
      } else {
        setSubscribed(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }

    checkSubscriptionStatus();
  }, []);

  if (!authenticated) {
    return (
      <div className='login-prompt'>
        <h1 className='login-prompt-header'>Access Restricted</h1>
        <p className='login-prompt-text'>Please log in to access the SVGFinder and explore our collection of SVGs.</p>
        <button
          className='login-prompt-button'
          onClick={() => {
            /* Handle login redirect */
          }}
        >
          Log In
        </button>
      </div>
    );
  } else if (!subscribed) {
    return (
      <div className='login-prompt'>
        <h1 className='login-prompt-header'>Access Restricted</h1>
        <p className='login-prompt-text'>
          You must have a paying subscription in order to access our SVG Finder. Please click the button below to pay and access our application through{' '}
          <span className='login-stripe-text'>Stripe</span>
        </p>

        <stripe-buy-button buy-button-id={process.env.REACT_APP_STRIPE_BUTTON_ID} publishable-key={process.env.REACT_APP_STRIPE_PUBLISH_KEY}></stripe-buy-button>
      </div>
    );
  } else {
    return (
      <>
        <div className='svg-finder-page'>
          <Container fluid className='svg-search-bar-container'>
            <Row className='w-100'>
              <Col lg='2'></Col>

              <Col lg='7' className='svg-search-bar'>
                <Input onChange={displayByInput} className='svg-search-input' placeholder='Search' />
              </Col>

              <Col lg='1' className='svg-search-btn'>
                <button className='search-btn'>Search</button>
              </Col>

              <Col lg='2'></Col>
            </Row>
          </Container>

          <Container fluid className='SVG-finder-container'>
            <Row>
              <Col lg='2' className='tag-display-column'>
                <DisplayTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} totalTagArray={totalTagArray} setTotalTagArray={setTotalTagArray} />
              </Col>

              <Col lg='9' className='svg-display-column'>
                <DisplaySVG selectedTags={selectedTags} chosenSearchTag={chosenSearchTag} />
              </Col>

              <Col lg='1'></Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
};

export default SVGFinder;
