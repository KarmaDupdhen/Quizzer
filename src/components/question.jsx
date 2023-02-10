import { nanoid } from "nanoid";
import he from "he"

export default function Question(props){

let answers=props.q.answers


let answerElements=answers.map(answer=>{
    let id=null
    if(props.q.checked){
        if(props.q.correct == answer){
            id='correct'
        }
        else if(props.q.selected=== answer){
            id='incorrect'
        }
        else{
            id='notselected'
        }
    }

    function handleClick(){
        if(props.q.checked){
            return
        }
        props.handleClickAnswer(props.id,answer)
    }
   return (
    <button key={nanoid()} id={id} className={props.q.selected===answer? "answer selected":"answer"} onClick={()=>handleClick(answer)}>{he.decode(answer)}</button>
   )
})
    return (
        <div className="question-container">
            <h3 className="question-heading">{he.decode(props.q.question)}</h3>
            {answerElements}
            
            <div className="line"></div>
        </div>
    )
}