const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
const uuidv1 = require("uuid/v1");
const Recipe = require("../models/Recipe");

router.post("/add", auth, async (req, res) => {
    try {
        const { title, calories, ingredients, preparation } = req.body;
        console.log(title);
        const newRecipe = new Recipe({
            title,
            calories,
            ingredients,
            preparation,
            owner: req.user.userId
        });

        await newRecipe.save();

        res.status(201).json({ newRecipe });
    } catch (e) {
        res.status(500).json({ message: "/add" });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const recipes = await Recipe.find({ owner: req.user.userId });
        res.json(recipes);
    } catch (e) {
        res.status(500).json({ message: "/" });
    }
});

router.delete("/delete:id", auth, async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);

        res.json({ message: "recipe deleted" });
    } catch (e) {
        res.status(500).json({ message: "/delete:id" });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const upDateRecipe = await Recipe.findById(req.params.id);

        res.json(upDateRecipe);
    } catch (e) {
        res.status(500).json({ message: "/:id" });
    }
});

router.post("/update:id", auth, async (req, res) => {
    try {
        const upDateRecipe = await Recipe.findById(req.params.id);

        const { __history } = upDateRecipe;
        __history.push({
            id: upDateRecipe._id,
            un_id: uuidv1(),
            title: upDateRecipe.title,
            calories: upDateRecipe.calories,
            ingredients: upDateRecipe.ingredients,
            preparation: upDateRecipe.preparation
        });

        const { title, calories, ingredients, preparation } = req.body;

        await upDateRecipe.update({
            title,
            calories,
            ingredients,
            preparation,
            __history
        });

        res.json({ message: "updated" });
    } catch (e) {
        res.status(500).json({ message: "update error" });
    }
});

module.exports = router;
