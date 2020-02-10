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


router.delete('/delete:id', auth, async (req, res)=>{

    try {
        await Recipe.findByIdAndDelete(req.params.id);

        res.json({message:  'recipe deleted'})

    } catch (e) {

        res.status(500).json({message:  'errrrrr'}) // change to my custom error e
    }


});



router.get('/:id', auth, async (req, res)=>{


    try {
       // console.log(req.params.id,'req.params.id');
        const upDateRecipe =  await Recipe.findById(req.params.id);  ///????

        res.json(upDateRecipe)

    } catch (e) {

        res.status(500).json({message:  'errrrrr'}) // change to my custom error e
    }


});


router.post('/update:id', auth, async (req, res)=>{


    try {
        console.log(req.params.id,'req.params.id update');
        const upDateRecipe =  await Recipe.findById(req.params.id);  ///????
        console.log(upDateRecipe['__history'], 'upDateRecipe');

        const __history = [...upDateRecipe['__history'],upDateRecipe];

        const {title, calories, ingredients, preparation} = req.body;
        //
         await upDateRecipe.update({title, calories, ingredients, preparation, __history});

        res.json({message:  'updated'})

    } catch (e) {

        res.status(500).json(e) // change to my custom error e
    }


});



module .exports = router;