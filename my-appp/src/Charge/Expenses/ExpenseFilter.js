import React from 'react';

import './ExpenseFilter.css';

const ExpensesFilter = (props) => {
    const dropdownChangeHandler = event => {
        // 這裡要用onFilterChange 而不是filterChangeHandler 因為雖然我們的目的是要執行filterChangeHandler沒錯
        // 但是我們並沒用props傳過來 而是利用onFilterChange這個屬性來呼叫filterChangeHandler
        // 所以真正傳過來的東西是onFilterChange
        props.onChangeFilter(event.target.value);
    }
    return (
        <div className='expenses-filter'>
        <div className='expenses-filter__control'>
            <label>Filter by project</label>
            {/* <select value={props.selected} onChange={dropdownChangeHandler}>
                <option value='2024'>2024</option>
                <option value='2023'>2023</option>
                <option value='2022'>2022</option>
                <option value='2021'>2021</option>
            </select> */}
            <select value={props.selected} onChange={dropdownChangeHandler}>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
            </select>
        </div>
        </div>
    );
};

export default ExpensesFilter;