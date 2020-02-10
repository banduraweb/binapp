import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const handlerLogOut = e => {
        e.preventDefault();
        auth.logout();
        history.push("/");
    };

    return (
        <Menu className="container">
            <Menu.Item header>
                <img style={{ width: "60px" }} src="./img/10250.jpg" alt="" />
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/create">Create</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/recipes">My recipes</NavLink>
            </Menu.Item>
            <Menu.Item position="right">
                <a href="/" onClick={handlerLogOut}>
                    {" "}
                    Log out
                </a>
            </Menu.Item>
        </Menu>
    );
};
