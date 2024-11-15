const router = require("express").Router();

//API-routes
router.use("/user", require("./user.routes"));
router.use("/event", require("./event.routes"));

// Health-check endpoint
router.get("/health-check", (req, res) => {
    res.status(200).send({ message: "APIs are working fine" });
});

// 404 error for undefined routes
router.use((req, res) => {
    return res.status(404).json({
        message: "API route does not exist.",
    });
});

module.exports = router;
