import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
  {
    id:'1',
    title:'Aaaaaaaaaaaa',
    amount:234,
    date:new Date(2021,1,1),
    project:'A'
  },
  {
    id:'2',
    title:'B',
    amount:234,
    date:new Date(2021,1,2),
    project:'B'
  },
  {
    id:'3',
    title:'C',
    amount:234,
    date:new Date(2021,1,3),
    project:'C'
  },
  {
    id:'4',
    title:'D',
    amount:234,
    date:new Date(2021,1,4),
    project:'D'
  }
]

function App() {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = expense => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses]
    });
  }
  return(
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses}/>
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
