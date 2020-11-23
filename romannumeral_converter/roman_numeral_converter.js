var mapping = [
{"number":1000, "numeral":"M"},
{"number":900, "numeral":"CM"},
{"number":500, "numeral":"D"},
{"number":400, "numeral":"CD"},
{"number":100, "numeral":"C"},
{"number":90, "numeral":"XC"},
{"number":50, "numeral":"L"},
{"number":40, "numeral":"XL"},
{"number":10, "numeral":"X"},
{"number":9, "numeral":"IX"},
{"number":5, "numeral":"V"},
{"number":4, "numeral":"IV"},
{"number":1, "numeral":"I"}
];

function convertToRoman(num) {
    if (num == "") {
        return "";
    }
    // Check not decimal
    if (num == 0) {
        return "Zero is inavlid!";
    }
    if (num < 0 || num =="-") {
        return "No negative numbers!";
    }
    if (num.includes(".")) {
        return "No decimal numbers!";
    }
    if (isNaN(num)) {
        return "Not a number!";
    }
    try {
        var roman = "";
        for (var conversion of mapping) {
            while(num >= conversion.number) {
                roman += conversion.numeral;
                num -= conversion.number;
            }
        }    
        return roman;                                              
    } catch (error) {
        return "Not a number!"
    }
}

function convertToNumber(roman) {
    if (roman == "") {
        return "";
    }
    roman = roman.toUpperCase();
    try {
        var number = 0;
        for (var conversion of mapping) {
            length = conversion.numeral.length;
            while (roman.substring(0, length) == conversion.numeral) {
                roman = roman.substring(length, roman.length);
                number += conversion.number;
            }
        }    
        if (roman.length > 0) {
            return "Not a Roman numeral!"
        }
        return number.toString();                                              
    } catch (error) {
        return "Not a Roman numeral!"
    }
}

document.getElementById("number").addEventListener("keyup", function(event) {
    event.preventDefault();
    document.getElementById("roman").value = convertToRoman(document.getElementById("number").value);
});
document.getElementById("roman").addEventListener("keyup", function(event) {
    event.preventDefault();
    document.getElementById("number").value = convertToNumber(document.getElementById("roman").value);
});