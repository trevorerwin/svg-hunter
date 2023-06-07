import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './SVG-Styles.css';
// import { sortAlpha } from '../../Helper/Sort-alphabetical';

const DisplaySVG = (props) => {
  const [SVGArray, setSVGArray] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const perPage = 60; // number of SVGs to display per page
  const maxPageNumbers = 3; // maximum number of page numbers to display

  useEffect(() => {
    if (props.selectedTags !== '') {
      getSVGByTags();
    } else {
      getAllSVG();
    }
  }, [props.currentPage, props.selectedTags, props.newSVG]);

  async function getAllSVG() {
    console.log('getAllSVG called');
    let url = `http://localhost:4000/svg/display-all?page=${props.currentPage}&limit=${perPage}`;

    const requestOptions = {
      method: 'GET',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      let SVGData = data.results.map((svg) => svg);
      if (props.newSVG === true) {
        SVGData = SVGData.sort((a, b) => {
          return b.id - a.id;
        });
      }

      setSVGArray(SVGData);
    } catch (error) {
      console.error(error.message);
    }
  }

  console.log('Selected Tags:', props.selectedTags);
  async function getSVGByTags() {
    const selectedTags = props.selectedTags
      .split(',')
      .map((tag) => `"${tag.trim()}"`)
      .join(', ');
    let url = `http://localhost:4000/svg_tag/multi-tag/${selectedTags}?page=${props.currentPage}&limit=${perPage}`;
    const requestOptions = {
      method: 'GET',
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      let SVGData = data.results
        .map((svg) => svg)
        .sort((a, b) => {
          let x = a.svgName.toUpperCase().trim(),
            y = b.svgName.toUpperCase().trim();
          return x === y ? 0 : x > y ? 1 : -1;
        });
      if (props.newSVG === true) {
        SVGData = SVGData.sort((a, b) => {
          return b.id - a.id;
        });
      }

      setSVGArray(SVGData);
    } catch (error) {
      console.error(error.message);
    }
  }

  const handleNextPage = () => {
    props.setCurrentPage(props.currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (props.currentPage > 1) {
      props.setCurrentPage(props.currentPage - 1);
    }
  };

  const startIndex = (props.currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const displayedSVGs = SVGArray.slice(startIndex, endIndex);
  const totalPages = Math.ceil(SVGArray.length / perPage);
  const pageNumbers = [];

  if (totalPages <= maxPageNumbers) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const middlePage = Math.max(1, Math.min(props.currentPage, totalPages - maxPageNumbers + 1));
    const endPage = Math.min(middlePage + maxPageNumbers - 1, totalPages);

    for (let i = middlePage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (middlePage > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }
    if (endPage < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  function shortenName(name) {
    if (name.length > 16) {
      return name.slice(0, 16) + '...';
    } else {
      return name;
    }
  }

  return (
    <>
      <Container>
        <Row
          style={{
            marginTop: '20px',
            marginLeft: '40px',
            justifyContent: 'space-between',
          }}
        >
          <Col>
            {displayedSVGs.map((svg, index) => (
              <div key={index} style={{ textAlign: 'center', display: 'inline-block' }}>
                <a href={svg.svgURL} target='_blank' rel='noreferrer'>
                  <img
                    className='svg-image'
                    style={{
                      width: '180px',
                      height: '180px',
                      margin: 'auto 25px 5px 25px',
                      borderRadius: '5px',
                      padding: '20px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      zIndex: 0,
                    }}
                    src={svg.svgData}
                    alt={svg.svgName}
                    value={svg.svgURL}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://t3.ftcdn.net/jpg/05/03/24/40/360_F_503244059_fRjgerSXBfOYZqTpei4oqyEpQrhbpOML.jpg';
                    }}
                  />
                </a>
                <a href={svg.svgURL} target='_blank' rel='noreferrer' style={{ textDecoration: 'none' }}>
                  <p style={{ color: '#ad6ee7', marginBottom: '50px', textAlign: 'center', alignSelf: 'center' }}>{shortenName(svg.svgName)}</p>
                </a>
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col className='svg-page-buttons' style={{ marginTop: '10px' }}>
            <button
              onClick={() => {
                handlePreviousPage();
                // scroll to the top of the DisplaySVG component
                window.scrollTo(0, 655.66);
              }}
              disabled={props.currentPage === 1}
              style={{
                marginRight: '5px',
                marginBottom: '30px',

                border: 'none',
              }}
            >
              Previous
            </button>
            {pageNumbers.map((pageNumber, index) => (
              <React.Fragment key={index}>
                {pageNumber === '...' ? (
                  <span style={{ marginRight: '5px', marginBottom: '40px' }}>...</span>
                ) : (
                  <button
                    onClick={() => {
                      props.setCurrentPage(pageNumber);
                      // scroll to the top of the DisplaySVG component
                      window.scrollTo(0, 655.66);
                    }}
                    style={{
                      marginRight: '5px',
                      marginBottom: '30px',
                      fontWeight: pageNumber === props.currentPage ? 'bold' : 'normal',
                      border: 'none',
                    }}
                  >
                    {pageNumber}
                  </button>
                )}
              </React.Fragment>
            ))}
            <button
              onClick={() => {
                handleNextPage();
                // scroll to the top of the DisplaySVG component
                window.scrollTo(0, 655.66);
              }}
              disabled={props.currentPage === totalPages}
              style={{
                marginRight: '5px',
                marginBottom: '30px',

                border: 'none',
              }}
            >
              Next
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DisplaySVG;
