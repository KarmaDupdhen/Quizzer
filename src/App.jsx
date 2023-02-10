import Menu from "./components/menu"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Question from "./components/question"
import "./App.css"
import he from "he"

function App() {
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [questions, setQuestions] = useState([])
  const [correct, setCorrect] = useState(0)
  const [checked, setChecked] = useState(false)


  //for shuffling the answers
  let a = [1, 2, 3, 4, 5]
  const shufflearr = (arr) => arr.sort(() => Math.random() - 0.5)

  //function for getting the question from api and setting it inside questions
  useEffect(() => {
    async function getQuestions() {
      const q = []
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()
     
     data.results.forEach(question => {
        q.push({ id: nanoid(), question: question.question, correct: question.correct_answer, answers: shufflearr([...question.incorrect_answers, question.correct_answer]), selected: null, checked: false })
      })
      setQuestions(q)
    }
    getQuestions()
  }
    , [count])

//function to check the answers 
  function handleCheck() {
    let selected = true
    questions.forEach(question => {
      if (question.selected === null) {
        selected = false
        return
      }
    })
    if (!selected) {
      return
    }
    setQuestions(questions => questions.map(question => {
      return ({ ...question, checked: true })
    }))
    setChecked(true)
    let correct = 0
    questions.forEach(question => {
      if (question.correct === question.selected) {
        correct += 1
      }
    })
    setCorrect(correct)
  }

  function handleClickAnswer(id, answer) {
    setQuestions(questions => questions.map(question => {
      return question.id === id ? { ...question, selected: answer } : question
    }))
  }

  function handlePlayAgain() {
    setCount(count => count + 1)
    setChecked(false)
  }


  //calling the question component and setting
  const questionElements = questions ? questions.map(question => {
    return (
      <Question
        key={question.id}
        q={question}
        handleClickAnswer={handleClickAnswer}
        id={question.id} />)
  }) : []


  function start() {
    setStarted(s => !s)
  }



  return (
    <div className="main-container">
     
        {started ? <div className="all-questions">
          {questionElements}

          <div className="end-div">
           
            <button onClick={checked ? handlePlayAgain : handleCheck} className="footer-btn">
              {checked ? "Play again" : "Check answer"}</button>
              {checked && <div className="end-correct">You got {correct} answers correct</div>}
          </div>
         
        </div>

          :
          <Menu
            start={start} />}
      
    </div>
  )



}

export default App
