Superhero Team Builder
Collaborators: Suey & Alex

!! Instructions !!
1. Enter 'cd json-server/db' in your terminal followed by 'json-server --watch db.json'.
2. Return to the top top-level of this directory and enter npm start. When prompted to use localhost:3001, enter 'Y' (3000 is being used by the local db.json file!)

Feature Highlights
- Heroes populating the app homepage are fetched from the Marvel API, a rich collection of superhero data, including images, hero names and descriptions, and even an assortment of comics where the hero is featured. This assortment is obtained through a separate API call when a user clicks on a hero to view their details.
- The local server handles both saved hero data and signed up users. By assigning a userId to an added hero that corresponds to the user who selected the hero, the app ensures that heroes only display specific to the logged in user. 
- Once signed in, a user can select a hero’s card from the home screen, review the hero’s details page, and enlist that hero. Enlisting will place the hero in a temporary banner at the top of the page which corresponds with a specified state array, allowing the user to add multiple heroes to this array before confirming those heroes to their team. After clicking the “Add to Your team” button, all heroes in the state array will then be posted to the local server, inherit the user’s id as a unique identifier, and the state array will then be cleared out.
- The Team component renders all heroes that have been added by the current user by way of fetching from the local server and filtering to only include heroes with that user’s id. This page functions similarly to the home page, where a hero can be clicked on to view that hero’s information in greater detail. A [Remove from team] button replaces the [Enlist] button, and clicking this button will DELETE that hero from the local server.
= A user can create their own hero by leveraging the form included in the NewHeroForm component. This controlled form requests a user to add a title, image, and description for their new hero. Once received, a form submit handler will POST the new hero to the local server alongside any heroes the user has enlisted from the Marvel API.

Additional Feature Tidbits
- The Marvel API sets a limit of 100 characters per call. To solve for this, [Next] and [Back] buttons were added to the homepage that change the state of the “offset” value in the API string to +100 and -100 respectively, allowing a user to parse through the API call and ensure access to the full dataset
- Prevention logic ensures that a user cannot take any form of hero selection or creation action unless they are signed in; popovers handle this communication when a user attempts an action while the isLoggedIn state remains false.
    - Additionally, similar logic is built in to the various form pages to alert:
        - When a user attempts to log in with a name that does not exist
        - When a user attempts to sign up with an existing team name
        - When a user leaves an empty field when creating a hero
-The application is paginated using React Router, with a Switch configured at the App level to manage display handling; the Header is the only component that persists throughout the user experience
    - Link and useHistory are also leveraged wherever application. Examples include routing between pages, clicking the logo in the upper-right to navigate to the home page, ensuring sign-in / sign-up submissions route users back to their previous page, and pushing users to their team page once they have confirm hero selection on the homepage
    - NavLinks are used in the Header component so styling can be applied to a selected component as a visual indicator
- When enlisting heroes from the Marvel API, the character will temporarily be removed from the RecruitList component array to ensure the same character cannot be added twice during the selection process. A future build would extend this logic so that heroes fully added to the user’s team via POST will also be filtered out.
- Material UI is the UI framework utilized within this application, used specifically for
    - Sign in component visuals
    - Sign out component visuals
    - Prevention handling modals
    - New hero form styling
    - Gridding all containers where hero cards are found

Future Feature Ideas
- Develop a filter for the home page to allow users to more easily search the Marvel API for a hero of their choice.
- Filter out the Marvel API results to exclude heroes already added to a user’s team
- Editing capabilities for hero names, images, and descriptions within a user’s own team
- Enable a single user to create multiple teams and switch between teams. The current structure accommodates a 1 user: 1 team configuration.
    - Additionally, allow users to battle the teams they have created against one another. This could potentially use a random healthpoint number added to each character when POSTing to the local server, and ensuring the winning team is the one with the greater healthpoint total for all teammates
- Create a storybuilder component within the Team component that allows a user to script out a text story using the various data points for the heroes within their team

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

Core features of the MVP
MVP Feature Set
    - Components will exist in separate files from one another for organization and modularity
    - Homepage populated with superheroes fetched from the Marvel API
    - All non-<Header>/Login components to be managed via React router
    - JSON server will manage “saved” superheroes a user has selected and added from the homepage
    - Sign Up / Sign In Functionality. One user === one superhero team
    - STRETCH GOAL: One user can create and manage multiple teams within a single profile
    - A controlled form which allows users to add their own superhero to their team vs. solely pulling from the API
    - STRETCH GOAL: Functionality that allows a user to have two teams they have created to “battle” one another.

API specs
- External API: https://developer.marvel.com/
    - Leveraged to GET superhero data from Marvel’s API library
    - This data will be rendered to the Recruit component page to then allow users to select superheroes to add to their team
- Backend server: db.json file via json-server
    - Leveraged to POST superhero data from the Marvel API when a user selects a superhero to recruit to a local backend server that represents the user’s “team”
    - The server is parsed by users to allow superhero team data to exist specific to the user who is currently logged in
    - Users can also DELETE heroes from the server as desired
    - Users can also POST new superheroes they create from a controlled form within the app
    - Users can also create multiple superhero teams that are also managed within the local server

Challenges
- Are we making assumptions about the type of data we have access to within the Marvel API?
    - Solution: Default to (maybe) the Pokemon API if we’re spinning our wheels with the Marvel one
- Will allowing a single user to create multiple teams too complex / beyond the scope of what we can accomplish in a week?
    - Solution: Start with a single-user-single-team configuration for our db.json and sign up elements, THEN attempt to refactor a multi-team config if we have time
- How do we display everything properly using client-side routing? How can we ensure certain page elements persist no matter the route? E.g. Header, login/logout button, nav, logo of some kind
    - Solution: Ensure routing is targeting VERY specifically within our app WHERE we want changes to occur
- How do we make sure that all three teammates are in sync with one another / understand the separation of responsibilities and the concepts behind what others are working on? How do we successfully divide and conquer between plenty of components that we’ll all likely be working on simultaneously?
    - Have one person build out the initial file structure
        - This person should also champion the git repo
    - BE ON ZOOM ALL DAY
        - Stand-up’s in the morning, mid-day check in, end of day stand down
