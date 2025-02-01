# Testing

> Place your test plan, test report and traceability matrix here

## Traceability matrix

### Functional

The table below shows an overview of which test covers which functional requirements

| Test | F1 | F2 | F3 | F4 | F5 | F6 | F7 |  F8  | F9 | F10 | 
|:----:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:----:|:--:|:---:|
| T1.1 | X  |    |    |    |    |    |    |      |    |     |
| T1.2 |    |    | X  |    |    |    |    |      |    |     |
| T1.3 |    |    |    |    |    |    | X  |      |    |     |
| T1.4 |    | X  |    |    |    |    |    |      |    |     |
| T1.5 |    |    |    |    |    | X  |    |      |    |     |
| T1.6 |    |    |    |    |    |    |    |      |    |  X  |
| T2.1 |    | X  |    |    |    |    |    |      |    |     |
| T2.4 |    |    |    |    |    |    |    | Fail |    |     |
| T2.5 |    |    |    |    | X  |    |    |      |    |     |
| T2.6 |    |    |    |    |    |    |    |      | X  |     |

*Because the requirement doesn't allow the placed bids to be modified or deleted. So no such functionality was implemented in the application. So no test can be performed for F4. 

### Non funtional

The table below shows an overview of which test covers which non-functional requirements

| Test | NF1 | NF2 | NF3 | NF4 | NF5 | NF6 | NF7 | NF8 | NF9 | NF10 | NF11 | NF12 | NF13 | NF14 | NF15 | NF16 | NF17 | NF18 | NF19 | 
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|:----:|
| T1.1 |  X  |  X  |  X  |  X  |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T1.2 |     |     |     |     |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T1.3 |  X  |  X  |  X  |  X  |  X  |  X  |  X  |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T1.4 |  X  |  X  |  X  |  X  |  X  |  X  |  X  |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T1.5 |     |  X  |  X  |  X  |     |     |     |  X  |  X  |      |  X   |      |  X   |  X   |  X   |  X   |      |      |      |
| T1.6 |     |  X  |  X  |  X  |     |     |     |  X  |  X  |      |  X   |      |  X   |  X   |  X   |  X   |      |  X   |      |
| T2.1 |  X  |  X  |  X  |  X  |  X  |  X  |  X  |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T2.2 |     |     |     |     |     |     |     |     |  X  |      |  X   |  X   |  X   |  X   |  X   |  X   |      |      |      |
| T2.3 |     |  X  |  X  |  X  |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |  X   |      |      |      |
| T2.5 |     |     |     |     |     |     |     |  X  |  X  |      |  X   |      |  X   |  X   |  X   |  X   |      |      |      |
| T2.6 |     |     |     |     |     |     |     |  X  |  X  |      |  X   |      |  X   |  X   |  X   |  X   |  X   |  X   |  X   |
| T3.1 |     |     |     |     |     |     |     |     |  X  |      |  X   |  X   |  X   |  X   |  X   |  X   |  X   |      |  X   |
| T3.2 |     |     |     |     |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T3.3 |     |     |     |     |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T3.5 |     |     |     |     |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |      |      |      |      |
| T3.6 |     |     |     |     |     |     |     |     |  X  |      |  X   |      |  X   |  X   |  X   |  X   |  X   |      |      |

## Test plan

### Objective
The objective of this test plan is to verify that the Auction System meets the functional and non-functional requirements. This includes verifying the correct behavior of the system under various scenarios and ensuring that all implemented features work as expected.

### Scope
The system consists of two primary components:

- Bag Router: Handles the browsing, filtering, and bidding processes for bags.
- Auth Router: Manages user authentication, including login and registration.

## Test report
### Bag Router Test
Test 1.1: When open the website, all bags are correctly loaded to the screen with picture, name and current price.

Test 1.2: When type in keywords in the search bar, the bags will be automatically filtered to the bags only when their names include the keyword.

Test 1.3: Filter bag color to "YELLOW", brand to "HERMÉS", size to "MEDIUM", only one bag meets all criteria is left on the screen.

Test 1.4: When click the picture of one bag, the location changes to the detail page of this bag. The name, current price, bidders and ending date (in countdown form) are correctly displayed on the screen.

Test 1.5: Using IntelliJ test adding a new bag with a valid token, set the start price as a negative number, an error "Start price must be a positive number!" is returned.

Test 1.6: Using IntelliJ test adding a new bag with a userToken, the request is reject with error "Admin Only!"

Test 2.1: When visit the detail page of a bag, the bid list is correctly loaded on the right side of the screen.

Test 2.2: When try to place a bid when not logged in, the location automatically changes to login page.

Test 2.3: When logged in as a user, type in a whole number as 3000, click the place bid button, the new bid is added to the bid list. The current price also changes to 3000.

Test 2.4: Open the website with another user and place a bid, the new bid is not loaded on the original one, the test is failed.

Test 2.5: When logged in as a user, type in a negative number, the error message "Your bid must be bigger than the start price and the last bid."

Test 2.6: When logged in as an admin, type in a whole number and click place bid button, an error "You cannot bid as an admin" is displayed under.

### Auth Router Test
Test 3.1: Go to the login page, when login as "username: user1, password: psw4user1", the "My Home" button will show on the header.

Test 3.2: Go to the login page, when login as "username: admin1, password: psw4admin1", the "Upload New Bag" button will show on the header.

Test 3.3: Go to the login page, when login as "username: user1, password: psw4admin1", the error message "invalid user or password" is displayed under.

Test 3.4: Go to the login page, when login as "username: unknown, password: unknown", the error message "invalid user or password" is displayed under.

Test 3.5: Go to the register page, type in "username: newuser, email:newuser@gmail.com, password: newpsw" and register, the page successfully registered a new user and automatically logged in.