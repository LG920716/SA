import { useState } from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
    const  [isEditing, setIsEditing] = useState(false);

    const isEditingHandler = () => {
        setIsEditing(true)
    }
    const stopEditingHandler = () => {
        setIsEditing(false);
    }
    const saveExpenseDataHandler = (enterExpenseDate) => {
        const expenseData = {
            ...enterExpenseDate,
            id:Math.random().toString()
        }
        props.onAddExpense(expenseData);
        setIsEditing(false);
    }
    return (
        <div className="new-expense">
            {!isEditing && <button onClick={isEditingHandler}>Add New Expense</button>}
            {isEditing && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onStopEditing={stopEditingHandler}/>}
        </div>
    );
}

export default NewExpense;