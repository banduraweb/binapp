import { useState, useCallback, useEffect } from "react";

const storageKey = "userData";

export const useAuthorization = () => {
    const [token, setToken] = useState(null);
    const [authFinished, setAuthFinished] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwt, id) => {
        setToken(jwt);
        setUserId(id);

        localStorage.setItem(
            storageKey,
            JSON.stringify({
                userId: id,
                token: jwt
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageKey);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageKey));

        if (data && data.token) {
            login(data.token, data.userId);
        }
        setAuthFinished(true);
    }, [login]);

    return {
        login,
        logout,
        token,
        userId,
        authFinished
    };
};
