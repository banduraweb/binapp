import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Recipes } from "../pages/Recipes";
import { CreateRecipe } from "../pages/CreateRecipe";
import { OneRecipe } from "../pages/OneRecipe";
import { Auth } from "../pages/Auth";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/recipes" exact>
                    <Recipes />
                </Route>
                <Route path="/create" exact>
                    <CreateRecipe />
                </Route>
                <Route path="/:id" exact>
                    <OneRecipe />
                </Route>
                <Redirect to="/create" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};
