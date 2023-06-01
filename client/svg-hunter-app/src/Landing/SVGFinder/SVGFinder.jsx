import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Row } from 'reactstrap';

import CreatableSelect from 'react-select/async';
//!Line above is the attempt at multiselect from line below
// import AsyncSelect from "react-select/async";

import './SVG-Styles.css'
import React, { useState, useEffect } from 'react';

const SVGFinder = (props) => {
    const [selectedTags, setSelectedTags] = useState("");
    const [totalTagArray, setTotalTagArray] = useState([]);
    const [searchedTag, setSearchedTag] = useState("");
    const [selectedSearchTags, setSelectedSearchTags] = useState([]);

    const loadOptions = (inputValue, callback) => {
      const filteredTags = totalTagArray.filter(tag => tag.includes(inputValue) && !selectedSearchTags.includes(tag));   
      const options = filteredTags.map(tag => ({ value: tag, label: tag }));
      callback(options);
    };

    useEffect(() => {
      console.log("searchedTag: ", searchedTag);
    }, [searchedTag]);


    function handleSelectChange(selectedOptions) {
      const selectedTags = selectedOptions ? selectedOptions.map(option => option.value) : [];
      setSelectedSearchTags(selectedTags);
      setSearchedTag(""); // Clear the searched tag to allow searching for another tag
    }
//! Line above is the attempt at multiselect from line below
    // function handleSelectChange(selectedOptions) {
    //   const selectedTags = selectedOptions.map(option => option.value);
    //   setSelectedSearchTags(selectedTags);
    //   setSearchedTag("");
    // }


  return (
    <>
    <div className='svg-finder-page'>
    <Container fluid className='svg-search-bar-container' >
    <Row className='w-100'>
            <Col lg="3">
            </Col>


            <Col lg="6" className='svg-search-bar' >
              <CreatableSelect
                className='svg-search-input'
                isMulti
                placeholder='Search'
                loadOptions={loadOptions}
                onChange={handleSelectChange}
                value={selectedSearchTags.map(tag => ({ value: tag, label: tag }))}
              />
            </Col>
{/* //! Line above is the attempt at multiselect from line below */}
   {/*}         <Col lg="6" className='svg-search-bar' >
              <AsyncSelect
                className='svg-search-input'
                placeholder='Search'
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleSelectChange}
              />
            </Col> */}


            <Col lg="3">
            </Col>
        </Row>
    </Container>

    <Container fluid className ="SVG-finder-container" > 
        

        <Row>
          <Col lg='2' className='tag-display-column' >
            <DisplayTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} totalTagArray={totalTagArray} setTotalTagArray={setTotalTagArray}/>
          </Col>

          <Col lg='9' className='svg-display-column'>
            <DisplaySVG selectedTags={selectedTags} selectedSearchTags={selectedSearchTags} />

          </Col>

          <Col lg="1">
          </Col>
        </Row>
      </Container>
      </div>
    </>
  );
};

export default SVGFinder;
