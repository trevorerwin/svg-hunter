import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Row } from 'reactstrap';
import './SVG-Styles.css';
import React, { useState, useEffect } from 'react';
import ProductDisplay from './ProductDisplay';
import CreatableSelect from 'react-select/async';
import { useFetcher, useNavigate } from 'react-router-dom';

const SVGFinder = (props) => {
  const [selectedTags, setSelectedTags] = useState('');
  const [totalTagArray, setTotalTagArray] = useState([]);
  const [search, setSearch] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [newSVG, setNewSVG] = useState(false);
  const [searchedTag, setSearchedTag] = useState('');
  const [selectedSearchTags, setSelectedSearchTags] = useState([]);
  const navigate = useNavigate();

  const loadOptions = (inputValue, callback) => {
    if (inputValue.length > 1) {
      const filteredTags = totalTagArray.filter((tag) => tag.includes(inputValue) && !selectedTags.includes(tag));
      const options = filteredTags.map((tag) => ({
        value: tag,
        label: tag,
      }));
      callback(options);
    }
  };

  function handleSelectChange(selectedOptions) {
    const searchedTags = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    const searchedTagsJoined = searchedTags.join(',');
    setSelectedTags(searchedTagsJoined);
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
            navigate('/auth');
          }}
        >
          Log In
        </button>
      </div>
    );
  } else if (!subscribed) {
    return <ProductDisplay setSubscribed={setSubscribed} />;
  } else {
    return (
      <>
        <div className='svg-finder-page'>
          <Container fluid className='svg-search-bar-container' style={{ zIndex: '100' }}>
            <Row className='w-100'>
              <Col lg='3'></Col>

              <Col lg='6' className='svg-search-bar'>
                <CreatableSelect
                  className='svg-search-input'
                  isMulti
                  cacheOptions
                  placeholder='Search'
                  loadOptions={loadOptions}
                  onChange={handleSelectChange}
                  value={
                    selectedTags
                      ? selectedTags.split(',').map((tag) => ({
                          value: tag,
                          label: tag,
                        }))
                      : ''
                  }
                />
              </Col>

              <Col lg='3'></Col>
            </Row>
          </Container>

          <Container fluid className='SVG-finder-container'>
            <Row>
              <Col lg='2' className='tag-display-column'>
                <DisplayTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} totalTagArray={totalTagArray} setTotalTagArray={setTotalTagArray} newSVG={newSVG} setNewSVG={setNewSVG} />
              </Col>

              <Col lg='9' className='svg-display-column'>
                <DisplaySVG selectedTags={selectedTags} newSVG={newSVG} />
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
};

export default SVGFinder;
