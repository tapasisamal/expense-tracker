import { useState, useEffect } from "react";
import { ExpenseProvider } from "./contexts/context";
import {ExpenseForm} from "./components/ExpenseForm";
import {ExpenseItem} from "./components/ExpenseItem"

function App() {

    const [expenses, setExpenses] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(("All"))

    const addExpense = (expenseData) => {
        setExpenses((prev) => [{ id: Date.now(), ...expenseData }, ...prev])
    }
    
    const updateExpense = (id, updatedData) => {
        setExpenses((prev) => prev.map((item) => item.id === id ? { ...item, ...updatedData }
        : item))
    }

    const deleteExpense = (id) => {
        setExpenses((prev) => prev.filter((item) => item.id !== id))
    }

    const categories = [
        "All",
        ...new Set(expenses.map((e) => (e.category)).filter(Boolean))
    ]

    const filteredExpenses = selectedCategory === "All" ?
        expenses : expenses.filter((item) => item.category === selectedCategory)


    const totalExpense = filteredExpenses.reduce((total, item) => {
        return total + Number(item.amount)
    }, 0)    


    useEffect(() => {
       const stored = JSON.parse(localStorage.getItem("expenses")) || []

        if(stored && stored.length >0){
            setExpenses(stored)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expenses))
    }, [expenses])


    return(

        <ExpenseProvider value={{expenses, addExpense, deleteExpense, updateExpense}}>
            <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-6 sm:py-10">
                <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-4 sm:p-6 md:p-8">
                    
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                        Expense Tracker
                    </h1>
                    
                    <ExpenseForm />
                    
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-end">
                        <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full sm:w-auto h-10 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                        {filteredExpenses.map((expense) => (
                            <ExpenseItem key={expense.id} expense={expense} />
                        ))}
                    </div>
                    
                    <h2 className="mt-6 text-base sm:text-lg font-semibold text-right">
                        Total Expense: ₹{totalExpense}
                    </h2>
                </div>
            </div>
        </ExpenseProvider>
    )
}

export default App