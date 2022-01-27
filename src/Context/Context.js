import {v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [isLoading, setisLoading] = useState(true)

    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item : {},
        edit : false,
    })

    useEffect(() => {
        fetchfeedback()
    }, [])

    const fetchfeedback = async () => {
        const response = await fetch("/feedback?sort=id&_order=desc")

        const data = await response.json()

        setFeedback(data)
        setisLoading(false)
    }
 
    

    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFeedback),
       })

        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedback = async (id) => {
        if(window.confirm("Are you sure?")) {
            await fetch(`/feedback/${id}`, {method:'DELETE'})

            setFeedback(feedback.filter( (item) => (item.id !== id) ))
        }
     }

     const updateFeedback = async (id, updItm) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers : {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updItm)
        })

        const data = await response.json()

        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...data} : item))
        )
    }

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit : true,
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit, 
        isLoading,  
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext