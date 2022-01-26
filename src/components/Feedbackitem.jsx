import { FaTimes, FaEdit } from 'react-icons/fa'
import Card from './Shared/Card'
import {useContext} from 'react'
import Context from '../Context/Context'

function Feedbackitem( {item} ) {
  const {deleteFeedback, editFeedback} = useContext(Context)

  return <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => deleteFeedback(item.id)}><FaTimes color='purple'/></button>
      <button className="edit" onClick={() => editFeedback(item)}><FaEdit color='purple'/></button>
      <div className="text-display">{item.text}</div>
  </Card>
}

export default Feedbackitem