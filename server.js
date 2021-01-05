// 1. Require Express
const express = require("express");
const path = require("path");
// 2. Create an instance of Express
const app = express();
// 3. Set the PORT
const PORT = process.env.PORT || 8080;

// 5. Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// VIEW ROUTES
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

// API ROUTES
app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

const donuts = [
  {
    name: "glazed",
    price: "$0.99",
  },
  {
    name: "Cereal Killer",
    price: "$3.99",
  },
  {
    name: "Lemon Filled",
    price: "$1.99",
  },
  {
    name: "Bear Claw",
    price: "$4.99",
  },
];

app.get("/api/donuts", (req, res) => {
  res.json(donuts);
});

app.get("/api/donuts/:name", (req, res) => {
  for (let i = 0; i < donuts.length; i++) {
    if (donuts[i].name === req.params.name) {
      return res.json(donuts[i]);
    }
  }
});

app.post("/api/donuts", (req, res) => {
  donuts.push(req.body);
  res.json(donuts);
});

// 4. Listen on the PORT.
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
