import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";


const DisplaySVG = (props) => {
    const [SVGArray, setSVGArray] = useState([]);

// if nothing is checked getAllSVG
// if something is checked call the function with getAllChecked
    useEffect(() => {
        getAllSVG(/* props.newTagValue */);
      }, []);


    async function getAllSVG() {
        let url = `http://localhost:4000/svg/display-all`;
        
        const requestOptions = {
            method: "GET",
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            const SVGData = data.results.map((svg) => svg)           
            setSVGArray(SVGData);

        } catch (error) {
            console.error(error.message);
        }
    }


    return ( 
        <>
        <h3>Hello from DisplaySVG</h3>
        <Container>
            <Row style={{marginTop: "40px", marginLeft: "40px", justifyContent: "space-between"}}>
                <Col>
                        {SVGArray.map((svg, index) => (
                            <img style={{width: "200px", height: "200px"}} key={index} src={svg.svgData} alt={svg.svgName} />
                        ))}               
                </Col>
            </Row>
        </Container>
        </>
     );
}
 
export default DisplaySVG;