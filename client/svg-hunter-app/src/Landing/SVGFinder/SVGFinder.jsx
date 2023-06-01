// mount the DisplaySVG and DisplayTags components to this file
import DisplaySVG from './DisplaySVG';
import DisplayTags from './DisplayTags';
import { Col, Container, Input, Row } from 'reactstrap';
import './SVG-Styles.css'
import React, { useState } from 'react';
import { useFetcher } from 'react-router-dom';

const SVGFinder = (props) => {
    const [selectedTags, setSelectedTags] = useState("");
    const [totalTagArray, setTotalTagArray] = useState([]);
    const [search, setSearch] = useState("");
    const [searchList, setSearchList] = useState([]);
    const [chosenSearchTag, setChosenSearchTag] = useState("");
    const [newSVG, setNewSVG] = useState(false);

    function handleSelect(item) {
      setChosenSearchTag(item);
    }

    async function displayByInput(e) {
      setSearch(e.target.value)
      let searchTagName = totalTagArray.filter((searchTag) => searchTag.includes(e.target.value.toLowerCase()));
      setSearchList(searchTagName);
      console.log("Search List", searchList)
  }

  return (
    <>
    <div className='svg-finder-page'>
    <Container fluid className='svg-search-bar-container' >
    <Row className='w-100'>
            <Col lg="2">
            </Col>

            <Col lg="7" className='svg-search-bar' >
                <Input onChange={displayByInput} className='svg-search-input' placeholder="Search" />
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
            <DisplayTags selectedTags={selectedTags} setSelectedTags={setSelectedTags} totalTagArray={totalTagArray} setTotalTagArray={setTotalTagArray} newSVG={newSVG} setNewSVG={setNewSVG}/>
          </Col>

          <Col lg='9' className='svg-display-column'>
            <DisplaySVG selectedTags={selectedTags} chosenSearchTag={chosenSearchTag} newSVG={newSVG}/>

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
