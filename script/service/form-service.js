import TransactionModel from "../form/model/transaction-model.js"

export const transactionOperation={
  transactions:[],

  add(obj){
    let transaction=new TransactionModel();
    for(let key in obj){
      transaction[key]=obj[key];
    }
    this.transactions.push(transaction);
    return transaction;
  },

  delete(){
    return this.transactions=this.transactions.filter((trans)=>trans.ismarkedDeleted==false);
  },

  load(){
    const objArray=JSON.parse(localStorage.data);
    objArray.map(obj=>{
      const transaction=new TransactionModel();
      transaction.amount=obj.amount;
      transaction.category=obj.category;
      transaction.date=obj.date;
      transaction.desc=obj.desc;
      transaction.id=obj.id;
      transaction.ismarkedDeleted=obj.ismarkedDeleted;
      transaction.mode=obj.mode;
      transaction.operation=obj.operation;

      this.transactions.push(transaction);
      // console.log(obj);
    })
    return(this.transactions);
  },

  save(){
    const objArray=JSON.stringify(this.transactions);
    localStorage.data=objArray;
  },

  search(id){
    return this.transactions.find((trans)=>trans.id==id);
  },

  toggleMark(id){
    let obj=this.search(id);
    obj.ismarkedDeleted=!obj.ismarkedDeleted;
  },

  countTrans(){
    return this.transactions.length;
  },

  markedTrans(){
    return this.transactions.filter((trans)=>trans.ismarkedDeleted==true).length;
  },

  unmarkedTrans(){
    return this.countTrans()-this.markedTrans();
  },

  deleteEnabled(){
    return this.markedTrans();
  },

  generateId(){
    // const id=this.transactions[this.transactions.length-1].id;
    if(this.transactions.length==0){
      return 1;
    }else{
      return((this.transactions[this.transactions.length-1].id)+1)
    }  
    // return((this.transactions[this.transactions.length-1].id)+1);
  },

  allTransaction(){
    return this.transactions;
  }
}