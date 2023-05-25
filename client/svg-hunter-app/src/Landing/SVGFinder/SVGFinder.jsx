// mount the DisplaySVG and DisplayTags components to this file
import React, { useState } from 'react';

import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Input, Row } from 'reactstrap';
import './SVG-Styles.css'
// import React, { useState } from 'react';

const SVGFinder = (props) => {
    const [selectedTags, setSelectedTags] = useState("");

  return (
    <>
    <div className='svg-finder-page'>
    <Container fluid className='svg-search-bar-container' >
    <Row className='w-100'>
            <Col lg="2">
            </Col>

            <Col lg="7" className='svg-search-bar' >
                <Input className='svg-search-input' placeholder="Search" />
            </Col>
                
            <Col lg="1" className='svg-search-btn' >
                <button className='search-btn'>Search</button>
            </Col>

            <Col lg="2">
            </Col>

        </Row>
    </Container>

    <Container fluid className ="SVG-finder-container" > 
        

        <Row>
          <Col lg='2' className='tag-display-column' >
            <DisplayTags />
          </Col>

          <Col lg='9' className='svg-display-column'>
            <DisplaySVG />

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
