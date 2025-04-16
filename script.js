const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

// Formatação do valor monetário
amount.oninput = () => {
    let value = (amount.value = amount.value.replace(/[^\d]/g, "")); // Remove caracteres não numéricos
    value = Number(value) / 100; // Converte para centavos
    amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    return value;
}

// Manipulação do formulário
form.onsubmit = (event) => {
    event.preventDefault();
    
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    };
    
    expenseAdd(newExpense);
    formClear();
};

// Adiciona nova despesa na lista
function expenseAdd(newExpense) {
    try {
        // Criação dos elementos
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace("R$", "").toUpperCase()}`;

        const expenseRemoveIcon = document.createElement("img");
        expenseRemoveIcon.setAttribute("src", "img/remove.svg");
        expenseRemoveIcon.setAttribute("alt", "remover");
        expenseRemoveIcon.classList.add("remove-icon");

        // Montagem da estrutura
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemoveIcon);
        expenseInfo.append(expenseName, expenseCategory);
        expenseList.appendChild(expenseItem);

        // Atualiza o total
        updateTotal();

    } catch (error) {
        alert("Não foi possível adicionar uma despesa, tente novamente em alguns momentos!!");
        console.log(error);
    }
}

// Atualiza o total das despesas
function updateTotal() {
    try {
        const items = expenseList.children;
        
        // Atualiza quantidade de itens
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"}`;

        // Calcula o total
        let total = 0;
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount");
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");
            value = parseFloat(value);

            if (isNaN(value)) {
                alert("Não foi possível calcular o total, o valor não parece ser um número");
            }

            total += value;
        }

        //Cria a span para adicionar o R$ formatado
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";

        //Formata o valor e remove o R$ que será exibido com CSS
        total = formatCurrencyBRL(total).replace("R$", "");

        expenseTotal.innerHTML = "";

        //Limpa o conteúdo do elemento
        expenseTotal.append(symbolBRL, total);

    } catch (error) {
        alert("Não foi possível atualizar o total");
        console.log(error);
    }
}

//Evento para remover despesa
expenseList.addEventListener("click", function (event){
  if(event.target.classList.contains("remove-icon")){
    //Obtém LI PAI do elemento clicado
    const item = event.target.closest(".expense");

    //Remove o item da lista
    item.remove()
  }

  //Atualiza os totais
  updateTotal()
})

//Limpar campos

function formClear(){
  expense.value = "";
  category.value = "";
  amount.value = "";

  expense.focus();
}