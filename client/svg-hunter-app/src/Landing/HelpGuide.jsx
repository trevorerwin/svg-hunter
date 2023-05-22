import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
const HelpGuide = (props) => {
  return (
    <>
      <br />
      <h2 className="container">SVG Hunter Overview</h2>
      <div>
        <br />
        <p>
          {" "}
          <code>Top Menu Toolbar</code> <img />
        </p>
        <ListGroup numbered>
          <ListGroupItem>
            Hunter View - This is your main screen. The only time you'll use
            this is when you would like to get back to the main hunter screen
            after checking for updates.
          </ListGroupItem>
          <ListGroupItem>
            Sorting Alphabetically button will sort your list from A to Z.
          </ListGroupItem>
          <ListGroupItem>
            You can sort by the date that we added the SVG to the database.
          </ListGroupItem>
          <ListGroupItem>
            Show All - will ignore what folder is selected and show all the
            files that are in the database.
          </ListGroupItem>
          <ListGroupItem>
            Check for Updates button will take you to the Update Page. You’ll
            need to click the Hunter View in order to get back to the main page.
          </ListGroupItem>
        </ListGroup>
      </div>
      <br />
      <div>
        <br />
        <p>
          {" "}
          <code>Hunter View</code> <img />
        </p>
        <ListGroup numbered>
          <ListGroupItem>
            You get the totally Free SVGs that are located in the database.
          </ListGroupItem>
          <ListGroupItem>
            Search & Filter Area - Type in key words and narrow the search.
          </ListGroupItem>
          <ListGroupItem>
            Preview Window - This displays the SVG image in the preview window.
            The images are from the internet/website of the owner.
          </ListGroupItem>
          <ListGroupItem>
            Visit Website button - Select an SVG from the list and if you want
            to download that SVG you’ll click the Visit Website button to be
            taken to that designers page.
          </ListGroupItem>
        </ListGroup>
      </div>
      <br />
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h4">
              {" "}
              <code>Folder Filter</code>
            </CardTitle>
            <CardText>
              Using the Folder Filter allows you to navigate to a specific
              folder. You'll see the number of SVG files that are contained in
              that folder between the parentheses "( )"
            </CardText>
          </CardBody>
          {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        </Card>
      </div>
      <br />
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h4">
              {" "}
              <code>Searching</code>
            </CardTitle>
            <CardText>
              You can search by tag or by name. Keep in mind that when searching
              it's based on what folder you are currently in.
            </CardText>
          </CardBody>
          {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        </Card>
      </div>
      <br />
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h4">
              {" "}
              <code>Use the Common Tag Window for Searching</code>
            </CardTitle>
            <CardText>
              By going to the File, Common Tag Window you can see all the tags
              that are currently used in the SVG Hunter. You can drag and drop
              from the Tag List window into the search box for easy searching.
              All searching rules apply based on the search by selection and
              folder filter.
            </CardText>
          </CardBody>
          {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        </Card>
      </div>
      <br />
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h4">
              {" "}
              <code>Downloading the SVG</code>
            </CardTitle>
            <CardText>
              When you're ready to download the SVG you can click the Visit
              Website Button. This action will take you to the owner/designer's
              website allowing you to download it. SVG Hunter doesn't store any
              SVG data in the program it simply takes you to the correct weblink
              where the SVG was found.
            </CardText>
          </CardBody>
          {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        </Card>
      </div>
      <br />
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h4">
              {" "}
              <code>Checking for Updates</code>
            </CardTitle>
            <CardText>
              Click the check for updates button and you'll see the update page.
              If you need to update you'll see your version highlighted in RED
              and the download button will appear. You will need to login to
              your account in order to receive updates.
            </CardText>
          </CardBody>
          {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        </Card>
      </div>
    </>
  );
};

export default HelpGuide;
