var list = [
    {"description":"rice", "amount":"1","value":"5.40"},
    {"description":"beer", "amount":"12","value":"1.99"},
    {"description":"meat", "amount":"1","value":"15.00"}
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].value * list[key].amount
    }
    return total;
}
function setList(list){
    var title  = "";

}

console.log(getTotal(list))