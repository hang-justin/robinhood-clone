# YUANHOOD

Yuanhood is a Robinhood clone built using Postgres, Flask-SQLAlchemy, React, Redux.

Yuanhood is based off of Robinhood, which is a financial services company where users can trade assets such as stocks, ETFs, and cryptocurrencies. Yuanhood presently only supports a number of the most popular cryptocurrencies. Users can buy/sell those assets based on real prices and also add those cryptocurrencies on watchlists.

Follow the link below to check it out!
https://yuanhood.herokuapp.com/

# NAVIGATING YUANHOOD
## Accessing your account
#### Logging in
Login by clicking on the 'Login' button located on the top right. If you're curious and want to check it out without any obligation, feel free to login as a demo user which can also be accessed on the login page.


![login](https://user-images.githubusercontent.com/60123981/200235038-15a81c05-5b84-4093-9188-1023090cd71e.png)



#### Signing Up
Sign up by accessing the sign up page through:

 1. Signup button to the top right of the splash page
 2. Signup button towards the bottom of the splash page
 3. 'Create an Account' link on the login page


![signup](https://user-images.githubusercontent.com/60123981/200235047-7e8091f6-e132-44e8-b984-3a54d2f19308.png)


## Manage your portfolio and trade assets
After logging in, you will be at your home page where you can view a breakdown of your portfolio. If you just made an account, your portfolio will only consist of your cash assets totaling to $50,000.00 courtesy of Yuanhood.


![image](https://user-images.githubusercontent.com/60123981/200231316-801419a9-3f73-40ab-8a64-759e8c5ac991.png)



To buy an asset, first navigate to 'View Available Cryptocurrencies' located to the top right of the sidebar located on the right side. Next, click on the asset that you would like to buy.

Fill out the form located to the right and you will have purchased your first asset!


![buy-asset-1](https://user-images.githubusercontent.com/60123981/200235913-6082ad24-cd02-4042-a277-2a0e42ffc660.png)


![buy-asset-2](https://user-images.githubusercontent.com/60123981/200235925-f4cc670f-6c03-4074-86a8-47d81375c813.png)


![buy-asset-3](https://user-images.githubusercontent.com/60123981/200235942-902eafa4-4025-4c53-ac95-af800bfbbf28.png)



You can sell an asset by navigating to the same page and fill out the form after clicking on the 'Sell <symbol>' located to the top of the form. You may have not seen this initially as it is only displayed if you own that asset.


![image](https://user-images.githubusercontent.com/60123981/200231961-6fc2537a-30ad-4b7d-a273-4d40fb6a7744.png)


## Manage your watchlists
Every new user will have a default watchlist, 'My First List', consisting of all the supported cryptocurrencies.

Users can create a new watchlist by clicking on the '+' located to the right of 'Lists' on the sidebar.


![create-list](https://user-images.githubusercontent.com/60123981/200236174-c72d4897-e64d-4ca2-b597-491582b982ae.png)


Users can update their watchlist by:

 1. Editing the name by clicking on the ellipses displayed when hovering over the watchlist on the sidebar
 2. Adding/Removing - Navigate to 'View All Cryptocurrencies' then click on the '+' located to the far right
 3. Adding/Removing - Navigating to an asset page and clicking on 'Add to Lists' underneath the trade order form.
 4. Removing - Navigate to a specific watchlist by clicking on the watchlist name then clicking on the 'x' located to the far right of the asset


![edit-list-1](https://user-images.githubusercontent.com/60123981/200237045-d2a9b809-9d30-40d6-a6d5-ec36cd9ed0f7.png)


![edit-list-2](https://user-images.githubusercontent.com/60123981/200237062-bd995b97-bc5c-44d2-a4f2-15630078f582.png)


![edit-list-3](https://user-images.githubusercontent.com/60123981/200237082-c2893e92-5201-4a7e-bb24-80cf8616a057.png)


![edit-list-4](https://user-images.githubusercontent.com/60123981/200237449-115565d8-fe5a-4b86-9e68-eed2c3745079.png)


Users can also delete their watchlists by clicking on the ellipses then clicking 'Delete List'.


![delete-list](https://user-images.githubusercontent.com/60123981/200237109-dd595a8d-5179-4ea4-aa0b-0c3b84385796.png)


## Tech used
![Flask](https://camo.githubusercontent.com/ea92b069447aaf7b6ed27965700bc66cd0f7a450d0af50e0253e51af05ae73db/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f466c61736b2d4244424442443f7374796c653d666f722d7468652d6261646765266c6f676f3d466c61736b266c6f676f436f6c6f723d626c61636b)
![Python](https://camo.githubusercontent.com/053ff5f8af42deab62b674620537307a2b9d52613eff9901ff014a0d37f3e217/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f507974686f6e2d2532334637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d507974686f6e266c6f676f436f6c6f723d626c61636b)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Ubuntu](https://camo.githubusercontent.com/d6de31463470dd4540e7ece7849e6d38d423825f113ea4ae639f4dcfd0392d82/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5562756e74752d4539353432303f7374796c653d666f722d7468652d6261646765266c6f676f3d7562756e7475266c6f676f436f6c6f723d7768697465)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML](https://camo.githubusercontent.com/49fbb99f92674cc6825349b154b65aaf4064aec465d61e8e1f9fb99da3d922a1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d2532334533344632362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)
![CSS3](https://camo.githubusercontent.com/e6b67b27998fca3bccf4c0ee479fc8f9de09d91f389cccfbe6cb1e29c10cfbd7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f637373332d2532333135373242362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)
![Heroku](https://camo.githubusercontent.com/d18f98a93a8ca015503870e592f96dbdf86f41048e9de1fbbbd4b2dcc7c456b1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6865726f6b752d2532333433303039382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://camo.githubusercontent.com/6b7f701cf0bea42833751b754688f1a27b6090fdf90bf2b226addff01be817f0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f636b65722d2532333064623765642e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d646f636b6572266c6f676f436f6c6f723d7768697465)

## To dos

 - Live data
 - Statements
 - Search bar
 - Newsfeed
 - Categories
 - Stocks

## How to set up

1. Clone this repository (only this branch)

   ```bash
   git clone git@github.com:hang-justin/robinhood-clone.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. From the root directory, cd into react-app, install your dependencies, run npm install, and WALA! You got your very own Discord clone.

   ```bash
   cd react-app
   ```

   ```bash
   npm install
   ```
   
   ```bash
   npm start
   ```

<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations. 

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |
