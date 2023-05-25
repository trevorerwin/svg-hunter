// Desc: This is the home page for the SVG Hunter App
import { Card, CardBody, CardGroup, CardText, CardTitle } from "reactstrap";
import "../styles/Home.css";

const Home = (props) => {
  return (
    <>
      {/* Column One */}
      <main className="main-part">
        <br />
        <h2 class="center" id="title">
          <strong>The First Premium SVG Finder</strong>
        </h2>
        <br />
        <p class="center">
          SVG Hunter is a program that works on Mac or Windows computer to allow
          you to search and find Free Premium SVGs for you to use with your
          cutting devices. We at SVGHunter.com have created a database where we
          have tagged and hunted down these patterns with keywords for easy
          searching.
        </p>
        <br />
      </main>
      {/* Each card have section 1, secontion 2, and section 3 */}
      <CardGroup>
        <Card>
          <CardBody>
            <CardTitle className="center" tag="h3" id="title">
              <strong>
                {" "}
                Easily find the SVG files that you are looking for.
              </strong>
            </CardTitle>
            <CardText className="center">
              You have the choice between searching based on Tags or by File
              Name. You can also filter by designer/website.
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle className="center" tag="h3" id="title">
              <strong>1000’s of Free SVGs in the Database</strong>
            </CardTitle>
            <CardText className="center">
              Let’s face it there’s a lot of SVG files out there. SVG Hunter
              will only display those of quality and it will give you the option
              to visit the creators page that has the download link.
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="card-body">
            <CardTitle className="center" tag="h3" id="title">
              <strong> Database is updated weekly</strong>
            </CardTitle>
            <CardText className="center">
              As a member you’ll be able to download the latest and greatest
              database that unlocks the ability to find and download the SVG
              files that you may need for a project.
            </CardText>
          </CardBody>
        </Card>
      </CardGroup>
      {/* For the pricing and signup section */}
      <main className="main-part">
        <br />
        <h3 class="center" id="title">
          <strong>Pricing & Signup</strong>
        </h3>
        <h5 class="center" id="title">
          <strong>Year Signup - $20</strong>{" "}
        </h5>
        <br />
        <p>
          You’ll get access to the monthly download of the database that will be
          updated and maintained weekly. Once you sign up you’ll be given an
          email with login and password. It is on the member page where you’ll
          be able to download the program as well as get the database.
        </p>
        <p>
          This program is set up as an automatic renewal. Access Codes are set
          to expire on the 1st of the each month. At that time you’ll return to
          the members page to retrieve the latest Access Code.
        </p>
        <p>
          You can cancel the membership at any time. All annual sales/payments
          are final. Access to the database/svghunter will continue to be active
          until your anniversary date.
        </p>
      </main>
    </>
  );
};

export default Home;
