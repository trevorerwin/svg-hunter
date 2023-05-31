import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Row } from 'reactstrap';
import AsyncSelect from "react-select/async";
import './SVG-Styles.css'
import React, { useState, useEffect } from 'react';

const SVGFinder = (props) => {
    const [selectedTags, setSelectedTags] = useState("");
    const [totalTagArray, setTotalTagArray] = useState([]);
    const [searchedTag, setSearchedTag] = useState("");

    const loadOptions = (inputValue, callback) => {
      const filteredTags = totalTagArray.filter(tag => tag.includes(inputValue));   
      const options = filteredTags.map(tag => ({ value: tag, label: tag }));
      callback(options);
    };

    useEffect(() => {
      console.log("searchedTag: ", searchedTag);
    }, [searchedTag]);

    function handleSelectChange(selectedOption) {
      setSearchedTag(selectedOption.value);
    }


  return (
    <>
    <div className='svg-finder-page'>
    <Container fluid className='svg-search-bar-container' >
    <Row className='w-100'>
            <Col lg="3">
            </Col>

            <Col lg="6" className='svg-search-bar' >
              <AsyncSelect
                className='svg-search-input'
                placeholder='Search'
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleSelectChange}
              />
            </Col>


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
            <DisplaySVG selectedTags={selectedTags} searchedTag={searchedTag}/>

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
