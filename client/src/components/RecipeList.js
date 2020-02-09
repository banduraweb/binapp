import React  from 'react';
import { Button, Item, Image, Grid } from 'semantic-ui-react'




export const RecipeList=({recipes})=>{

    console.log(recipes,'list');
    return(
        <Grid className="container" >
            <Grid.Row>
            {recipes.map(({title, calories, ingredients, preparation})=>


                        <Grid.Column width={8}>
                            <Item >
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>{title}, {calories}</Item.Header>
                                    <Item.Description>{ingredients}</Item.Description>
                                    <Item.Description>{preparation}</Item.Description>
                                    <Item.Extra>
                                        <Button floated='right'>Action</Button>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Grid.Column>


                )}
            </Grid.Row>
        </Grid>


    )

};



