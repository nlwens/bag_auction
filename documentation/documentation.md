## Backend documentation

### File construction
As we learned in Web Basic, it is better to seperate difference sources and different sequence into different files. So in my backend, I have an index.js as a general controller, a router folder, a controller folder and a middleware folder.

### API implementation
In this program, there are 3 sources which are items, bids and users. Because we are not using database, so they are all in json file.

In order to prevent the json file being too large. I seperated bids from the bags. When using database, it is easy to use left join to connect these 2 sources together. However, json file doesn't provide such query function so when a new bid is placed, it will not only add to bids data, but also update in the bags data.

As the main source of this program which is bag. It is the only source that allowed to create, read, modify and delete. So I wrote 5 different methods in the bags router.

For bids, because the bids are not allowed to delete or modify, so in bids router only get and post API are implemented.

The user is supposed to delete or change the password and username using PUT and DELETE API. Due to the limited time and it was not required in the list. So I only implemented POST API to login and register.

### Middleware
I created 2 middlewares for this project, one is to check if the user is logged in, one is to check if a user is an Admin. This is to meet the requirement of the role responsibility separation.

## Frontend Documentation

### Pages

#### Home Page
For home page I followed the wireframe provided in functional design file. Because I wish to make an auction website for luxury bags, so I spent a lot of time styling to make the website look more high end. The color I chose was mainly based on black white and grey. 

I also considered displaying the countdown date under the item picture, but it somehow ruins the design of the page, so I didn't it. 

#### Detail page: 
The detail page is the most complicated part in this whole program because it uses too many components. Each component is also influencing the others. For more details I would like to discuss in the component part. 

Generally the final effect agree with the requirement in the wireframe.

I think it would be better for admin to edit an item directly when the admin is visiting the detail page, so I didn't make a dashboard for admin but put modify link directly in the detail page.

#### Login Page & Registration Page:
According to the requirement, after the user has logged in, it should immediately take the user back to the detail page continuing the bidding. So I saved the url in the localStorage first the jump back after the login.

At the beginning I was trying to save the token and username in the writable store. But it always automatically logout when jump back to the previous page. I spent a lot of time and tried many ways to fix it but couldn't. So I still saved the token in the localStorage to at least make the whole website work.

#### Dashboard Page:
This page is specially made for users to check how many items they have won in total. I filtered those bags which auction has already ended and the final bidder is the logged in user at the front end and display in this page.

This is the last page I have coded for this program just one day before the deadline because I missed this requirement at the beginning. I am happy that I only spent an hour to finalize this page with its component. Now it works perfectly.

### Components

#### Header:
One of the most important component in the program. It works as a navigator. I used quite some "if" syntax at here because according to different user logged in, it is supposed to show different information.

Admins can upload new bag at here, users can visit their own dashboard. Also, from here you can visit login page or logout. 

#### Filter:
The filters are not complex, just color size and brand. I wanted to make a radio filter to filter by the price. Due to not having enough time, it was not implemented at final.

#### Item:
The Item component is an easy one, just need to do the loop in home page and import each bag.

#### Dashboard Item:
It is similar to the Item component used in home page with different layout. There's no complex algorithm here.

#### Image:
The component used in detail page to show the picture of the bag. Not too much to talk, just for the styling.

#### Description:
The component used to show the detail information of the bag.
Because google description of each bag and implement in the data file is feasible but require a lot of work, so for the description paragraph I just hard coded in Lorem Ipsum code in the front end.

#### Delete:
The link that allow admin to delete the bag, it only shows when the logged in user is an admin.

#### Countdown:
The countdown is a little bit complicated because we didn't learn how to make this system before. So I had to check some information online but luckily I managed to do this.

Also because countdown is not only used to show in the description, but also needed in bid component. So I created an AuctionEnd variable in writable store.

#### Bid:
List all of the bids placed for the bag. Showing not only the bidder and the amount. I wrote a lot of checking because there are a lot of limitations when you try to place a bid. Such as you have to be a user not an admin, you can only bid higher than the previous bid amounts or this bid is meaningless. Also the bid amount you have to provide a valid integer not a negative number or a string.
Also I create a error message variable to display all of the errors I checked when placing the bids, and they are all displayed correctly.

#### Upload:
The hardest component in the project. Even though it works correctly but I feel it is not very well designed. I want to reuse this component in not only uploading but also modifying. So the structure somehow looks a bit messy. 

In order to make the admin no need to type in all the information again, the value of the input are already bind to the information of the bag fetched.