# TrainScheduler

description of the problem: have a page that first pulls values from a database(firebase in this case) and populate the html with that info. also allow the user to update the html with a form submission that would go to firebase and calculate the time till the next train arrival

how you solved it/technical approach: first checked if there were any values in firebase and would populate the page with those. if not then the user would add in values and on the on click submit button the different values would be used in key-value pairs to firebase where they would be stored. from there you would get the calculations for the time until next train by using moment.js and doing a bunch of math
