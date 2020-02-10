import React, {useContext, useState, useCallback, useEffect} from 'react';
import {Button, Item, Grid} from 'semantic-ui-react'
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

    const [visibleHistory, setVisibleHistory] = useState(false);
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

    return(
        <Grid className="container" >
            <Grid.Row>
                {renderData.map(({__history, _id, title, calories, ingredients, preparation}) =>

                    <Grid.Column width={8} key={_id} style={
                        {border: "1px solid #f3f3f3", boxShadow: "0 0 8px 0 #e0e0e0"}
                    }>
                            <Item >
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>{title}, {calories}</Item.Header>
                                    <Item.Description>{ingredients}</Item.Description>
                                    <Item.Description>{preparation}</Item.Description>
                                    <Item.Extra>
                                        <Button
                                            floated='right'
                                            onClick={() => deleteRecipe(_id)}
                                        >Remove</Button>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button
                                            onClick={() => {
                                                history.push(`/${_id}`)
                                            }}
                                            floated='right'>Edit</Button>
                                    </Item.Extra>
                                    {__history.length > 0 &&
                                        <>
                                    <Item.Extra>
                                        <Button
                                            onClick={()=>setVisibleHistory(true)}
                                            floated='right'>See prev versions</Button>
                                    </Item.Extra>
                                            {visibleHistory && <ShowHistory historyRecipe={__history}/>}
                                       </>
                                    }

                                </Item.Content>
                            </Item>
                        </Grid.Column>


                )}
            </Grid.Row>
        </Grid>


    )

};



