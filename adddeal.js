var data = null;


function onLoad() {
    console.log('load');
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
    setStartNextQuarter();
    setEndNextQuarter();
}


function findNextQuaterStart(d) {
    d = d || new Date();
    month = d.getMonth();
    qendmonth = month + 3 - month % 3;
    nd = new Date(d);
    nd.setMonth(qendmonth);
    nd.setDate(1);
    return nd;
}


function findNextQuaterEnd(d) {
    nd = findNextQuaterStart(d);
    nd.setMonth(nd.getMonth() + 3);
    return nd;
}


function setStartToday() {
    document.getElementById('start').value = new Date().toJSON().slice(0,10);
}


function setStartNextQuarter() {
    d = findNextQuaterStart();
    document.getElementById('start').value = d.toJSON().slice(0,10);
}


function setEndForever() {
    document.getElementById('end').value = '9999-12-31';
}


function setEndNextQuarter() {
    d = findNextQuaterEnd();
    document.getElementById('end').value = d.toJSON().slice(0,10);
}