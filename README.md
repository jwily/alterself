# Alter Self

![image](https://user-images.githubusercontent.com/87846621/151751449-9d26ce12-eff2-4e49-8990-d13ed2685fec.png)

https://alterself.herokuapp.com/

Welcome to Alter Self, a minimalistic role-playing character manager designed to ease new players into the world of 5th-edition Dungeons and Dragons.

This site serves as the creator's capstone project for his time at the App Academy coding bootcamp.

## 1. Sign Up, Login, and Authentication

![image](https://user-images.githubusercontent.com/87846621/151751418-2a4e40ce-5c32-43dc-ad86-57ee007f3e96.png)

Basic user creation and login features are available, albeit with relatively basic security measures.

Those wishing to explore the site's features may use the Demo Login available in the login modal.

## 2. Character Creation, Editing, and Deletion

![image](https://user-images.githubusercontent.com/87846621/151751585-7c86a812-82ce-4df8-8745-0de4d01e10f9.png)

Upon logging in, users will be greeted by the Roster page, which displays cards of all characters available to the user.

Character creation requires four inputs: a character's name, fantasy-archetype class, fictional race, and background. Failure to provide any one of these inputs will inform users of their necessity through error messages.

Each character card features both an edit and a delete button. The edit button will bring up a modal nearly identical to that of character creation, with the same input requirements and error handling.

Stylistically, the color of each character's button is determined by their _ability scores_ (explained further below). Similarly, the descriptor at the bottom of each character card is also determined by these scores, encouraging players to reflect upon the relationship between the math behind a character and how they are brought to life by the player.

## 3. Individual Character Sheets

![image](https://user-images.githubusercontent.com/87846621/151751703-468f0229-457d-44e7-990e-80bd72c55992.png)

Upon selecting a character from the roster, users will be directed to a character's individual page.

This "character sheet" is designed as a digital representation of the pen-and-paper forms that Dungeons and Dragons players have traditionally used to represent their fictional avatars.

The left-most panel displays a character's ability scores, values that represent the character's capabilities in overcoming obstacles. The gold number inputs beneath each score are editable; the editing of these scores is a key component of Dungeons and Dragons character creation and play. Note that editing any of these values, locked between 0 and 99, will change other mathematically-linked values on the pages, such as those of the Skills section.

Such gold quantity inputs, found throughout the character sheet, will save automatically on change and/or de-select of the input and its value. Debouncing is implemented to prevent scrolling from triggering a barrage of database requests.

> Users who are already well-acquainted with 5th-edition D&D may note that certain character sheet values and options are either not present or not editable. Further work on this project will ensure that character sheets reflect the totality of information to be found in modern D&D characters.

## 4. Profiencies, Features and Traits, Items

![image](https://user-images.githubusercontent.com/87846621/151752269-81d04751-e388-4d3f-952f-ec425acedbac.png)

Each character possesses several additional resources available for creation, editing, and deletion that represent further nuances to their capabilities as heroes as well as the objects, both magical and mundane, that they acquire throughout their journeys.

## 5. Character Sheet Error Messages

![image](https://user-images.githubusercontent.com/87846621/151752620-3968ae27-66fa-4662-94c6-17efc28a5ca8.png)

Certain invalid inputs, such as changes to numbers beyond their allowed values or empty name inputs for secondary resources, will trigger an error message that can be easily dismissed with a mouse-over event.

The creator hopes to make greater use of the helpful Scholar in future updates in educating new role-players in the intricacies of Dungeons and Dragons.

***

### Bonus Features and To-Dos

- Themes

![image](https://user-images.githubusercontent.com/87846621/151752894-70579311-9b66-48d1-a3bf-b6fe7add2895.png)

Toggling one of the two icons to the left of the Scholar will change the character sheet panel styling. As astute users may note, these themes are inspired by certain classic Japanese role-playing games.

- Complete character information display and edition to reflect basic 5th-edition D&D rules

- Spells

One large and glaring omission from the current character sheets are spell lists. Given the relatively complexity of this secondary resources, spells are to be implemented in the near future.

- WebSocket and Campaigns

One major goal of this project is to implement WebSockets such that players may create campaigns to which players may add their characters and edit and share their characters' information with other players in real time. The implementation of such architecture would allow for the use of Alter Self during remote play.

***

### Technologies Used

Backend:

- Python
- Flask
- Flask WTF & WTForms
- SQLAlchemy
- PostgreSQL
- Docker
- Heroku

Frontend:

- JavaScript
- React
- Redux
- Styled Components

***

## Development

To run this project's code on your local machine, take the following steps:

1. Clone the repository
2. Install dependencies
   1. `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
   2. `cd react-app && npm install`
3. Create a `.env` file based on the `.env.example` with the proper settings for your development environment
4. Set up your PostgreSQL user and database and make sure it matches the information in the `.env`
5. Get into pipenv and get the database up to date:
   1. `pipenv shell`
   2. `flask db upprade`
   3. `flask seed all`
6. Start development servers
   1. `flask run`
   2. `npm start`

## Installing new dependencies

If you add any python dependencies to your pipfiles (using `pipenv install`), you'll need to regenerate the `requirements.txt` before deployment.

For production dependencies, run `pipenv lock -r > requirements.txt`.

For development dependencies, run `pipenv lock -r --dev > dev-requirements.txt`.

**Note**: `psycopg2-binary` MUST remain a dev dependency because you can't install it on alpine-linux. There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
