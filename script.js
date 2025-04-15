const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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
};

function expenseAdd(newExpense){
  try {
    //Criando elemento de li para adicionar o item a lista
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense")

    
  } catch (error) {
    alert("Não foi possível adicionar uma despesa, tente novamente em alguns momentos!!")
    console.log(error)
  }
}
