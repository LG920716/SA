import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

export default function ExpenseItem(props) {
    const updateExpenseHandler = () => {
        
    };
    const deleteExpenseHandler = () => {
        
    };
    return (
        <li>
            <Card className='expense-item'>
                <ExpenseDate date={props.date} />
                <div className='expense-item__description'>
                    <h2>{props.name}</h2>
                    <div className='expense-item__price'>${props.amount}</div>
                    <button type='button' onClick={updateExpenseHandler}>update</button>
                    <button type='button' onClick={deleteExpenseHandler}>delete</button>
                </div>
            </Card>
        </li>
    );
}