const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./routes/auth.routes");
const routeRecipe = require("./routes/recipes.routs");

const app = express();

app.use(express.json({ extended: true }));

app.use(cors());

app.use("/auth", route);
app.use("/recipe", routeRecipe);

require("dotenv").config();

const port = process.env.PORT || 8081;
const connection = mongoose.connection;

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        app.listen(port, () => {
            console.log(`Started..on.port.${port}`);
        });
    } catch (e) {
        console.log("Server error", e.message);
        process.exit(1);
    }
})();

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
