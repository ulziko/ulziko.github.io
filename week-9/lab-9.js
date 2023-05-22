const exchangeArray = [{name: "MNT", value: 1}, {name: "USD", value: 2850}, {name: "EUR", value: 3120}, {name: "PND", value: 3500}, {name: "WON", value: 2.3}, {name: "YEN", value: 123}, {name: "YAN", value: 11}]
const numlist=document.querySelectorAll('.num');
const input=document.querySelector("#input");
const output=document.querySelector("#output");
const convert=document.querySelector("#submit");
const from_currency = document.getElementById("from_currency");
const to_currency = document.getElementById("to_currency");
const del = document.querySelector(".delete");
const clear = document.querySelector(".clear");
exchangeArray.forEach((currency) => {
    const option_node = document.createElement("option");
    const option_node2 = document.createElement("option");
    option_node.value = currency.value;
    option_node.text = currency.name;
    option_node2.value = currency.value;
    option_node2.text = currency.name;
    from_currency.append(option_node);
    to_currency.append(option_node2);
});

numlist.forEach((number) =>{
    number.onclick = function(){
         input.value +=`${number.value}`;
         return false;
    }
});
convert.onclick= function(){
    var from=parseFloat(from_currency.value);
    var to=parseFloat(to_currency.value);
    var convert_input=parseFloat(input.value);
    var final=((from*convert_input)/to);
    output.value =`${final}`;
    return false;
}
del.onclick= function(){
    input.value=input.value.slice(0,input.value.length-1);
}
clear.onclick= function(){
    input.value="";
    output.value="";
}
 const imgcon=document.querySelector(".img");
 const img=document.querySelector("img");

 imgcon.addEventListener("mousemove",(e)=>{
    let xAxis=(window.innerWidth / 2 - e.pageX)/20;
    let yAxis=(window.innerHeight / 2 - e.pageY)/20;
    img.style.transform =`rotateY(${yAxis}deg) rotateX(${xAxis}deg)`


 })





