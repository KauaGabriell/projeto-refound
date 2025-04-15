const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul")

//Captura o evento de input do campo de valor da despesa para formatar o valor para o padrão brasileiro
amount.oninput = () => {
  let value = (amount.value = amount.value.replace(/[^\d]/g, "")); //Remove todos os caracteres não numéricos
  value = Number(value) / 100; //Transforma o Valor em Centavos
  amount.value = formatCurrencyBRL(value); //Atualiza o Valor do Input
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    //Formata o valor para Real Brasileiro
    style: "currency",
    currency: "BRL",
  });

  return value; //Retorna o valor para a variável value para ser utilizado la em cima no evento
}

form.onsubmit = (event) => {
  event.preventDefault();
  //Criando Objeto de despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };
  expenseAdd(newExpense);
};

function expenseAdd(newExpense){
  try {
    //Criando elemento de li para adicionar o item a lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense")

    //Criando Icon da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Criando Div e adicionando um classe a ela
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //Criando strong (ExpanseName)
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense

    //Criando Categoria da Despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name
    
    //Criando valor da depesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount")
    
    //Criando Small para R$
    const expenseSmall = document.createElement("small");
    expenseSmall.textContent = "R$";
    
    //Adiciona as informações no item
    expenseItem.appendChild(expenseIcon)
    expenseItem.appendChild(expenseInfo)
    expenseAmount.appendChild(expenseSmall)
    expenseAmount.textContent = newExpense.amount
    expenseItem.appendChild(expenseAmount)
    expenseInfo.appendChild(expenseName)
    expenseInfo.appendChild(expenseCategory)
    expenseList.appendChild(expenseItem)

  } catch (error) {
    alert("Não foi possível adicionar uma despesa, tente novamente em alguns momentos!!")
    console.log(error)
  }
}
