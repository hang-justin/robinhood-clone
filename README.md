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

![image](https://user-images.githubusercontent.com/60123981/200231457-dcfddcf7-7aec-49be-a94a-1b7aa2a42d95.png)


![image](https://user-images.githubusercontent.com/60123981/200231664-339ced71-767e-4823-bd6c-6c08d088971f.png)


![image](https://user-images.githubusercontent.com/60123981/200231771-c32bfde6-3792-4030-ac1e-948a50e310ac.png)


You can sell an asset by navigating to the same page and fill out the form after clicking on the 'Sell <asset_name>' located to the top of the form. You may have not seen this initially as it is only displayed if you own that asset.


![image](https://user-images.githubusercontent.com/60123981/200231961-6fc2537a-30ad-4b7d-a273-4d40fb6a7744.png)


## Manage your watchlists
Every new user will have a default watchlist, 'My First List', consisting of all the supported cryptocurrencies.

Users can create a new watchlist by clicking on the '+' located to the right of 'Lists' on the sidebar.


![image](https://user-images.githubusercontent.com/60123981/200232122-14941059-f624-498a-aae4-0e1d71cdba2a.png)


Users can update their watchlist by:

 1. Editing the name by clicking on the ellipses displayed when hovering over the watchlist on the sidebar
 2. Adding/Removing - Navigate to 'View All Cryptocurrencies' then click on the '+' located to the far right
 3. Adding/Removing - Navigating to an asset page and clicking on 'Add to Lists' underneath the trade order form.
 4. Removing - Navigate to a specific watchlist by clicking on the watchlist name then clicking on the 'x' located to the far right of the asset

Users can also delete their watchlists by clicking on the ellipses then clicking 'Delete List'.


![image](https://user-images.githubusercontent.com/60123981/200232944-9a4ed6be-e656-4482-8429-9fb1fa5ddae2.png)


![image](https://user-images.githubusercontent.com/60123981/200233209-1217f8c7-6251-4123-bf11-8674dd476579.png)


![image](https://user-images.githubusercontent.com/60123981/200233323-54542446-0a32-4c04-a3fc-8b9779cc2e80.png)


![image](https://user-images.githubusercontent.com/60123981/200233870-9ef97336-da51-4489-b200-492e9db365f9.png)


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
