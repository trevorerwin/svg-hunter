import React, { useState } from "react";

const DisplayTags = (props) => {
    const [tagArray, setTagArray] = useState([]);


    function processStrings(dataArray) {
        // Step 1: Remove hyphens from the start of a word
        dataArray = dataArray.map(tag => tag.replace(/^-/, ''));
        
        // Step 2: Remove empty strings from the array
        dataArray = dataArray.filter(tag => tag !== '');
        
        // Step 3: Count the number of times each string occurs in the array
        const counts = {};
        dataArray.forEach(tag => {
          const lowercaseTag = tag.toLowerCase();
          counts[lowercaseTag] = (counts[lowercaseTag] || 0) + 1;
        });

        
        // Step 4: If a string occurs 10 or more times, add it to a new array
        const newTagArray = dataArray.filter(tag => counts[tag.toLowerCase()] >= 10);

        const lowerCaseTagArray = newTagArray.map(tag => tag.toLowerCase());
        
        // Step 5: Remove duplicate strings from the new array
        const uniqueTags = [...new Set(lowerCaseTagArray)];
        
        // Step 6: Sort the strings in the new array alphabetically
        uniqueTags.sort();
        
        return uniqueTags;
      }

    async function getAllTags() {
        let url = `http://localhost:4000/svg_tag/display-all`;
        
        const requestOptions = {
            method: "GET",
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            const tagData = data.results.map((tag) => tag.svgTag.trim());
            
            const tagDataArray = processStrings(tagData);
            console.log(tagDataArray);
            // setTagArray(tagDataArray);
            // console.log("Tag Array", tagArray);

        } catch (error) {
            console.error(error.message);
        }
    }
    getAllTags();

    return ( 
        <>
        <div className="overflow-scroll" style={{height: "70vh", border: "solid", marginRight: "30px"}}>
            <h5 style={{textAlign: "center", marginTop: "10px", marginBottom: "10px"}}>TAGS</h5>
            {/* {tagArray.forEach(tag => {
                <p>{tag}</p>
            })} */}

        </div>
        </>
     );
}
 


export default DisplayTags