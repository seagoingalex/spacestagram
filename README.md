Spacestagram 
By Alex Calvert

!! Instructions !!
Check out the production build of this application at the following link: https://damp-castle-08801.herokuapp.com/

If you're running this app locally, running 'npm start' will enact both the client-side server in addition to the db.json file on a separate port.

Welcome to Spacestagram, the app that helps you curate your favorite images straight from NASA's Astronomy Picture of the Day archives. Getting started is easy, just head to the above production link to get started:
- Click Sign in from the top-right of the application to enter your existing credentials; if you do not have an account yet, you'll be prompted to create one!
- Once logged in, you will now be able to select images from the homepage to see the details on the photo, and add that entry to your list of selected photos.
- After selection, you'll notice the photo will be added to a banner at the top of the homepage, allowing you to select multiple photos before clicking "Save Current Selection To Favorites".
- If you don't like the images currently on the homepage, click the "Next" button to retrieve a new collection of images. If you accidentally added an image to the Selection banner, simply click "Deselect" under that photo to remove it."
- Once saved, the images you selected will be added to the "Your Favorites" page. Clicking images on this page will direct you to a similar details page as earlier, where you can also unfavorite images if desired.
- Are you an aspiring intergalactic photographer? Add custom images to your Favorites page by selecting the "Add Custom Favorite" page in the main nav and filling in the appropriate fields.


Feature Highlights
- Images populating the app homepage are fetched from the NASA Astronomy Picture of the Day (APOD) API, a rich collection including images, dates and descriptions of intergalactic photography
- The local server handles both favorited image data and signed up users. By assigning a userId to a favorited image that corresponds to the user who selected the image, the app ensures that favorited images only display specific to the logged in user. 
- Once signed in, a user can select an APOD card from the home screen, learn more about that image from the details page, and select that image. Selecting will place the image in a temporary banner at the top of the page which corresponds with a specified state array, allowing the user to add multiple APODs to this array before confirming those images to their team. After clicking the “Save Current Selection to Favorites” button, all APODs in the state array will then be posted to the local server, inherit the user’s id as a unique identifier, and the state array will then be cleared out.
- The Profile component renders all APODs that have been added by the current user by way of fetching from the local server and filtering to only include APODs with that user’s id. This page functions similarly to the home page, where an image can be clicked on to view that APOD's information in greater detail. A [Remove from Favorites] button replaces the [Select] button, and clicking this button will DELETE that APOD data from the local server.
- A user can add their own custom space photography by leveraging the form included in the NewApodForm component. This controlled form requests a user to add a title, image, and description for their new image. Once received, a form submit handler will POST the new entry to the local server alongside any APODs the user has favorited from the NASA API.

Additional Feature Tidbits
- By leveraging the 'count' parameter when calling NASA's API, 24 images are generated at random when a user lands on the homepage. Selecting the "Next" button will prompt a refresh of visual images with new entries from a follow-up call to the API.
- Prevention logic ensures that a user cannot take any form of APOD selection or creation action unless they are signed in; popovers handle this communication when a user attempts an action while the isLoggedIn state remains false.
    - Additionally, similar logic is built in to the various form pages to alert:
        - When a user attempts to log in with a name that does not exist
        - When a user attempts to sign up with an existing profile name
        - When a user leaves an empty field when adding their own space photography
-The application is paginated using React Router, with a Switch configured at the App level to manage display handling; the Header is the only component that persists throughout the user experience
    - Link and useHistory are also leveraged wherever application. Examples include routing between pages, clicking the logo in the upper-right to navigate to the home page, and ensuring sign-in / sign-up submissions route users back to their previous page
    - NavLinks are used in the Header component so styling can be applied to a selected component as a visual indicator
- Material UI is the UI framework utilized within this application, used specifically for
    - Sign in component visuals
    - Sign out component visuals
    - Prevention handling modals
    - Custom photo form styling
    - Gridding all containers where APOD cards are found


What is the basic story of the application?
- A web application that allows superhero fans, old and new, to create their own Marvel superhero teams from scratch! 
    - As a user, I can log in to access the app and see data
        - As a user, I can SEE everything in the app, but can’t actually select a superhero or save a hero to a team (make state-changing actions) unless I’m signed in.
    - As a user, I can create a “team” and customize its name before adding superheroes to that team.
        - STRETCH GOAL: As a user, I can create MULTIPLE teams and switch between teams when adding my superheroes. Each team manages its own set of superheroes mutually exclusive of one another.
    - As a user, I have homepage access to a collection of superheroes to review and consider for the team I’m building.
    - As a user, I can review the details of a superhero and their stats (abilities, etc.), BEFORE I add them to my team.
    - As a user, I can select a superhero of my choice and add them to the “team” that I have already created and named
        - As a user, I can select multiple superheroes from the full list one by one before a final confirmation where they actually get added my team
    - As a user, I can remove a superhero from a team, and that change will persist even after the page is refreshed
    - As a user, I can create my OWN superheroes and add them to my team
    - STRETCH GOAL: As a user, I can make my superhero teams battle one another and result in a win/loss/tie
        - As a user, i can make my superhero teams battle other USERS’ teams and result in a win/loss/tie


API specs
- External API: https://api.nasa.gov/planetary/apod
    - Leveraged to GET APOD data from NASA's API library
    - This data will be rendered to the Home component page to then allow users to select images to add to their favorites
- Backend server: db.json file via json-server
    - Leveraged to POST APOD data from the NASA API when a user selects an image to favorite to a local backend server that represents the user’s "Profile"
    - The server is parsed by users to allow APOD profile data to exist specific to the user who is currently logged in
    - Users can also DELETE APODs from the server as desired
    - Users can also POST new photos they create from a controlled form within the app
