import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [ conversations, setConversations ] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                // const res = await fetch("http://localhost:5000/api/users")

                const token = localStorage.getItem('token');
                const res = await fetch("http://localhost:5000/api/users", {
                    method: 'POST', // or 'PUT', 'PATCH', etc. depending on your server-side implementation
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: token })
                });


                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setConversations(data)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    }, [])

    return { loading, conversations }
}

export default useGetConversations