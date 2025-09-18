document.addEventListener("DOMContentLoaded", ()=>{

const form = document.querySelector(".expense-form");
const container = document.querySelector(".expense-list");
const totalExpensesEl = document.getElementById("total-expenses");
const filterDateEl = document.getElementById("filter-date");
const filterCategoryEl = document.getElementById("filter-category");
const applyFiltersBtn = document.getElementById("apply-filters");
const clearFiltersBtn = document.getElementById("clear-filters");

let expenses = [];
let filteredExpenses = [];

function renderExpenses(list) {
    container.innerHTML = "";
    let total = 0;
    list.forEach((expense, idx) => {
        const expenseDiv = document.createElement("div");
        expenseDiv.className = "expense-item";

        const expenseContent = document.createElement("span");
        expenseContent.textContent = `${expense.name} - ${expense.amount} - ${expense.date}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";
        deleteBtn.addEventListener("click", () => {
            expenses.splice(expenses.indexOf(expense), 1);
            applyFilters();
        });

        expenseDiv.appendChild(expenseContent);
        expenseDiv.appendChild(deleteBtn);
        container.appendChild(expenseDiv);
        total += parseFloat(expense.amount);
    });
    totalExpensesEl.textContent = total.toFixed(2);
}

function applyFilters() {
    let date = filterDateEl.value;
    let category = filterCategoryEl.value.trim().toLowerCase();
    filteredExpenses = expenses.filter(exp => {
        let match = true;
        if (date) {
            match = match && exp.date === date;
        }
        if (category) {
            match = match && exp.name.toLowerCase().includes(category);
        }
        return match;
    });
    renderExpenses(filteredExpenses);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const amount = document.querySelector("#amount").value;
    const date = document.querySelector("#date").value;
    const expense = { name, amount, date };
    expenses.push(expense);
    applyFilters();
    form.reset();
});

applyFiltersBtn.addEventListener("click", applyFilters);
clearFiltersBtn.addEventListener("click", () => {
    filterDateEl.value = "";
    filterCategoryEl.value = "";
    renderExpenses(expenses);
});

// Initial render
renderExpenses(expenses);
});
