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
        <td><button onclick="setUpdate(${key})"class="btn btn-light">Edit</button> <button onclick="deleteData(${key})"class="btn btn-light">Delete</button</td>                    
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
function addData(){
    var item = lerDados()
    if(validar(item)){
        list.unshift({"description":item.desc , "amount":item.amount , "value":item.value})
        this.resetForm()
        setList(list);
    }else{
        alert("Preencha todos os Campos!")
    }
}
function lerDados(){
    var item = {}
    item.desc = document.getElementById("desc").value;
    item.amount = document.getElementById("amount").value;
    item.value = document.getElementById("value").value;
    return item;
}
function validar(item){
    if(item.desc && item.amount && item.value){
        return true
    }
    return false
}
function setUpdate(id){
    
    var obj = list[id];
    document.getElementById("desc").value = obj.description;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpadate").innerHTML =  '<input id="idUpdate" type="hidden" value="'+id+'">'
}
function resetForm(){
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "" ;

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("inputIDUpadate").innerHTML = "";
}
function updateData(){
    var id = document.getElementById("idUpdate").value;

    var item = this.lerDados();
    list[id] = {"description": item.desc , "amount": item.amount, "value": item.value};
    
    this.resetForm();
    this.setList(list);

}
function deleteData(id){
    if(confirm('Tem certeza que deseja Deletar item ?')){
        if(id === list.length -1){
            list.pop() //remove o ultimo
        }else if (id === '0'){
            list.shift() //remove o primeiro
        }else{
           var arrAuxInit = list.slice(0,id);
           var arrAuxEnd = list.slice(id + 1)
            list = arrAuxInit.concat(arrAuxEnd);
        }
        setList(list)

    }
}

setList(list);
console.log(getTotal(list))