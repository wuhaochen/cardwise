var data = null;


function onLoad() {
    $.getJSON("current.json", onDataReceived);
}


function onDataReceived(result) {
    data = result;
    var categories = getUniqueKey(data, CATEGORY_INDEX);
    var selector = document.getElementById("category-selector");
    updateSelector(selector, categories);
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