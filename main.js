let Base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json"

const dropdowns1 = document.querySelectorAll(".dropdown select");
const dropimage = document.querySelectorAll(".dropdown img");
const btn = document.querySelector("button");
const fromvalue = document.querySelector(".from select");
const tovalue = document.querySelector(".to select");
const msg = document.querySelector(".message p");


const updateflag = (element) => {
    let countrycode = countryList[element.value];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    element.parentElement.querySelector("img").setAttribute("src", newsrc);
}


for (let select of dropdowns1) {
    for (ccode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = ccode;
        newOption.value = ccode;
        if (select.name == "from" && ccode == "USD") {
            newOption.selected = "selected";
        }
        if (select.name == "to" && ccode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("input");
    let amountvalue = amount.value;
    if (amountvalue == "" || amountvalue < 1) {
        amountvalue = 1;
        amount.value = 1;
    }
    fromurl = fromvalue.value;
    tourl = tovalue.value;
    let newbaseurl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromurl.toLowerCase()}/${tourl.toLowerCase()}.json`;
    let responce = await fetch(newbaseurl);
    let data = await responce.json();
    let rate=data[tovalue.value.toLowerCase()];
    let finalAmount=(rate*amountvalue).toFixed(2);
    msg.innerText=`${amountvalue} ${fromurl} =  ${finalAmount} ${tourl}`
})