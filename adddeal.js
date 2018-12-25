var data = null;


function onLoad() {
    setDefaultDate();
    $.getJSON("current.json", onDataReceived);
}


function onDataReceived(result) {
    data = result;
    var cards = getUniqueKey(data, CARD_INDEX);
    var selector = document.getElementById("card-selector");
    updateSelector(selector, cards);
    var categories = getUniqueKey(data, CATEGORY_INDEX);
    var selector = document.getElementById("category-selector");
    updateSelector(selector, categories);
}


function setDefaultDate() {
    document.getElementById('start').value = new Date().toJSON().slice(0,10);
    document.getElementById('end').value = findNextQuaterEnd().toJSON().slice(0,10);
}


function findNextQuaterEnd(d) {
    d = d || new Date();
    month = d.getMonth();
    qendmonth = month + 6 - month % 3;
    d.setMonth(qendmonth);
    d.setDate(1);
    return d;
}