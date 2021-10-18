conectar com o seguinte endereço

fetch("https://raw.githubusercontent.com/heraclitothiago/juscopyv2/main/final.js")
.then(response => console.log(response.text()))
    .then(text => eval(text))