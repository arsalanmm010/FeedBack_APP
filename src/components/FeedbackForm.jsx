import Card from "./Shared/Card";
import Button from "./Shared/Button";
import Rating from "./Rating";
import {useState, useEffect} from 'react'
import {useContext} from 'react'
import Context from '../Context/Context'

function FeedbackForm() {
    const [text, setText] = useState('')
    const [disabled, setdisabled] = useState(true)
    const [rating, setRating] = useState(10)
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(Context)

    useEffect(() => {
        if(feedbackEdit.edit === true) {
            setdisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if(text === '') {
            setdisabled(true)
            setMessage(null)
        } else if(text !== '' && text.trim().length <= 10) {
            setdisabled(true)
            setMessage('You need to write at least 10 characters')
        } else {
            setdisabled(false)
            setMessage(null)
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10) {
            const newFeedback = {
            text,
            rating,
            }
            if(feedbackEdit.edit === true) {
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
            addFeedback(newFeedback)
            }
            setText('')
        }
    }

  return <Card>
      <form onSubmit={handleSubmit}>
      <h2>How would you rate your service with us?</h2>
      <Rating select={(rating) => setRating(rating)}/>
        <div className="input-group">
            <input 
                onChange={handleTextChange} 
                type="text"
                placeholder="Write a review" 
                value={text}/>
            <Button type="submit" isDisabled={disabled}>Send</Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
  </Card>;
}

export default FeedbackForm;

