import React from 'react'

import {GiShoppingBag,GiLipstick,GiMedicines} from 'react-icons/gi'
import {MdOutlineLocalGroceryStore,MdFastfood} from 'react-icons/md'
import {BsBook,BsFillHouseFill} from 'react-icons/bs'
import {FaPlaneDeparture,FaWpforms,FaCarSide} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown';
import {GoDeviceMobile} from 'react-icons/go'



export default function Filter({
    sort,
    selectedValue,
    iconSelection,
    iconSelect,
    setIconSelect
}) {

   
    
    return (
        
        <div className="d-flex flex-row my-2">
            <button className="btn-icon" onClick={()=>iconSelection("shopping")} style={iconSelect[0]["shopping"]?{backgroundColor:"#09663a"}:{}} > <GiShoppingBag size="25" className="icons-sort" style={iconSelect[0]["shopping"]?{color:"white"}:{}} /></button>
            <button className="btn-icon" onClick={()=>iconSelection("beauty")}style={iconSelect[0]["beauty"]?{backgroundColor:"#09663a"}:{}}><GiLipstick size="25" className="icons-sort" style={iconSelect[0]["beauty"]?{color:"white"}:{}}  /></button>
            <button className="btn-icon" onClick={()=>iconSelection("groceries")}style={iconSelect[0]["groceries"]?{backgroundColor:"#09663a"}:{}}><MdOutlineLocalGroceryStore size="25" style={iconSelect[0]["groceries"]?{color:"white"}:{}}className="icons-sort"  /></button>
            <button className="btn-icon" onClick={()=>iconSelection("education")}style={iconSelect[0]["education"]?{backgroundColor:"#09663a"}:{}}><BsBook size="25" className="icons-sort"  style={iconSelect[0]["education"]?{color:"white"}:{}} /></button>
            <button className="btn-icon" onClick={()=>iconSelection("transportation")}style={iconSelect[0]["transportation"]?{backgroundColor:"#09663a"}:{}}><FaCarSide size="25" className="icons-sort" style={iconSelect[0]["transportation"]?{color:"white"}:{}} /></button>
            <button className="btn-icon" onClick={()=>iconSelection("housing")}style={iconSelect[0]["housing"]?{backgroundColor:"#09663a"}:{}}><BsFillHouseFill size="25" className="icons-sort" style={iconSelect[0]["housing"]?{color:"white"}:{}} /></button>
            <button className="btn-icon" onClick={()=>iconSelection("medicines")}style={iconSelect[0]["medicines"]?{backgroundColor:"#09663a"}:{}}><GiMedicines size="25" className="icons-sort" style={iconSelect[0]["medicines"]?{color:"white"}:{}} /></button>
            <button className="btn-icon" onClick={()=>iconSelection("travel")} style={iconSelect[0]["travel"]?{backgroundColor:"#09663a"}:{}}><FaPlaneDeparture size="25" className="icons-sort" style={iconSelect[0]["travel"]?{color:"white"}:{}}  /></button>
            <button className="btn-icon" onClick={()=>iconSelection("bills")}style={iconSelect[0]["bills"]?{backgroundColor:"#09663a"}:{}}><FaWpforms size="25" className="icons-sort"  style={iconSelect[0]["bills"]?{color:"white"}:{}}/></button>
            <button className="btn-icon" onClick={()=>iconSelection("recharge")} style={iconSelect[0]["recharge"]?{backgroundColor:"#09663a"}:{}}><GoDeviceMobile size="25" style={iconSelect[0]["recharge"]?{color:"white"}:{}}className="icons-sort" /></button>
            <button className="btn-icon" onClick={()=>iconSelection("food")}style={iconSelect[0]["food"]?{backgroundColor:"#09663a"}:{}}><MdFastfood size="25" className="icons-sort"  style={iconSelect[0]["food"]?{color:"white"}:{}}/></button>
            {/* <button className="btn-icon"><BsCreditCard2Back size="25" className="icons-sort"/></button> */}

            <Dropdown onSelect={(event)=>sort(event)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                   {selectedValue}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item eventKey="none">None</Dropdown.Item>
                    <Dropdown.Item eventKey="name" >Name</Dropdown.Item>
                    <Dropdown.Item eventKey="category" >Category</Dropdown.Item>
                    <Dropdown.Item eventKey="money">Amount</Dropdown.Item>
                    <Dropdown.Item eventKey="date">Date</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>           
        </div>
    )
}
