var CARD_INDEX = 0;
var CATEGORY_INDEX = 1;
var CASHBACK_INDEX = 4;


function updateSelector(selector, options) {
    for (let value of options) {
        var option = document.createElement("option");
        option.value = value;
        option.text = value;
        selector.children[0].add(option);
    }
}


function getUniqueKey(data, index) {
    var keys = new Set();
    for (let entry of data) {
        keys.add(entry[index]);
    }
    return keys;
}