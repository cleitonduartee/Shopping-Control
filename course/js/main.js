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
    document.getElementById("totalValue").innerHTML = this.formatValue(total);
    
}
function setList(list){
    
    var table  = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>'
    for(var key in list){
        table += `<tr>
        <td> ${formatDesc(list[key].description)}</td>
        <td> ${formatAmount(list[key].amount)}</td>
        <td>${formatValue(list[key].value)}</td>
        <td><button onclick="setUpdate(${key})"class="btn btn-light">Edit</button> <button onclick="deleteData(${key})"class="btn btn-light">Delete</button</td>                    
    </tr>`
    }
    table += '</tbody'
    document.getElementById("listTable").innerHTML = table;
    this.getTotal(list);
}
function formatDesc(desc){    
    var str = desc.toLowerCase(); //Formata o texto em minusculo
    str = str.charAt(0).toUpperCase() + str.slice(1); //Pega primeira letra(charAt) e colocar em Maiusculo(ToUpperCase) e pega o restante da string que está em minusculo com slice()
    return str
}
function formatAmount(amount){
    return parseInt(amount);
}
function formatValue(value){
    var str = parseFloat(value).toFixed(2) + ""; //Transforma em Float, determina 2 casas decimais, e depois volta para string com + "";
    str = str.replace(".", ",") //troca o . por , 
    str = "R$ " + str;
    return str
}
function addData(){
    if(this.validation()){
        return;
    }
        var item = lerDados()
        list.unshift({"description":item.desc , "amount":item.amount , "value":item.value})
        this.resetForm()
        setList(list);
    
}
function lerDados(){
    var item = {}
    item.desc = document.getElementById("desc").value;
    item.amount = document.getElementById("amount").value;
    item.value = document.getElementById("value").value;
    return item;
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
    document.getElementById("errors").style.display = "none"
}
function updateData(){
    if(this.validation()){
        return;
    }
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
function validation (){
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    document.getElementById("errors").style.display = "none";

    var errors = ""
    if(desc === ""){
        errors += '<p>Digite uma Descrição</p>'
    }
    if(amount === ""){
        errors += '<p>Digite a quantidade</p>'
    }else if( amount != parseInt(amount)){
        errors += '<p>Valor invalido no campo quantidade</p>'
    }
    if(value === ""){
        errors += '<p>Digite o valor</p>'
    }else if( value != parseFloat(value)){
        errors += '<p>Valor invalido no campo valor</p>'
    }

    if(errors != ""){
        
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85,85,85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px auto";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").style.width = "30%";
        document.getElementById("errors").style.textAlign = "center";
        


        document.getElementById("errors").innerHTML = "<h3>ERROR: </h3> "+errors;
        return true;
    }else{
        return false;
    }
}

setList(list);
