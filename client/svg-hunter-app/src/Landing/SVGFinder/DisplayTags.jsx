import React, { useState } from "react";

const DisplayTags = (props) => {
    const [tagArray, setTagArray] = useState([]);


    async function getAllTags() {
        let url = `http://localhost:4000/svg_tag/display-all`;
        
        const requestOptions = {
            method: "GET",
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            setTagArray(data.results)
        } catch (error) {
            console.error(error.message);
        }
    }
    getAllTags();

    return ( 
        <>
        <div className="overflow-scroll" style={{height: "75vh", border: "solid", marginRight: "30px"}}>
            <h5 style={{textAlign: "center", marginTop: "10px", marginBottom: "10px"}}>TAGS</h5>
            {/* {tagArray.map((tag, index) => (
                <option key={index} value={tag.svgTag}>{tag.svgTag}</option>
            ))} */}
            {/* //!Possible way of removing duplicates */}
        {/* {tagArray.map(tags =>
            [...new Set(tags)].map((tag, index) => (
            <option key={index} value={tag.id}>{tag.svgTag}</option>
        )))} */}
        </div>
        </>
     );
}
 
export default DisplayTags;