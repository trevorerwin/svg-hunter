import { Card, CardBody, CardText, CardTitle, ListGroupItem } from "reactstrap";
const HelpGuide = (props) => {
  return (
    <>
      <br />
      <h2 class="container">SVG Hunter Overview</h2>
      <div>
        <br />
        <Card>
          <CardBody>
            <CardTitle tag="h4" class="cardtitle">
              Top Menu Toolbar
            </CardTitle>
            <ListGroupItem numbered>
              <ol>
                <li>
                  {" "}
                  <strong>Hunter View</strong> - This is your main screen. The
                  only time you'll use this is when you would like to get back
                  to the main hunter screen after checking for updates.
                </li>
                <br />
                <li>
                  {" "}
                  Sorting Alphabetically button will sort your list from A to Z.
                </li>
                <br />
                <li>
                  {" "}
                  You can sort by the date that we added the SVG to the
                  database.
                </li>
                <br />
                <li>
                  {" "}
                  <strong>Show All</strong> - will ignore what folder is
                  selected and show all the files that are in the database.
                </li>
                <br />
                <li>
                  {" "}
                  Check for Updates button will take you to the Update Page.
                  You’ll need to click the Hunter View in order to get back to
                  the main page.
                </li>
              </ol>
            </ListGroupItem>
          </CardBody>
          {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        </Card>
      </div>
      <div>
        <br />
        <div>
          <br />
          <Card>
            <CardBody>
              <CardTitle tag="h4" class="cardtitle">
                Hunter View
              </CardTitle>
              <ListGroupItem numbered>
                <ol>
                  <li>
                    {" "}
                    You get the totally Free SVGs that are located in the
                    database.
                  </li>
                  <br />
                  <li>
                    {" "}
                    <strong>Search & Filter Area</strong> - Type in key words
                    and narrow the search.
                  </li>
                  <br />
                  <li>
                    {" "}
                    <strong>Preview Window </strong> - This displays the SVG
                    image in the preview window. The images are from the
                    internet/website of the owner.
                  </li>
                  <br />
                  <li>
                    {" "}
                    <strong>Visit Website button</strong> - Select an SVG from
                    the list and if you want to download that SVG you’ll click
                    the Visit Website button to be taken to that designers page.
                  </li>
                </ol>
              </ListGroupItem>
            </CardBody>
            {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
          </Card>
        </div>
      </div>
      <br />
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h4" class="cardtitle">
              Folder Filter
            </CardTitle>
            <CardText class="paragraph">
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
            <CardTitle tag="h4" class="cardtitle">
              Searching
            </CardTitle>
            <CardText class="paragraph">
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
            <CardTitle tag="h4" class="cardtitle">
              {" "}
              Use the Common Tag Window for Searching
            </CardTitle>
            <CardText class="paragraph">
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
            <CardTitle tag="h4" class="cardtitle">
              Downloading the SVG
            </CardTitle>
            <CardText class="paragraph">
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
            <CardTitle tag="h4" class="cardtitle">
              Checking for Updates
            </CardTitle>
            <CardText class="paragraph">
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
