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
    <Container fluid className='sticky-top mb-3' style={{top:"100px", backgroundColor: "#ad6ee7"}}>
    <Row >
            <Col lg="2">
            </Col>

            <Col lg="7" style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px", marginBottom: "40px" }}>
                <Input placeholder="Search" className= ""/>
            </Col>
                
            <Col lg="1">
                <button>Search</button>
            </Col>

            <Col lg="2">
            </Col>
        </Row>
    </Container>

    <Container className ="SVG-finder-container" style={{ paddingLeft: 0, paddingRight: 0 }}> 
        

        <Row>
          <Col lg='2' style={{ marginLeft: 0, paddingRight: 0 }}>
            <DisplayTags  selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </Col>

          <Col lg='10' style={{ paddingLeft: 0, paddingRight: 0 }}>
            <DisplaySVG selectedTags={selectedTags} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SVGFinder;
