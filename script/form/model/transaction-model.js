class TransactionModel{
  constructor(id=0,category='',desc="",amount=0.0,date='',mode='',operation=''){
    this.id=id;
    this.category=category;
    this.desc=desc;
    this.amount=amount;
    this.date=date;
    this.mode=mode;
    this.operation=operation;
    this.ismarkedDeleted=false;
  }
}
export default TransactionModel;