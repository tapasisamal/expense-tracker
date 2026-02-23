import { createContext, useContext } from "react";

export const ExpenseContext = createContext ({

    expenses : [],

    addExpense : (expenseData) => {},
    updateExpense : (id, expenseData) => {},
    deleteExpense : (id) => {},
})

export const useExpense = () => {
    return useContext(ExpenseContext)
}

export const ExpenseProvider = ExpenseContext.Provider