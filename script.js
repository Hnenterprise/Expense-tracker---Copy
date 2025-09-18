document.addEventListener("DOMContentLoaded", ()=>{
const form = document.querySelector(".expense-form");
const container = document.querySelector(".expense-list");

    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const amount = document.querySelector("#amount").value;
        const date = document.querySelector("#date").value;

        const expenseDiv = document.createElement("div");
        expenseDiv.className= "expense-item";

        const expenseContent = document.createElement("span");
        expenseContent.textContent = `${name} - ${amount} - ${date}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-btn";
        deleteBtn.type = "button";

        deleteBtn.addEventListener("click", () => {
            expenseDiv.remove();
        });

        expenseDiv.appendChild(expenseContent);
        expenseDiv.appendChild(deleteBtn);

        container.appendChild(expenseDiv);

        form.reset();

    });
});
