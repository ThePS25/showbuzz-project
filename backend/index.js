const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware to parse JSON
app.use(bodyParser.json());

// Use API routes
app.use("/api", require("./routes/api.routes"));

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
