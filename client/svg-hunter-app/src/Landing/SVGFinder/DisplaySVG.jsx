import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import './SVG-Styles.css'

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

// if nothing is checked getAllSVG
// if something is checked call the function with getAllChecked
//     useEffect(() => {
//         getAllSVG(/* props.newTagValue */);
//       }, []);


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

  function shortenName(name) {
    if (name.length > 20) {
      return name.slice(0, 20) + "...";
    } else {
      return name;
    }
  }



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
            <div key={index} style={{ textAlign: "center", display: "inline-block" }}>
              <a href={svg.svgURL} target="_blank" rel="noreferrer">
                <img
                  className="svg-image"
                  style={{
                    width: "180px",
                    height: "180px",
                    margin: 'auto 25px 5px 25px',
                    borderRadius: "5px",
                    padding: "20px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.5)"
                  }}
                  src={svg.svgData}
                  alt={svg.svgName}
                  value={svg.svgURL}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg";
                  }}
                />
              </a>
              <a href={svg.svgURL} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <p style={{ color: "#ad6ee7", marginBottom: "50px", textAlign: "center", alignSelf: "center" }}>{shortenName(svg.svgName)}</p>
              </a>
            </div>
          ))}
          </Col>
        </Row>
        <Row>
          <Col style={{marginTop: "10px"}}>
            <button onClick={() =>{
                handlePreviousPage(); 
                // scroll to the top of the DisplaySVG component
                window.scrollTo(0, 655.66);
              }}
              disabled={currentPage === 1}>
              Previous
            </button>
            {pageNumbers.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === "..." ? (
                  <span style={{ marginRight: "5px", marginBottom: "40px" }}>...</span>
                ) : (
                  <button
                    onClick={() =>{
                      setCurrentPage(pageNumber); 
                      // scroll to the top of the DisplaySVG component
                      window.scrollTo(0, 655.66);
                    }}
                    style={{
                      marginRight: "5px",
                      marginBottom: "30px",
                      fontWeight: pageNumber === currentPage ? "bold" : "normal",
                      border: "none",
                    }}
                  >
                    {pageNumber}
                  </button>
                )}
              </React.Fragment>
            ))}
            <button onClick={() =>{
                      handleNextPage(); 
                      // scroll to the top of the DisplaySVG component
                      window.scrollTo(0, 655.66);
                    }}
                    disabled={currentPage === totalPages}>
              Next
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DisplaySVG;