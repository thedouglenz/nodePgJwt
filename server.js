const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}
app.use(cors(corsOptions));

// Parse requests of content-type application/json
app.use(bodyParser.json());

// Parse requests of content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

const Role = db.role;
const initial = () => {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator",
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello"});
});

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});

