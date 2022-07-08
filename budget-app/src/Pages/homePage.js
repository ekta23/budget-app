import React, {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import CreateExpense from '../modals/createExpense';
import Filter from './filter';
import Button from 'react-bootstrap/Button';
import moment from 'moment'
import {NotificationManager} from 'react-notifications';
import apiHelper from '../common/api.js'
// import axios from 'axios'


// import Dropdown from 'react-bootstrap/Dropdown';

// icons
import {GiShoppingBag,GiLipstick,GiMedicines} from 'react-icons/gi'
import {MdOutlineLocalGroceryStore,MdFastfood} from 'react-icons/md'
import {BsBook,BsFillHouseFill} from 'react-icons/bs'
import {FaPlaneDeparture,FaWpforms,FaCarSide} from 'react-icons/fa'
import {GoDeviceMobile} from 'react-icons/go'
import {BsBookmark} from 'react-icons/bs'
import {AiOutlineDelete} from 'react-icons/ai'

export default function HomePage() {
    const [selectedItem,setSelectedItem]=useState([]);
    const [list, setList] = useState([]);
    const [allData,setAllData]=useState([]);
    const [listId, setListId] = useState(0);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [expenseName,setExpenseName]=useState("");
    // const [expenseDate,setExpenseDate]=useState("");
    const [expenseAmount,setExpenseAmount]=useState(0);
    const [expenseCategory,setExpenseCategory]=useState("Food");
    const [selectedValue, setSelectedValue] = useState("Sort your expense by");
     const [iconSelect, setIconSelect] = useState([{
        shopping:false,
        beauty:false,
        groceries:false,
        education:false,
        transportation:false,
        housing:false,
        medicines:false,
        travel:false,
        bills:false,
        recharge:false,
        food:false
    }]);
    const iconCategoryMapping = {
        food:           <MdFastfood size="28"  style={{color:"green"}} className="center-icon"/>,
        shopping:       <GiShoppingBag size="28"  style={{color:"green"}} className="center-icon"/>,
        beauty:         <GiLipstick size="28"  style={{color:"green"}} className="center-icon"/>,
        groceries:      <MdOutlineLocalGroceryStore size="28"  style={{color:"green"}} className="center-icon"/>,
        education:      <BsBook size="28"  style={{color:"green"}} className="center-icon"/>,
        transportation: <FaCarSide size="28"  style={{color:"green"}} className="center-icon"/>,
        housing:        <BsFillHouseFill size="28"  style={{color:"green"}} className="center-icon"/>,
        medicines:      <GiMedicines size="28"  style={{color:"green"}} className="center-icon"/>,
        travel:         <FaPlaneDeparture size="28"  style={{color:"green"}} className="center-icon"/>,
        bills:          <FaWpforms size="28"  style={{color:"green"}} className="center-icon"/>,
        recharge:       <GoDeviceMobile size="28"  style={{color:"green"}} className="center-icon"/>,
    }


    // apply rules of the filter
    //  @isSelected bool - weather icon is selected or not
    //  @text - expense_name of the icon
    function displaySelectedCategory(isSelected,text){
       let temp=[...allData];
       let tempSelectedItem = [...selectedItem];
       let all=true;
        if(isSelected){
            temp=temp.filter(item=>item.expense_category.toLowerCase()===text.toLowerCase());
            for(let i=0;i<temp.length;i++){
                tempSelectedItem.push(temp[i]);
            } 
        }
        else{
            for(let i=0;i<Object.keys(iconSelect[0]).length;i++){
                if(iconSelect[0][Object.keys(iconSelect[0])[i]]){
                    all=false;
                    break;
                }
            }
            if(all){
                tempSelectedItem=[];
                setSelectedItem(tempSelectedItem);
                setList(allData);
                return;
            }
            else{
                tempSelectedItem=tempSelectedItem.filter(item=>item.expense_category.toLowerCase()!==text.toLowerCase()); 
            }  
        }
        setSelectedItem(tempSelectedItem);
        setList(tempSelectedItem);
        
            
    }


    async function getExpense() {
        let res = await apiHelper.callGetAPI("/get-expense");
        for(let i=0;i<res.length;i++){
            res[i].row_id=i;
        }
        if(res.length>0){
            setAllData(res);
            setList(res);
        }
        
    }

    // icons that are selected is set 
    function iconSelection(text){
        let temp=[...iconSelect];
        temp[0][text]=!temp[0][text];
        setIconSelect(temp);
        displaySelectedCategory(temp[0][text],text); 
    }
    

    // opening model
    function addExpense(){
        setShowExpenseModal(!showExpenseModal);
    }

    // saving into all data
    async function saveExpense(){
        if(!expenseName || !expenseAmount){
            NotificationManager.error("Please enter required fields");
            return
        }

        setListId(listId+1);
        let temp= [...list];
        let date=new Date();
        let time=new Date();
        let data ={
            row_id : listId,
            expense_name:expenseName,
            expense_category:expenseCategory,
            expense_amount:expenseAmount,
            expense_date:moment(date).format('DD-MMM-YYYY'),
            expense_time:moment(time).format('hh:mm a'),
            timestamp:new Date().toLocaleString(),

        }
        temp.push(data);

        setAllData(temp);
        setShowExpenseModal(!showExpenseModal);
        setList(temp);
        let res = await apiHelper.callPostAPI("/save-expense",data);
        if(res.status==200){
            NotificationManager.success("Expense saved")
        }
    }

    // deleting an expense
    async function deleteExpense(row_id, id){
        let temp = [...list];
        if(id){
            let res = await apiHelper.callDeleteAPI("/delete-expense/"+id);
            if(res.status==200){
                NotificationManager.success("Deleted")
            }
        }
        
        temp=temp.filter(item=> item.row_id != row_id);
        setList(temp);
    }

    // saved items will be updated in the hook api call is needed
    function onBookmarkChange(index) {
        let temp = [...list];
        temp[index]["expense_is_bookmarked"] = !temp[index]["expense_is_bookmarked"];
        setList(temp);

    }

    // sorting the items based on given argument
    function sort(text) {
        setSelectedValue(text);
        if(text!=="none"){
            let temp=[...list]
            
            if(text=="date"){
                temp.sort((a, b) => moment(a["timestamp"]).isAfter(b["timestamp"]) ? 1 : -1);
            }else{
                temp.sort((a, b) => a[text] > b[text] ? 1 : -1);
            }
            setList(temp);
        }
    }

    useEffect(() => {
        getExpense()
    }, [])
   
    return (
        <div>
           
            <Modal  backdrop="static" show={showExpenseModal} onHide={()=>{setShowExpenseModal(!showExpenseModal)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <CreateExpense 
                        setExpenseName={setExpenseName}
                        expenseName={expenseName}  
                        setExpenseAmount={setExpenseAmount} 
                        expenseAmount={expenseAmount}
                        setExpenseCategory={setExpenseCategory} 
                        expenseCategory={expenseCategory}
                        /> 
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{setShowExpenseModal(!showExpenseModal)}}>
                        Close
                    </Button>
                    <Button variant="success" onClick={saveExpense}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="page-container d-flex justify-content-center align-items-center flex-column m-2 ">

                <div className='d-flex flex-row justify-content-start mb-4'>
                    <button type="button" onClick={addExpense}  className="btn-icon btn-add my-2 ">+</button> 
                    <Filter 
                        sort={sort} 
                        selectedValue={selectedValue}
                        iconSelection={iconSelection}
                        iconSelect={iconSelect}
                        setIconSelect={setIconSelect}

                     />
                </div>  

                {list.map((item,i) =>{
                    return(
                        <div className="card mb-3 h-100 d-flex justify-content-center box-shadow" style={{width: "70%"}}>
                            <div className="card-data card-body float-start d-flex justify-content-between flex-row">
                               
                                <div className="d-flex flex-row align-self-center" style={{width:"220px"}}>
                                    <button type="button"  className="my-2 btn-circle">
                                       {/* <AiOutlineShoppingCart size="28"  style={{color:"green"}} className="center-icon"/>   */}
                                       {iconCategoryMapping[item.expense_category.toString().toLowerCase()]}
                                    </button>
                                    <div className="px-3 align-self-center text-start text-overflow">
                                        <h6 className="card-title mt-2">{item.expense_name}</h6>
                                        <div className="card-text"><small className="text-muted">{item.expense_category}</small></div> 
                                    </div> 
                                </div>
                                    <div className="card-text align-self-center text-start">{item.expense_date}</div>
                                    <div className="card-text align-self-center text-start">{item.expense_time}</div>
                                    <div className="align-self-center text-start">{item.expense_amount}$ </div>
                              
                                <div className="d-flex align-items-center ">
                                    <button 
                                        className={ item.expense_is_bookmarked ? 'btn btn-success-border mx-1 btn-success-border-selected'  : 'btn btn-success-border mx-1'}
                                        onClick={()=>onBookmarkChange(i)} 
                                    >
                                        <BsBookmark size="20"  />
                                    </button>
                                    <button 
                                        className='btn btn-danger-border mx-1' 
                                        onClick={()=>deleteExpense(item.row_id,item.expense_id)}
                                    >
                                        <AiOutlineDelete size="25"/>
                                    </button>
                                </div>
                            </div>
                        </div>   
                    )
                })}
                
            </div>
        </div>
    )
}