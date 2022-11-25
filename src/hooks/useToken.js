import { useEffect } from "react";
import { useState } from "react"

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                setToken(data.token);
            })
        }
    }, [email])
    return token;
}

export default useToken;