import React, {useState, useContext} from 'react';
import {Button, Form, Grid, Header, Image, Segment, Message} from 'semantic-ui-react'
import {useHttp} from "../hooks/http";
import {AuthContext} from "../context/AuthContext";

export const Auth = () => {
   const auth = useContext(AuthContext);
    const {loading, request, error, clearError} = useHttp();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isRegistered, setRegistered] = useState(null);


    const handlerChange =(event)=>{
        setFormData({...formData, [event.target.name]: event.target.value})
    };

    const handleRegister = async () => {
        try {

            const data = await request('http://localhost:8081/auth/registration', 'POST', {...formData});
            console.log(data.message, 'data');
            setRegistered(data.message)

        } catch (e) {

        }
    };


    const handleLogin = async () => {
        try {

            const data = await request('http://localhost:8081/auth/login', 'POST', {...formData});
            console.log(data, 'data');
            auth.login(data.token, data.userId);
           // setRegistered(null)

        } catch (e) {

        }
    };

    console.log(error,'error');
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
                                onFocus={clearError}
                                error={error && error.includes('email') ? {
                                    content: 'not valid email',
                                    pointing: 'left'
                                } : null}
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name='password'
                                onChange={handlerChange}
                                onFocus={clearError}
                                error={error && error.includes('password') ? {
                                    content: 'not valid password',
                                    pointing: 'left'
                                } : null}/>

                            <Button
                                color='teal'
                                fluid
                                size='large'
                                style={{margin: '5px 0'}}
                                disabled={loading || !!error}
                                onClick={handleLogin}
                            >

                                Login
                            </Button>
                            <Button
                                color='teal'
                                fluid
                                size='large'
                                disabled={loading || !!error}
                                onClick={handleRegister}
                            >
                                Register

                            </Button>
                        </Segment>
                    </Form>
                    {error &&
                    <Message style={{background: '#fff6f6', color: '#9f3a38'}}>
                        {error}
                    </Message>
                    }
                    {isRegistered &&
                    <Message style={{background: '#fff', color: '#00b5ad'}}>
                        {isRegistered}
                    </Message>
                    }

                </Grid.Column>
            </Grid>
        </div>
    )
};