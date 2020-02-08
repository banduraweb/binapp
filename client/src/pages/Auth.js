import React, {useState} from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

export const Auth = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handlerChange =(event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    };



    return(
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='./img/10250.jpg' /> Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                name='email'
                                onChange={handlerChange}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={handlerChange}
                            />

                            <Button color='teal' fluid size='large' style={{ margin: '5px 0' }}>
                                Login
                            </Button>
                            <Button color='teal' fluid size='large'>
                                Register
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
};