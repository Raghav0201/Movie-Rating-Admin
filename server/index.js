const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
const port = 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

app.get("/users", (req, res) => {
    return res.json(users);
});

app.delete("/users/:id", (req, res) => {
    let id = Number(req.params.id);
    let filteredUsers = users.filter((user) => user.id !== id);

    users.length = 0;
    users.push(...filteredUsers);

    fs.writeFile("./sample.json", JSON.stringify(filteredUsers, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete the movie" });
        }
        return res.json({ message: "Movie deleted successfully", users: filteredUsers });
    });
});

app.post("/users", (req, res) => {
    let { movie, rating, genre } = req.body;

    if (!movie || !rating || !genre) {
        return res.status(400).json({ message: "All Fields Required" });
    }

    let id = Date.now();
    let newMovie = { id, movie, rating, genre };
    users.push(newMovie);

    fs.writeFile("./sample.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to add the movie" });
        }
        return res.json({ message: "Movie added successfully", users });
    });
});

app.patch("/users/:id", (req, res) => {
    let id = Number(req.params.id);
    let { movie, rating, genre } = req.body;

    if (!movie || !rating || !genre) {
        return res.status(400).send({ message: "All Fields Required" });
    }

    let index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "Movie not found" });
    }
    users[index] = { id, movie, rating, genre };

    fs.writeFile("./sample.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update the movie" });
        }
        return res.json({ message: "Movie details updated successfully", users });
    });
});
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
