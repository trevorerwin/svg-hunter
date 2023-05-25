import React, { useState, useEffect } from "react";

const DisplayTags = (props) => {
  const [tagArray, setTagArray] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    getAllTags();
  }, []);


  useEffect(() => {
    let tagNames = tagArray.filter(tag=> tag.isChecked === true).map(tag=>tag.tagName).join(",")
    props.setSelectedTags(tagNames);

    
  }, [tagArray]);

  //! TEST CODE TO SEE IF TAG ARRAY IS BEING UPDATED
  // useEffect(() => {
  //     console.log("Tag Array", tagArray);
  //   }, [tagArray]);


  function processStrings(dataArray) {
    // Step 1: Remove hyphens from the start of a word
    dataArray = dataArray.map((tag) =>{
      return{tagName:  tag.tagName.toLowerCase().replace(/^-/, ""), isChecked: false}
    });

    // Step 2: Remove empty strings from the array
    dataArray = dataArray.filter((tag) => tag.tagName !== "");

    // Step 3: Count the number of times each string occurs in the array
    const counts = {};
    dataArray.forEach((tag) => {
      const lowercaseTag = tag.tagName.toLowerCase();
      counts[lowercaseTag] = (counts[lowercaseTag] || 0) + 1;
    });

    // Step 4: If a string occurs 10 or more times, add it to a new array
    // const newTagArray = dataArray.filter(
    //   (tag) => counts[tag] >= 10
    // );
    let newTagArray = []
    for (let item in counts) {
      if (counts[item] >= 10) {
        
        newTagArray.push(item)
      } 
    }
    const lowerCaseTagArray = newTagArray.map((tag) => tag.toLowerCase());

    // Step 5: Remove duplicate strings from the new array
    let uniqueTags = [...new Set(lowerCaseTagArray)];

     uniqueTags = uniqueTags.map(tag=> {
      return{tagName:  tag, isChecked: false}
    })

    // Step 6: Sort the strings in the new array alphabetically
    uniqueTags.sort((word1, word2)=> word1.tagName>word2.tagName ? 1 : -1);

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
      const tagData = data.results.map((tag) => {
        return { tagName: tag.svgTag.trim(), isChecked: false };
      });
      const tagDataArray = processStrings(tagData);
      
      setTagArray(tagDataArray);
    } catch (error) {
      console.error(error.message);
    }
  }
  console.log(props);

  const handleCheckboxChange = (index) => {

   let prev= [...tagArray]
   prev[index].isChecked = !prev[index].isChecked
   
    setTagArray(prev);

   

    // Get the selected tag value
    // const selectedTagValue = tagArray[index];
    // Pass the selected tag value to the parent component
  };


    return ( 
        <>
        <div className="tag-display-window" >
            <h5 style={{textAlign: "center", marginTop: "10px", marginBottom: "10px"}}>POPULAR TAGS</h5>
            <ul style={{ listStyleType: "none", textAlign: "left" }}>
                {tagArray.map((tag, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        style={{marginLeft: "0px", marginRight: "10px"}}
                        checked={tag.isChecked}
                        onChange={() => handleCheckboxChange(index,/* target.tagvalue */)}
                      />
                      {tag.tagName}
                    </li>
                ))}
            </ul>
            {/* <ul>
                {tagArray.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul> */}
        </div>
        </>
     );
}
 


export default DisplayTags;
