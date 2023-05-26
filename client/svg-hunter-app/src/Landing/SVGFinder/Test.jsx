import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

const DisplaySVG = (props) => {
  const [SVGArray, setSVGArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 60; // number of SVGs to display per page
  const maxPageNumbers = 3; // maximum number of page numbers to display

  useEffect(() => {
    getAllSVG();
  }, [currentPage]);

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

  // Calculate the total number of pages based on the total number of SVGs
  const totalPages = Math.ceil(SVGArray.length / perPage);

  // Generate an array of page numbers to display in pagination
  const pageNumbers = [];
  if (totalPages <= maxPageNumbers) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const middlePage = Math.max(1, Math.min(currentPage, totalPages - maxPageNumbers + 1));
    const endPage = Math.min(middlePage + maxPageNumbers - 1, totalPages);

    for (let i = middlePage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (middlePage > 1) {
      pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }
    if (endPage < totalPages) {
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }

  return (
    <>
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
                style={{ width: "150px", height: "150px", marginRight: "80px", marginBottom: "80px" }}
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
            {pageNumbers.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === "..." ? (
                  <span style={{ marginRight: "5px", marginBottom: "30px" }}>...</span>
                ) : (
                  <button
                    onClick={() => setCurrentPage(pageNumber)}
                    style={{
                      marginRight: "5px",
                      marginBottom: "30px",
                      fontWeight: pageNumber === currentPage ? "bold" : "normal",
                    }}
                  >
                    {pageNumber}
                  </button>
                )}
              </React.Fragment>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DisplaySVG;