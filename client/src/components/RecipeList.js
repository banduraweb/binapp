import React, {useContext, useState, useCallback, useEffect} from 'react';
import {Button, Item, Grid, Icon} from 'semantic-ui-react'
import {useHttp} from "../hooks/http";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from 'react-router-dom'
import {Preloader} from "./Preloader";
import {ShowHistory} from "./ShowHistory";



export const RecipeList=({recipes})=>{

    const history = useHistory();

    const [renderData, setRenderData] = useState(recipes);
    useEffect(() => {
        setRenderData(recipes)
    }, [recipes]);


    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);


    const deleteRecipe = useCallback(async (id) => {
        try {

            const data = await request(`http://localhost:8081/recipe/delete${id}`, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            });

            if (data) {
                setRenderData(renderData.filter(el => el._id !== id))
            }


        } catch (e) {
        }
    }, [token, request, renderData]);


    if (loading) {
        return <Preloader/>
    }
    console.log(renderData,'renderData');




    return(
        <Grid className="container" >
            <Grid.Row>
                {renderData.map(({__history, _id, title, calories, ingredients, preparation}) =>

                    <Grid.Column width={16} key={_id} style={
                        {border: "1px solid #f3f3f3",
                            boxShadow: "0 0 8px 0 #e0e0e0",
                              margin: "10px 0",
                            backgroundColor: "#FFFFCC",
                            padding: "10px"
                        }
                    }>
                            <Item>
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header><i className="fas fa-utensil-spoon">Recipe</i>&emsp;{title}
                                        <br/>
                                        <i className="fas fa-hamburger">Calories</i> &emsp; {calories}</Item.Header>
                                    <Item.Description><Icon  name='food' />Ingredients: &emsp; {ingredients}</Item.Description>
                                    <Item.Description><Icon  name='american sign language interpreting' />
                                        Preparation: &emsp;
                                    {preparation}</Item.Description>
                                    <Item.Extra>
                                        <Button style={{backgroundColor:"#fecdc7"}}
                                            floated='right'
                                            onClick={() => deleteRecipe(_id)}
                                        >Remove</Button>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button style={{backgroundColor:"#bbdb93"}}
                                            onClick={() => {
                                                history.push(`/${_id}`)
                                            }}
                                            floated='right'>Edit</Button>
                                    </Item.Extra>


                                </Item.Content>

                            </Item>
                        {__history.length > 0 &&
                        <div style={{margin: "80px 0"}}>

                            <ShowHistory historyRecipe={__history}
                                         id={_id}
                            />

                        </div>
                        }

                        </Grid.Column>


                )}
            </Grid.Row>
        </Grid>


    )

};

