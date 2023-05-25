import "../styles/HelpGuide.css";
const HelpGuide = (props) => {
  return (
    <>
      <div class="background">
        <br />
        <h2 class="title">
          <strong>SVG Hunter Overview</strong>
        </h2>
        <br />
        <h4 class="cardtitle">Top Menu Toolbar</h4>
        <br />
        <ol id="view">
          <li>
            <strong>Hunter View</strong> - This is your main screen. The only
            time you'll use this is when you would like to get back to the main
            hunter screen after checking for updates.
          </li>
          <br />
          <li>
            Sorting Alphabetically button will sort your list from A to Z.
          </li>
          <br />
          <li>
            You can sort by the date that we added the SVG to the database.
          </li>
          <br />
          <li>
            <strong>Show All</strong> - will ignore what folder is selected and
            show all the files that are in the database.
          </li>
          <br />
          <li>
            Check for Updates button will take you to the Update Page. You’ll
            need to click the Hunter View in order to get back to the main page.
          </li>
          <br />
        </ol>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        <br />
        <h4 class="cardtitle">Hunter View</h4>
        <br />
        <ol id="view">
          <li>
            You get the totally Free SVGs that are located in the database.
          </li>
          <br />
          <li>
            <strong>Search & Filter Area</strong> - Type in key words and narrow
            the search.
          </li>
          <br />
          <li>
            <strong>Preview Window </strong> - This displays the SVG image in
            the preview window. The images are from the internet/website of the
            owner.
          </li>
          <br />
          <li>
            <strong>Visit Website button</strong> - Select an SVG from the list
            and if you want to download that SVG you’ll click the Visit Website
            button to be taken to that designers page.
          </li>
          <br />
        </ol>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        <br />
        <h4 class="cardtitle">Folder Filter</h4>
        <p class="paragraph">
          Using the Folder Filter allows you to navigate to a specific folder.
          You'll see the number of SVG files that are contained in that folder
          between the parentheses "( )"
        </p>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        <h4 class="cardtitle">Seaching</h4>
        <p class="paragraph">
          You can search by tag or by name. Keep in mind that when searching
          it's based on what folder you are currently in.
        </p>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        <h4> Use the Common Tag Window for Searching</h4>
        <p class="paragraph">
          By going to the File, Common Tag Window you can see all the tags that
          are currently used in the SVG Hunter. You can drag and drop from the
          Tag List window into the search box for easy searching. All searching
          rules apply based on the search by selection and folder filter.
        </p>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        <h4>Downloading the SVG</h4>
        <p class="paragraph">
          When you're ready to download the SVG you can click the Visit Website
          Button. This action will take you to the owner/designer's website
          allowing you to download it. SVG Hunter doesn't store any SVG data in
          the program it simply takes you to the correct weblink where the SVG
          was found.
        </p>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
        <h4 class="cardtitle">Checking for Updates</h4>
        <p class="paragraph">
          Click the check for updates button and you'll see the update page. If
          you need to update you'll see your version highlighted in RED and the
          download button will appear. You will need to login to your account in
          order to receive updates.
        </p>
        {/* TODO: add CardImg and import the img folder for a image (CardImg/>) */}
      </div>
    </>
  );
};

export default HelpGuide;
