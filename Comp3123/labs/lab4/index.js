const express = require("express");
const app = express();

app.use(express.json());

// Serve static files from /public
app.use(express.static("public"));

// GET /hello
app.get("/hello", (req, res) => {
    res.type("text/plain").send("Hello Express JS");
});

// GET /user?firstname=&lastname=
app.get("/user", (req, res) => {
    const firstname = req.query.firstname || "Vincente";
    const lastname = req.query.lastname || "Sequeira";
    res.json({ firstname, lastname });
});

// POST /user/:firstname/:lastname
app.post("/user/:firstname/:lastname", (req, res) => {
    const { firstname, lastname } = req.params;
    res.json({ firstname, lastname });
});

// POST /users (expects array in request body)
app.post("/users", (req, res) => {
    const users = Array.isArray(req.body) ? req.body : [];
    res.json(users);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(` Server running on http://localhost:${PORT}`)
);
