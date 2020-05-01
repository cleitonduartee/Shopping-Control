var list = [
    {"description":"rice", "amount":"1","value":"5.40"},
    {"description":"beer", "amount":"12","value":"1.99"},
    {"description":"meat", "amount":"1","value":"15.00"}
];

function getTotal(list){
    var total = 0;
    for(var  key in list){
        //console.log(key)
       total += list[key].value * list[key].amount
    }
    return total;
}
function setList(list){
    
    var table  = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>'
    for(var key in list){
        table += `<tr>
        <td> ${formatDesc(list[key].description)}</td>
        <td>${list[key].amount}</td>
        <td>${formatValue(list[key].value)}</td>
        <td>Edit | Delete</td>                    
    </tr>`
    }
    table += '</tbody'
    document.getElementById("listTable").innerHTML = table
}
function formatDesc(desc){    
    var str = desc.toLowerCase(); //Formata o texto em minusculo
    str = str.charAt(0).toUpperCase() + str.slice(1); //Pega primeira letra(charAt) e colocar em Maiusculo(ToUpperCase) e pega o restante da string que está em minusculo com slice()
    return str
}
function formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""; //Transforma em Float, determina 2 casas decimais, e depois volta para string com + "";
    str = str.replace(".", ",") //troca o . por , 
    str = "R$ " + str;
    return str
}
setList(list);
console.log(getTotal(list))