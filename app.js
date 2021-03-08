const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const app = express();
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({extended:false}));   //Parse URL-encoded bodies
app.use(express.static(__dirname)); //to use static files like CSS
const port = process.env.PORT || 3000
app.listen(port,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
 apiKey: "dcdd5e6078317cfc7b3de263c6e49bab-us8",
 server: "us8"
});
// Now after a POST request is made
app.post("/", function (req,res) {
const firstName = req.body.fname;
const secondName = req.body.lname;
const email = req.body.email;
const listId = "683635c7e6";
//Grab this unique list ID in your Mailchimps-> Audience->Settings
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
