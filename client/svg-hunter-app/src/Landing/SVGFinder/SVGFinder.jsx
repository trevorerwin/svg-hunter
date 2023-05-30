import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Row } from 'reactstrap';
import AsyncSelect from "react-select/async";
import './SVG-Styles.css'
import React, { useState } from 'react';

const SVGFinder = (props) => {
    const [selectedTags, setSelectedTags] = useState("");
    const [totalTagArray, setTotalTagArray] = useState([]);
    const [chosenSearchTag, setChosenSearchTag] = useState("");

    const loadOptions = (inputValue, callback) => {
      const filteredTags = totalTagArray.filter(tag => tag.includes(inputValue));   
      const options = filteredTags.map(tag => ({ value: tag, label: tag }));
      callback(options);
    };


  return (
    <>
    <div className='svg-finder-page'>
    <Container fluid className='svg-search-bar-container' >
    <Row className='w-100'>
            <Col lg="3">
            </Col>

            <Col lg="6" className='svg-search-bar' >
              <AsyncSelect
                className='svg-search-bar'
                cacheOptions
                loadOptions={loadOptions}
                onChange={(selectedOption) => setChosenSearchTag(selectedOption.value)}
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
            <DisplaySVG selectedTags={selectedTags} chosenSearchTag={chosenSearchTag}/>

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
