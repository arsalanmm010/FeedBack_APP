import {motion, AnimatePresence} from 'framer-motion'
import Feedbackitem from "./Feedbackitem";
import {useContext} from 'react'
import Context from '../Context/Context'

function Feedbacklist() {
    const {feedback} = useContext(Context)

    if(!feedback || feedback.length === 0){
        return <div>List empty</div>
    }
  return (
  <div className="feedback-list">
      <AnimatePresence>
      {feedback.map((item) => (
          <motion.div
          key={item.id}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          >
          <Feedbackitem key={item.id} item={item} />
          </motion.div>
      )) }
      </AnimatePresence>
  </div>);

// return (
//     <div className="feedback-list">
//         {feedback.map((item) => (
//             <Feedbackitem key={item.id} item={item} handleDelete={handleDelete}></Feedbackitem>
//         )) }
//     </div>);
}

export default Feedbacklist;
