import { useState } from "react";
import { useExpense } from "../contexts/context";

export function ExpenseItem({expense}) {

    const [isExpenseEditable, setIsExpenseEditable] = useState(false)
    const [expenseMsg, setExpenseMsg] = useState(expense.expense)
    const [amountMsg, setAmountMsg] = useState(expense.amount)
    const [categoryMsg, setCategory] = useState(expense.category)
    const [dateMsg, setDateMsg] = useState(expense.date)
    const {updateExpense, deleteExpense} = useExpense()

    const handleUpdate = () => {
        updateExpense(expense.id, {
            expense: expenseMsg,
            amount: Number(amountMsg),
            category: categoryMsg,
            date: dateMsg
        })
    }
    return(
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 border border-gray-200 rounded-lg p-4">
            
            <input 
            type="text"
            value={expenseMsg}
            onChange={(e) => setExpenseMsg(e.target.value)}
            readOnly={!isExpenseEditable}
            className="w-full sm:flex-1 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
            type="number"
            value={amountMsg}
            onChange={(e) => setAmountMsg(e.target.value)}
            readOnly={!isExpenseEditable}
            className="w-full sm:w-28 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
            type="text"
            value={categoryMsg}
            onChange={(e) => setCategory(e.target.value)}
            readOnly={!isExpenseEditable}
            className="w-full sm:w-32 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
            type="date"
            value={dateMsg}
            onChange={(e) => setDateMsg(e.target.value)}
            className="w-full sm:w-36 h-10 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
            onClick={() => {
                if (isExpenseEditable) {
                    handleUpdate();
                    setIsExpenseEditable(false);
                } else {
                    setIsExpenseEditable((prev) => !prev);
                }
            }}
            className="h-10 px-4 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
            >
                {isExpenseEditable ? "Save" : "Edit"}
            </button>

            <button
            onClick={() => deleteExpense(expense.id)}
            className="h-10 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
                Delete
            </button>
        </div>
    )
}