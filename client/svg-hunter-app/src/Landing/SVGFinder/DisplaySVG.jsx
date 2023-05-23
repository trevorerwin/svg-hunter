

const DisplaySVG = (props) => {


    async function getAllSVG() {
        let url = `http://localhost:4000/svg/display-all`;
        
        const requestOptions = {
            method: "GET",
        };
        try {
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            const SVGData = data.results.map((svg) => svg.SVGData);           
            console.log("SVG Data", SVGData)

        } catch (error) {
            console.error(error.message);
        }
    }
    getAllSVG();

    return ( 
        <>
        <h3>Hello from DisplaySVG</h3>
        </>
     );
}
 
export default DisplaySVG;