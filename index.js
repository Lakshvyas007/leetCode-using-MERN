const express = require('express')
const app = express()
const port = 3001

const USERS = [];

const QUESTIONS = [
    {
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
},
{
    title: "One state",
    description: "Given an array , return the maximum of the array",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5",
    }]
}]

app.use(express.json());

const SUBMISSIONS = [

]

app.use((req, res, next) => {
    console.log(`Received a ${req.method} request for ${req.url}`);
    next();
});

app.post('/signup', function (req, res) {
    // Add logic to decode body
    // body should have email and password
    const { email, password } = req.body;
    // console.log(req.body);
    //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
    const existingUser = USERS.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }
     const newUser = { email, password };
    USERS.push(newUser);
    // return back 200 status code to the client
    res.status(200).json({ message: 'User successfully signed up' })
})

app.get('/users', (req, res) => {
    res.json({ users: USERS });
});

app.post('/login', function (req, res) {
    // Add logic to decode body
    // body should have email and password
    const { email, password } = req.body;
    // Check if the user with the given email exists in the USERS array
    const user = USERS.find(user => user.email === email);
    // Also ensure that the password is the same
    if (!user || user.password !== password) {
        return res.status(401).json({ message: `Authentication failed` });
    }
    // If the password is the same, return back 200 status code to the client
    const token = 'randomToken';
    // Also send back a token (any random string will do for now)
    // If the password is not the same, return back 401 status code to the client
    res.status(200).json({ message: `Authentication Successfull`, token: token });
})

app.get('/questions', function (req, res) {
    //return the user all the questions in the QUESTIONS array
    res.json({questions:QUESTIONS});
})

// app.get("/submissions", function (req, res) {
//     // return the users submissions for this problem
//     res.send("Hello World from route 4!")
// });

app.post("/submit", function (req, res) {
    const { userId, problemId, code } = req.body;

    // Create a new submission object and store it in SUBMISSIONS array
    const newSubmission = { userId, problemId, code };
    SUBMISSIONS.push(newSubmission);

    res.json({ message: "Submission successful", submission: newSubmission });
});

app.get("/submissions", function (req, res) {
    // Return the user's submissions for this problem
    const userId = req.query.userId; // Assuming you pass the userId as a query parameter
    const problemId = req.query.problemId; // Assuming you pass the problemId as a query parameter

    // Filter submissions based on userId and problemId
    const userSubmissions = SUBMISSIONS.filter(submission => submission.userId === userId && submission.problemId === problemId);

    res.json({ submissions: userSubmissions });
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})