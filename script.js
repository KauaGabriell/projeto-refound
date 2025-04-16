const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

//Captura o evento de input do campo de valor da despesa para formatar o valor para o padrão brasileiro
amount.oninput = () => {
  let value = amount.value.replace(/[^\d]/g, ""); // Remove caracteres não numéricos
  value = Number(value) / 100; // Converte para centavos
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

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
};

//Adiciona uma nova despesa na lista
function expenseAdd(newExpense) {
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
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace("R$", "").toUpperCase()}`

    //Criando ícone de Remover
    const expenseRemoveIcon = document.createElement("img")
    expenseRemoveIcon.setAttribute("src", `img/remove.svg`);
    expenseRemoveIcon.setAttribute("alt", "remover");
    expenseRemoveIcon.classList.add("remove-icon");

    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemoveIcon)
    expenseInfo.append(expenseName, expenseCategory)
    expenseList.appendChild(expenseItem)

    //Atualiza o total de despesas
    updateTotal();

  } catch (error) {
    alert("Não foi possível adicionar uma despesa, tente novamente em alguns momentos!!")
    console.log(error)
  }
}

function updateTotal(){
  try {
    const items = expenseList.children
    //Atualiza o Valor da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "Despesas" : "Despesa"} `

    //Percorre todos os itens para somar o valor total
    let total = 0 
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      //Remove caracteres não numéricos e substitui virgula por ponto
      let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".");

      //Converte Valor para float
      value = parseFloat(value)

      //Verifica se é numero
      if(isNaN(value)){
        alert("Não foi possível calcular o total, o valor não parece ser um número")
        return;
      }

      //Incrementa Valor total
      total += Number(value);
    }

    // Atualiza o total na interface
    expenseTotal.textContent = formatCurrencyBRL(total);

  } catch (error) {
    alert("Não foi possível atualizar o total")
    console.log(error)
  }
}
