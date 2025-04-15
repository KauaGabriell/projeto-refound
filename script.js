const amount = document.getElementById("amount");

//Captura o evento de input do campo de valor da despesa para formatar o valor para o padrão brasileiro
amount.oninput = () => {
    //Remove todos os caracteres não numéricos
    let value = (amount.value = amount.value.replace(/[^\d]/g, ""));

    //Transforma o Valor em Centavos
    value = Number(value) / 100

    //Atualiza o Valor do Input
    amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
    //Formata o valor para Real Brasileiro
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return value; //Retorna o valor para a variável value para ser utilizado la em cima no evento
}
