import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import { useHttp } from "../hooks/http";
import { AuthContext } from "../context/AuthContext";

export const OneRecipe = () => {
    const history = useHistory();
    const { id } = useParams();
    console.log(id, "params");
    const { token } = useContext(AuthContext);
    const { request } = useHttp();
    const [formData, setFormData] = useState({
        title: "",
        calories: "",
        ingredients: "",
        preparation: ""
    });

    const fetchForUpdate = useCallback(async () => {
        try {
            const data = await request(
                `http://localhost:8081/recipe/${id}`,
                "GET",
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            console.log(data);
            const { title, calories, ingredients, preparation } = data;

            setFormData({
                title: title,
                calories: calories,
                ingredients: ingredients,
                preparation: preparation
            });
        } catch (e) {}
    }, [token, request, id]);

    useEffect(() => {
        console.log("me");
        fetchForUpdate();
    }, [fetchForUpdate]);

    const handlerChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    console.log(formData, "formData");
    const handleConfirm = async () => {
        try {
            const data = await request(
                `http://localhost:8081/recipe/update${id}`,
                "POST",
                { ...formData },
                {
                    Authorization: `Bearer ${token}`
                }
            );
            history.push("/recipes");
            console.log(data, "data");
        } catch (e) {}
    };

    return (
        <Form className="container">
            <Form.Group widths="equal">
                <Form.Field
                    id="form-input-control-first-name"
                    control={Input}
                    label="Title"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handlerChange}
                />
                <Form.Field
                    id="form-input-control-last-name"
                    control={Input}
                    label="Calories"
                    placeholder="calories"
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handlerChange}
                />
            </Form.Group>
            <Form.Field
                id="form-textarea-control-ingredients"
                control={TextArea}
                label="Ingredients"
                placeholder="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handlerChange}
            />
            <Form.Field
                id="form-textarea-control-preparation"
                control={TextArea}
                label="Preparation"
                placeholder="preparation"
                name="preparation"
                value={formData.preparation}
                onChange={handlerChange}
            />

            <Form.Field
                id="form-button-control-public"
                control={Button}
                content="Update"
                label="Label with htmlFor"
                onClick={handleConfirm}
            />
        </Form>
    );
};
