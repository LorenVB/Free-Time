import { useState } from 'react';
import './App.css';


function App() {
  const [number1, setNumber1] = useState("");
  const [operand, setOperand] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState(0)

  const buttons = ['AC', 'DEL', '/', '7', '8', '9', '*', '4', '5', '6', '+', '1', '2', '3', '-', '.', '0', '='];

  const buttonNotNumbers = () => buttons.filter(but => isNaN(but))

  const handleClickValue = (value) => {
    if (operand === "") {
      setNumber1(number1 + value)
    } else {
      setNumber2(number2 + value);
    }
  }

  const handleClickOperand = (value) => {
    switch (value) {
      case 'AC':
        setNumber1("");
        setNumber2("");
        setOperand("");
        setResult("");
        break;
      case 'DEL':
        setNumber1((n1) => n1.slice(0, -1))
        setNumber2((n2) => n2.slice(0, -1))
        break;
      default:
        setOperand(value);
    }
  }

    const handleClickResult = () => {
      switch (operand) {
        case '+':
          setResult(Number(number1) + Number(number2))
          break;
        case '-':
          setResult(Number(number1) - Number(number2))
          break;
        case '*':
          setResult(Number(number1) * Number(number2))
          break;
        case '/':
          setResult(Number(number1) / Number(number2))
          break;
        case 'DEL':
          setNumber1((n1) => n1.slice(0, -1))
          setNumber2((n2) => n2.slice(0, -1))
          break;
        default:
          return new Error('Please insert a valid number')
      }
    }

    return (
      <div className="App">
        <h1 className='title'>My Calculator</h1>
        <div className='calculator-grid'>
          <div className='output'>
            <div className='previous-operand'>{result ? (operand ? number1 + operand + number2 : "") : (operand ? number1 + operand : "")}</div>
            <div className='current-operand'>{result ? result : (!operand ? number1 : number2)}</div>
          </div>
          {
            buttons.map(but => {
              const classStyle = (but === 'AC' || but === '=' ? 'expanded' : 'not-expanded')
              const functionClick = (buttonNotNumbers().includes(but) ?
                (but === "=" ? () => handleClickResult() : () => handleClickOperand(but)) :
                () => handleClickValue(but))

              return <button key={but} onClick={functionClick} className={classStyle}>{but}</button>
            })
          }
        </div>
      </div>
    );
  }

  export default App;
