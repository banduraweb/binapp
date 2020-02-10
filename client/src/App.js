import React from "react";
import { HashRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { useRoutes } from "./hooks/routes";
import { useAuthorization } from "./hooks/authorization";
import { AuthContext } from "./context/AuthContext";
import { Header } from "./components/Header";
import { Preloader } from "./components/Preloader";

function App() {
    const { login, logout, token, userId, authFinished } = useAuthorization();
    const isAuthUser = Boolean(token);

    const routes = useRoutes(isAuthUser);

    if (!authFinished) {
        return <Preloader />;
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                token,
                userId,
                isAuthUser
            }}
        >
            <HashRouter>
                {isAuthUser && <Header />}
                <div className="container">{routes}</div>
            </HashRouter>
        </AuthContext.Provider>
    );
}

export default App;
