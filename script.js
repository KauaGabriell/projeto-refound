const amount = document.getElementById("amount");

amount.oninput = () => {
    let value = amount.value = amount.value.replace(/[^\d]/g, "");
    amount.value = value;
}