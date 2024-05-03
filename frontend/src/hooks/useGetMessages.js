import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import useConversation from '../zustand/useConversation'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/messages/${selectedConversation._id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({  token })
                })

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setMessages(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if(selectedConversation._id) getMessages()
    }, [selectedConversation._id, setMessages])
    return { messages, loading }
}

export default useGetMessages