const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
const axios = require('axios');
app.use(bodyParser.urlencoded({extended: true}));
require('dotenv').config();
const port = 5000;


app.get("/", function(req, res){
    let recipeUrl=`https://api.spoonacular.com/recipes/random/?apiKey=${process.env.API_KEY}`
    let title, instructions, image, ingredients, summary;

    axios.get(recipeUrl)
        .then(response=>{
            title = response.data.recipes[0].title;
            instructions = response.data.recipes[0].instructions;
            summary = response.data.recipes[0].summary;
            image = response.data.recipes[0].image;
            ingredients = response.data.recipes[0].extendedIngredients;

            for(var i=0; i<ingredients.length; i++){
                name = ingredients[i].name;
                amount = ingredients[i].measures.metric.amount;
                unit = ingredients[i].measures.metric.unitShort;
            }
            res.render('index.ejs',{
                title: title,
                summary: summary,
                instructions: instructions,
                image: image,
                ingredients: amount,
                             name,
                             unit
            });

        })
        .catch(error => {
            console.log(error);
        });

});

app.listen(port, ()=>{
    console.log("Server is running on port " + port);
});
/*
app.listen(process.env.PORT || 3000, function(){
    console.log("Server has started.");
});*/
