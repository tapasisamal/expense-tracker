import { useState } from "react";
import { useExpense } from "../contexts/context";

export function ExpenseForm() {

    const [expense, setExpense] = useState("")
    const [amount, setAmount] = useState ("")
    const [category, setCategory] = useState("")
    const {addExpense} = useExpense()

    const add = (e) => {
        e.preventDefault()

        if(!expense || !amount || !category) return
        addExpense({expense, amount: Number(amount), category})

        setExpense("")
        setAmount("")
        setCategory("")
    }

    return(
        <>
        <form         
        onSubmit={add}
        className="flex flex-col sm:flex-row sm:items-center gap-3 border border-gray-200 rounded-lg p-4"
        >
            <input
            type="text"
            placeholder="Expense"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            className="w-full sm:flex-1 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            <input
            type="number"
            min={0}
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full sm:w-32 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            <input
            type="text"
            placeholder="Caterory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-38 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button 
            type="submit"
            className="w-full sm:w-auto h-10 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >Add
            </button>
            
        </form>
        </>
    )
}