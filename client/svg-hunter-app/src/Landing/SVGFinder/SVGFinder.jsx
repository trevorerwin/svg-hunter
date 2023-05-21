// mount the DisplaySVG and DisplayTags components to this file

import DisplaySVG from "./DisplaySVG";
import DisplayTags from "./DisplayTags";
import { Button, Col, Container, Input, Row } from "reactstrap";
// import React, { useState } from 'react';


const SVGFinder = (props) => {

    
    return ( 
    <>
    <h2 style={{width: "100%", textAlign: "center", backgroundColor: "purple", height: "50px"}}>[Header Placeholder]</h2>
    <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row className="align-items-center">
            <Col lg="2">
            </Col>

            <Col lg="7" style={{ paddingLeft: 0, paddingRight: 0, marginTop: "20px", marginBottom: "40px" }}>
                <Input placeholder="Search" />
            </Col>
                
            <Col lg="1">
                [Button]
            </Col>
            
            <Col lg="2">
            </Col>
        </Row>

        <Row>
            <Col lg="2" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <DisplayTags />
            </Col>

            <Col lg="10" style={{ paddingLeft: 0, paddingRight: 0 }}>
                <DisplaySVG />
            </Col>

        </Row>
    </Container>
    
    
    </> 
    );
}
 
export default SVGFinder;