

// import { transactionOperation } from "../../service/form-service.js";
import { returnAllTransaction } from "../../form/controller/form-controller.js";
import isLogin from "../service/dashboard-service.js";

function init(){
  isLogin();
  allTransactions();
}

window.addEventListener('load',init);

function allTransactions(){
  let countIncome=0;
  let countExpense=0;
  const transactions=returnAllTransaction();
  transactions.forEach(obj=>{
    if(obj.category=='Salary' || obj.category=='Freelancing' ||obj.category=='Stock Market'){
      countIncome+=obj.amount;
    }else{
      countExpense+=obj.amount;
    }
  })
  document.querySelector('#income').textContent=countIncome;
  document.querySelector('#expense').textContent=countExpense;
  document.querySelector('#remain').textContent=countIncome-countExpense;
}

