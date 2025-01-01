import getCategories from "../../category/category.js";
import { transactionOperation } from "../../service/form-service.js";

function init(){
  loadTransaction();
  countTransaction();
  markedTransaction();
  unmarkedTransaction();
  bindEvents();
}
function bindEvents(){
  document.querySelector('#income').addEventListener('change',()=>getCategory('income'));
  document.querySelector('#expense').addEventListener('change',getCategory);
  document.querySelector('#add').addEventListener('click',addTransaction);
  document.querySelector('#delete').disabled=true;
  document.querySelector('#delete').addEventListener('click',deleteForever);
  document.querySelector('#update').disabled=true;
  document.querySelector('#update').addEventListener('click',updateTransaction);
  document.querySelector('#save').disabled=true;
  document.querySelector('#save').addEventListener('click',saveTransaction);
}

window.addEventListener('load',init);

//----------------------Category load dynamically--------------------
function getCategory(label){
  let category;
  const select=document.querySelector('#category');
  if(label==='income'){
    category=getCategories('income');
  }else{
    category=getCategories('expense');
  }
  select.innerHTML='';
  category.forEach(c=>{
    const optionTag=document.createElement('option');
    optionTag.innerText=c;
    select.appendChild(optionTag);
  })
}

//-------------------------Save Transaction into localstroage---------

function saveTransaction(){
  transactionOperation.save();
  alert('Successfully Updated');
  document.querySelector('#save').disabled=true;
}

//--------------------Load transaction------------------

function loadTransaction(){
  if(localStorage.data=="[]"){
    alert('Nothing to print');
  }else if(!localStorage.data){
    alert('Nothing to print');
  }else{
    const transactions=transactionOperation.load();
    printAllTransaction(transactions);  
  }
}

//---------------------------Delete Transaction----------------

function deleteForever(){
  const transaction=transactionOperation.delete();
  printAllTransaction(transaction);
  countTransaction();
  markedTransaction();
  unmarkedTransaction();
  document.querySelector("#save").disabled=false;
  deleteButtonEnabled();
}

function printAllTransaction(transactions){
  clearTable();
  transactions.forEach(trans=>printTransaction(trans));
}

function clearTable(){
  document.querySelector('#tbody').innerHTML='';
}

//------------------------Transaction Add---------------

function addTransaction(){
  let transObject={};
  transObject.id=transactionOperation.generateId();
  const fields=['category','desc','amount','date','mode'];
  fields.forEach(field=>{
    if(field=='amount'){
      transObject[field]=parseInt(document.querySelector(`#${field}`).value);
    }else{
      transObject[field]=document.querySelector(`#${field}`).value;
    }  
  })
  let transaction=transactionOperation.add(transObject);
  printTransaction(transaction);
  countTransaction();
  unmarkedTransaction();
  clearFields();
}

//-------------Fields Clear----------

function clearFields(){
  const fields=['category','desc','amount','date','mode'];
  fields.forEach(field=>{
    document.querySelector(`#${field}`).value='';
  })
}

//-------------------Add transaction into the Grid--------------------

function printTransaction(transaction){
  const tbody=document.querySelector('#tbody');
  const tr=tbody.insertRow();
  for(let key in transaction){
    if(key=='ismarkedDeleted'){
      continue;
    } 
    const td=tr.insertCell();
    if(key=='amount'){
      td.innerText=transaction[key].toLocaleString('hi');
    }else if(key=='mode'){
      td.innerText=modes()[transaction[key]];
    }else if(key=='operation'){
      td.appendChild(createIcon('fa-solid fa-trash me-4',transaction.id,toggleMarkedDeleted))
      td.appendChild(createIcon('fa-solid fa-pen-to-square',transaction.id,editTransaction))
    }else{
      td.innerText=transaction[key];
    }    
  }
  document.querySelector('#save').disabled=false;
}


const modes=()=>['','Cash','Paytm','Phonepe','GPay','Debit','Credit']

//-----------------------Marked transaction---------------

function toggleMarkedDeleted(events){
  const id=this.getAttribute('transaction-id');
  transactionOperation.toggleMark(id);
  events.target.parentNode.parentNode.classList.toggle('table-danger');
  markedTransaction();
  unmarkedTransaction();
  deleteButtonEnabled();
}

function deleteButtonEnabled(){
  document.querySelector('#delete').disabled=transactionOperation.deleteEnabled()==0;
}

//---------------------Transaction Edit--------------

let editTransactionObj;
function editTransaction(){
  const id=this.getAttribute('transaction-id');
  editTransactionObj=transactionOperation.search(id);
  const fields=['category','desc','amount','date','mode'];
  fields.forEach(field=>{
    document.querySelector(`#${field}`).value=editTransactionObj[field];
  })
  document.querySelector('#update').disabled=false;
}

//------------------------Update transaction------------

function updateTransaction(){
  const fields=['category','desc','amount','date','mode'];
  fields.forEach(field=>{
    if(field=='amount'){
      editTransactionObj[field]= parseInt(document.querySelector(`#${field}`).value);
    }else{
      editTransactionObj[field]= document.querySelector(`#${field}`).value;
    }
  })
  printAllTransaction(transactionOperation.transactions);
  clearFields();
  document.querySelector('#update').disabled=true;
  document.querySelector('#save').disabled=false;
}

//-----------------------Icon create--------------------------

function createIcon(className,id,fn){
  const icon=document.createElement('i');
  icon.className=className;
  icon.setAttribute("transaction-id",id);
  icon.addEventListener('click',fn);
  return icon;
}

//----------------------Count marked,unmarked,total transaction----------------

function countTransaction(){
  let res=transactionOperation.countTrans();
  document.querySelector('#total-trans').innerText=res;
}

function markedTransaction(){
  let res=transactionOperation.markedTrans();
  document.querySelector('#marked-trans').innerText=res;
}

function unmarkedTransaction(){
  let res=transactionOperation.unmarkedTrans();
  document.querySelector('#unmarked-trans').innerText=res;
}


export function returnAllTransaction(){
  const trans=transactionOperation.allTransaction();
  return trans;
}

// export default returnAllTransaction;
