var CARD_INDEX = 0;
var CATEGORY_INDEX = 1;
var CASHBACK_INDEX = 4;

var data = null;


function updateSelector(result) {
    data = result;
    var categories = getUniqueKey(data, CATEGORY_INDEX);    
    var selector = document.getElementById("category-selector");
    for (let category of categories) {
        var option = document.createElement("option");
        option.value = category;
        option.text = category;
        selector.children[0].add(option);
    }
}


function addDeals(deals, entry) {
    var card = entry[CARD_INDEX];
    var cashback = entry[CASHBACK_INDEX];
    var category = entry[CATEGORY_INDEX];
    if (!(card in deals) || deals[card][0] < cashback) {
        deals[card] = [cashback, category];
    }
}


function findBestDeals(data, category) {
    var all_deals = {};
    for (let entry of data) {
        if (entry[CATEGORY_INDEX] === category || entry[CATEGORY_INDEX] === "Default") {
            addDeals(all_deals, entry);
        }
    }

    var deal_list = [];
    for (var card in all_deals) {
        var entry = all_deals[card].concat(card)
        deal_list.push(entry);
    }
    deal_list.sort().reverse()
    return deal_list
}


function getUniqueKey(data, index) {
    var keys = new Set();
    for (let entry of data) {
        keys.add(entry[index]);
    }
    return keys;
}


function onLoad() {
    $.getJSON("current.json", updateSelector);
}


function clearResult() {
    var table = document.getElementById("result");
    var body = table.getElementsByTagName("tbody")
    body[0].innerHTML = table.rows[0].innerHTML;
}


function updateResult(category) {
    clearResult();
    var table = document.getElementById("result");
    var result = findBestDeals(data, category);
    for (let entry of result) {
        var cashback = entry[0]*100+"%";
        var card = entry[1];
        var category = entry[2];
        var row = table.insertRow();
        var cardcell = row.insertCell(0);
        cardcell.innerHTML = card;
        var cashbackcell = row.insertCell(0);
        cashbackcell.innerHTML = cashback;
        var categorycell = row.insertCell(0);
        categorycell.innerHTML = category;
    }
}