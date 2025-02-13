const express = require("express");
const port = 3005;
const app = express();



app.get("/", async (req, res) => {
    res.send("<h1>Hello Backend</h1>")
});



app.listen(port, () => console.log(`Server has started on port: ${port}`));