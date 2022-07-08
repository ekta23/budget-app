import React, {useState,useEffect} from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d'
import apiHelper from '../common/api.js'
highcharts3d(Highcharts);


const AnalyticsPage = () => {
  const [categories, setCategories] = useState([]);
  const [weekwise,setWeekwise]=useState([]);
  const [monthwise,setMonthwise]=useState([]);
  const [yearwise,setYearwise]=useState([]);
  const [total, setTotal] = useState({
    totalExpense:[],
    monthlyExpense:[],
    yearlyExpense:[]
  });
  
  const colors = [
    "#77DD77",
    "#2692bb",
    "#AADEA7",
    "#d45087",
    "#FFC154",
    "#47B39C",
    "#a05195",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
    "#de425b",
    "#488f31",
    "#EC6B56"
  ]

    const options = (title, type, data, name)=> {
      return {
      chart:{
        height: "350px",
        type: type,
        options3d:type=='pie'? {
          enabled: true,
          alpha: 45,
          beta: 0
        }:{}
      },
      colors:colors,
      xAxis:{
        categories:data.map(item=>item.name),
        // gridLineWidth:0,
      },
      yAxis:{
        gridLineWidth:0,
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        },
        series:{
        color:colors[Math.floor(Math.random()*12)],
        }
      },
      
      title: {
        text: title,
      },
      series: [{
        name: name,
        type: type,
        data: data
    }]
  }

}


  async function getCategories() {
      let res =await apiHelper.callGetAPI("/get-categories");

      if(res){
        setCategories(res)
      }
  }
  async function getWeekwiseData() {
      let res =await  apiHelper.callGetAPI("/get-weekwise");

      if(res){
        setWeekwise(res);
      }
  }

  async function getMonthwiseData() {
    let res =await  apiHelper.callGetAPI("/get-monthwise");

    if(res){
      setMonthwise(res);
    }
  }

  async function getYearwiseData() {
    let res =await  apiHelper.callGetAPI("/get-yearwise");

    if(res){
      setYearwise(res);
    }
  }

  async function getTotal() {
    let res =await apiHelper.callGetAPI("/get-total");

    if(res){
      setTotal(res)
    }
  }


  useEffect(() => {
    getCategories()
    getWeekwiseData()
    getYearwiseData()
    getMonthwiseData()
    getTotal();
    
  }, [])

  

    return (
        <div className="d-grid w-100">
            <div className='row '>
              <div className='expenseInfo col-sm-3' id="totalExpDiv">
                <p>Total Expense</p>
                <p id="totalExp">{total?.totalExpense[0]?.amount  }</p>

              </div>
              <div className='expenseInfo col-sm-3' id="monthlyExpDiv">
                <p>Monthly Expense</p>
                <p id="monthlyExp">{total?.monthlyExpense[0]?.amount  }</p>

              </div>

              <div className='expenseInfo col-sm-3' id="yearlyExpDiv">
                <p>Yearly Expense</p>
                <p id="yearlyExp">{total?.yearlyExpense[0]?.amount  }</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-5 register-block'>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options("Categories", "pie", categories)}
                />
              </div>
              <div className='col-md-5 register-block '>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options("Weekwise Data", "column", weekwise, "weekly expenditure")}
                />
              </div>
            </div>

            <div className='row'>
              <div className='col-11 register-block '>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options("Monthwise Data", "line", monthwise, "monthly expenditure")}
                />

              </div>
            </div>
              
            <div className='row'>
              <div className='col-11 register-block'>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options("Yearwise Data", "column", yearwise, "yearly expenditure")}
                />
              </div>
            </div>
            
        </div>
    )
}

export default AnalyticsPage;
