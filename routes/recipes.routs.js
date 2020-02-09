const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require('express-validator');
const Recipe = require('../models/Recipe');


router.post('/add', auth, async (req, res)=>{

    try {

        const {title, calories, ingredients, preparation} = req.body;
        console.log(title);
        const newRecipe = new Recipe({title, calories, ingredients, preparation, owner: req.user.userId});

        await newRecipe.save();

        res.status(201).json({newRecipe})

    } catch (e) {

        res.status(500).json({message:  'errrrrr'}) // change to my custom error e
    }

});

router.get('/', auth, async (req, res)=>{

    try {

            const recipes = await Recipe.find({ owner: req.user.userId });  ///????
            res.json(recipes)

    } catch (e) {

        res.status(500).json({message:  'errrrrr'}) // change to my custom error e
    }

});


router.get('/:id', auth, async (req, res)=>{

    try {
        const recipe = await Recipe.findById(req.params.id);  ///????
        res.json(recipe)

    } catch (e) {

        res.status(500).json({message:  'errrrrr'}) // change to my custom error e
    }

});



module .exports = router;