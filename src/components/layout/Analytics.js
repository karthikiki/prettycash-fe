import React from 'react'
import { Progress } from "antd"

const Analytics = ({allTransection}) => {
// No of Transections
const totalTransection = allTransection.length
const totalIcomeTransections = allTransection.filter(transaction => transaction.type === 'income')
const totalExpenseTransections = allTransection.filter(transaction => transaction.type === 'expense')
const totalIncomePercent = (totalIcomeTransections.length/totalTransection) * 100
const totalExpensePercent = (totalExpenseTransections.length/ totalTransection) * 100


// Total Income and expense

const totalTurnover = allTransection.reduce((acc, transaction)=> acc + transaction.amount, 0)
const totalIncomeTurnover = allTransection.filter((transaction)=> transaction.type === "income").reduce((acc, transaction)=> acc + transaction.amount, 0)
const totalExpenseTurnover = allTransection.filter((transaction) => transaction.type === 'expense').reduce((acc, transaction)=> acc + transaction.amount, 0)
const totalIncomeTurnoverPercent = (totalIncomeTurnover/ totalTurnover) * 100
const totalExpenseTurnoverPercent = (totalExpenseTurnover/ totalTurnover) * 100

  return (
    <>
      <div className='row m-3 analysis'>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              Total Transactions : {totalTransection}
            </div>
            <div>
              <h5 className='text-sucess'>Income : {totalIcomeTransections.length}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTransections.length}</h5>
            </div>
            <div>
            <Progress 
            type="circle"
            strokeColor={"green"}
            className='mx-2'
            percent={totalIncomePercent.toFixed(0)}
            />
            <Progress 
            type="circle"
            strokeColor={"red"}
            className='mx-2'
            percent={totalExpensePercent.toFixed(0)}
            />
            </div>
            
          </div>
        </div>
        <div className='col-md-3'>
          <div className='card'>
            <div className='card-header'>
              Total Turnover : {totalTurnover}
            </div>
            <div>
              <h5 className='text-sucess'>Income : {totalIncomeTurnover}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTurnover}</h5>
            </div>
            <div>
            <Progress 
            type="circle"
            strokeColor={"green"}
            className='mx-2'
            percent={totalIncomeTurnoverPercent.toFixed(0)}
            />
            <Progress 
            type="circle"
            strokeColor={"red"}
            className='mx-2'
            percent={totalExpenseTurnoverPercent.toFixed(0)}
            />
            </div>
            
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Analytics