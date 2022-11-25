import { useEffect } from "react";
import { useState } from "react"

const useAdminChecker = email => {
    const [adminLoading, setAdminLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.isAdmin);
                setIsAdmin(data.isAdmin)
                setAdminLoading(false);
            })
        }
    }, [email])
    return [isAdmin,adminLoading];
}

export default useAdminChecker;