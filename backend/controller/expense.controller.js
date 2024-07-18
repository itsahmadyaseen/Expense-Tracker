import Expense from "../models/expense.model.js";

export const createExpense = async (req, res) => {
  const { description, amount, date } = req.body;

  console.log('id ', req.user.id);
  try {

    if (!req.user || !req.user.id) {
        return res.status(400).send('User information is missing');
    }

    const newExpense = new Expense({
      user: req.user.id,
      description: description,
      amount: amount,
      date: date || Date.now(),
    });
    const expense = await newExpense.save();
    console.log("Expense created");
    res.json(expense);
  } catch (error) {
    console.log("Unable to create expense", error);
    res.json(error);
  }
};  

export const getExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({user:userId}).sort({date:-1});
        console.log(expenses);
        return res.status(200).json(expenses)
    } catch (error) {
        console.log('Unable to get expenses');
        return res.status(200).json({message:'Unable to get expenses'})
    }
}

export const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const deleteExpense = await Expense.findByIdAndDelete(expenseId);
        if(!deleteExpense){
            console.log('Deletion failed');
            return res.status(400).json('Deletion failed')
        }
        return res.status(200).json({message:"Expense Deleted"})
    } catch (error) {
        console.log('Unable to delete expense', error);
        return res.status(200).json({message:'Unable to delete expense'})
    }
}

export const updateExpense = async (req, res) => {
  try {
    const {id} = req.params;
    const {description, amount, date} = req.body;
    const response = await Expense.findByIdAndUpdate(id, {
      description:description,
      amount:amount,
      date:date,
    })
  
    console.log('User updated ', response);
    return res.status(200).json(response);
  } catch (error) {
    console.log('User updation failed ', error);
    return res.status(400).json({error});
  }
}

 
export const getExpenseById = async (req,res) => {
  try {
    console.log('inside get expense');
    const id = req.params.id;
    console.log(id);
    const getExpense = await Expense.findById(id);
    if(!getExpense){
      console.log('User fetch failed ', getExpense);
      return res.status(404).json({message:'Expense fetch failed'});
    }
    console.log('Expense fetched', getExpense);
    return res.status(200).json(getExpense);
    
  } catch (error) {
    console.log('Expense fetch failed ', error);
      return res.status(500).json(error.message);
    }

}
