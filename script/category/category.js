function getCategories(type){
  const categories={
    'income':['Salary','Freelancing','Stock Market'],
    'expense':['Shopping','Grocerry & Vegetable','Movies','Travelling','Donate','Rent']
  }
  return categories[type];
}
export default getCategories;