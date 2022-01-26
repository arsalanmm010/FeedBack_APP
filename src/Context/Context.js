import {v4 as uuidv4 } from 'uuid'
import { createContext, useState } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
    {
        id : 1,
        text : 'This is from context',
        rating : 10,        
    }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item : {},
        edit : false,
    })

    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit : true,
        })
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    const deleteFeedback = (id) => {
        if(window.confirm("Are you sure?"))
        {
            setFeedback(feedback.filter( (item) => (item.id !== id) ))
        }
     }

     const updateFeedback = (id, updItm) => {
        setFeedback(
            feedback.map((item) => (item.id === id ? {...item, ...updItm} : item))
        )
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,   
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext