import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

const DisplaySVG = (props) => {
  const [SVGArray, setSVGArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 60; // number of SVGs to display per page
//   let multiTags = [...props.selectedTags];
  useEffect(() => {
    if ((props.selectedTags === "")) {
      getAllSVG()
    } else {
      getSVGByTags();
    } // if selectedtags = "" then getall svgs.(run the getallsvg function) else create a new function that does your tag fetch
  },
   [currentPage, props.selectedTags]);

  // if nothing is checked getAllSVG
  // if something is checked call the function with getAllChecked
  //     useEffect(() => {
  //         getAllSVG(/* props.newTagValue */);
  //       }, []);

  async function getAllSVG() {
    let url = `http://localhost:4000/svg/display-all?page=${currentPage}&limit=${perPage}`;

    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const SVGData = data.results.map((svg) => svg);
      setSVGArray(SVGData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getSVGByTags() {
    let url = `http://localhost:4000/svg_tag/multi-tag/${props.selectedTags}?page=${currentPage}&limit=${perPage}`;
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      const SVGData = data.results.map((svg) => svg);
      setSVGArray(SVGData);
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the start and end index of SVGs to display for the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Slice the SVGArray to include only the SVGs for the current page
  const displayedSVGs = SVGArray.slice(startIndex, endIndex);

  return (
    <>
      {/* <h3>Hello from DisplaySVG</h3> */}
      <Container>
        <Row
          style={{
            marginTop: "20px",
            marginLeft: "40px",
            justifyContent: "space-between",
          }}
        >
          <Col>
            {displayedSVGs.map((svg, index) => (
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  marginRight: "80px",
                  marginBottom: "80px",
                }}
                key={index}
                src={svg.svgData}
                alt={svg.svgName}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "50px" }}>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNextPage}>Next</button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DisplaySVG;
