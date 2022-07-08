import React, {useState} from 'react'
import {NotificationManager} from 'react-notifications';



const CreateExpense = ({
  setExpenseName, 
  setExpenseAmount, 
  setExpenseCategory,
  expenseName, 
  expenseCategory,
  expenseAmount
}) => {

  const [categories, setCategories] = useState([
    "Beauty",
    "Bills",
    "Education",
    "Food",
    "Groceries",
    "Housing",
    "Medicines",
    "Recharge",
    "Shopping",
    "Transportation",
"Travel"
  ])
 
  const expenseValidation=(text,name)=>{
    if(!text){
      NotificationManager.error(`Please Enter ${name}`); 
      return false;
    }
  }
  const onChangeHandler=(event)=>{

    if(event.target.name==="expenseName"){
      setExpenseName(event.target.value);
    } else if(event.target.name==="expenseAmount"){
      setExpenseAmount(event.target.value);
    } else if(event.target.name==="expenseCategory"){
      setExpenseCategory(event.target.value);
    }
    
  }
  
    return (
      <>
        <form>
          <div className="form-group">
            <label for="exampleFormControlInput1">Expense Name</label>
            <input name="expenseName"  type="text" onChange={(event)=>onChangeHandler(event)} onBlur={()=>expenseValidation(expenseName,"expense name")} className="form-control my-2" id="inputExpenseName" placeholder="enter expense name"/>
          </div>

          <div className="form-group">
            <label for="exampleFormControlInput1">Amount</label>
            <input type="number" className="form-control my-2" name="expenseAmount" onBlur={()=>expenseValidation(expenseAmount,"expense amount")} onChange={(event)=>onChangeHandler(event)} id="inputExpenseAmount" placeholder="enter your expense"/>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect1" id="inputCategory">Select Category</label>
            <select value={expenseCategory} className="form-control my-2" id="inputCategoryMain" name="expenseCategory" onChange={(event)=>onChangeHandler(event)}>
              {categories.map(item=>{
                return(
                  <option>{item}</option>
                )
              })}
            </select>
          </div>
        </form>
      </>
    )
}

export default CreateExpense