
import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import {useHttp} from "../hooks/http";
import {AuthContext} from "../context/AuthContext";


export const CreateRecipe = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [formData, setFormData] = useState({
        title: '',
        calories: '',
        ingredients: '',
        preparation:''
    });

    const handlerChange =(event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    };


    const handleConfirm = async () => {
        try {

            const data = await request('http://localhost:8081/recipe/add', 'POST', {...formData},{

                Authorization: `Bearer ${auth.token}`

            });
            history.push('/recipes');
            console.log(data, 'data');


        } catch (e) {

        }
    };

    return  (

        <Form className="container">
            <Form.Group widths='equal'>
                <Form.Field
                    id='form-input-control-first-name'
                    control={Input}
                    label='Title'
                    placeholder='Title'
                    name='title'
                    onChange={handlerChange}
                />
                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    label='Calories'
                    placeholder='calories'
                    type="number"
                    name='calories'
                    onChange={handlerChange}
                />
            </Form.Group>
            <Form.Field
                id='form-textarea-control-ingredients'
                control={TextArea}
                label='Ingredients'
                placeholder='ingredients'
                name='ingredients'
                onChange={handlerChange}
            />
            <Form.Field
                id='form-textarea-control-preparation'
                control={TextArea}
                label='Preparation'
                placeholder='preparation'
                name='preparation'
                onChange={handlerChange}
            />

            <Form.Field
                id='form-button-control-public'
                control={Button}
                content='Confirm'
                label='Label with htmlFor'
                onClick={handleConfirm}
            />
        </Form>

    )

};

