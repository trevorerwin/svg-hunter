// Desc: This is the home page for the SVG Hunter App
import { Card, CardBody, CardGroup, CardText, CardTitle } from 'reactstrap';
import '../styles/Home.css';

const Home = (props) => {
  return (
    <>
      {/* Column One */}
      <div className='container' style={{ backgroundColor: 'whitesmoke' }}>
        <br />
        <h2 className='center' id='title'>
          <strong>The First Premium SVG Finder</strong>
        </h2>
        <br />
        <p className='center'>
          SVG Hunter is a program that allows you to search and find free, premium SVGs for you to use with your cutting devices. We at SVGHunter.com have created a database where we have tagged and
          hunted down these patterns with keywords for easy searching.
        </p>
        <br />
      </div>
      {/* Column Two */}
      {/* Each card have section 1, section 2, and section 3 */}
      <CardGroup className='container'>
        <Card>
          <CardBody className='card-body'>
            <CardTitle className='center' tag='h3' id='title'>
              <strong> Easily find the SVG files that you are looking for</strong>
            </CardTitle>
            <CardText className='center'>You have the choice between searching based on Tags or by File Name. You can also filter by designer/website.</CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody className='card-body'>
            <CardTitle className='center' tag='h3' id='title'>
              <strong>1000's of Free SVGs in the Database</strong>
            </CardTitle>
            <CardText className='center'>
              Let`s face it - there`s a lot of SVG files out there. SVG Hunter will only display those of quality and it will give you the option to visit the creators page that has the download link.
            </CardText>
          </CardBody>
        </Card>
        <Card>
          <CardBody className='card-body'>
            <CardTitle className='center' tag='h3' id='title'>
              <strong>Database is updated weekly</strong>
            </CardTitle>
            <CardText className='center'>
              We are constantly keeping up with current trends and updating the database weekly. We are also adding new designers and websites to the database as we find them. You'll be able to view
              these new additions in the "newest" section!
            </CardText>
          </CardBody>
        </Card>
      </CardGroup>
      {/* Column Three */}
      {/* For the pricing and signup section */}
      <div className='container' style={{ backgroundColor: 'whitesmoke' }}>
        <br />
        <h3 className='center' id='title'>
          <strong>Pricing & Signup</strong>
        </h3>
        <h5 className='center' id='title'>
          <strong>$20 / year</strong>
        </h5>
        <br />
        <p className='center'>
          To check out our collection of SVG's, you must pay a yearly subscription of $20 through Stripe. Once you have paid, you will be redirected to the website, where you'll be able to freely
          search for SVG's.
        </p>
        <p className='center'>
          <strong>NOTE:</strong> You will be redirected to the Stripe website to complete the payment. Once you have completed the payment, you will be redirected back to our website.
        </p>
        <p className='center'>
          You can cancel the membership at any time. All annual sales/payments are final. Access to the database/svghunter will continue to be active until your anniversary date.
        </p>
      </div>
    </>
  );
};

export default Home;
