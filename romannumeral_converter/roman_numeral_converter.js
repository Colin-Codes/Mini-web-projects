// Disclaimer: Good variable and function names should in general take the place of most comments.
//             However, as the intention here is explain my code, I have commented as much as possible.
//             I have edited the code below as if it were a live project that may require ongoing extension or maintenance.

// De-coupling the data from the code as an array of objects means that it can be shared across the conversion functions (to and from)
// In this case it's important that the numerals are listed in decreasing order of significance, as we are going to assume this when we loop over the array
// When iterating, we can use the attributes number and numeral to refer to each.
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

// Convert a number into a roman numeral
function convertToRoman(num) {
    // Empty inputs should restore the screen to the default state
    // I like to put these validation steps first (they're called sentinel statements) - nested if statements are messier
    if (num == "") {
        return "";
    }
    // Zero has no roman numeral equivalent
    if (num == 0) {
        return "Zero is invalid!";
    }
    // Numbers less than 0 cannot be expressed as roman numerals
    // hyphen indicates the user is going to enter a negative number
    if (num < 0 || num =="-") {
        return "No negative numbers!";
    }
    // Decimals are not possible either
    if (num.includes(".")) {
        return "No decimal numbers!";
    }
    // A catch all for any non-numeric input
    if (isNaN(num)) {
        return "Not a number!";
    }
    // Start with empty string and build up the numeral from left to right, in decreasing order of significance
    var roman = "";
    // Iterate overall all the numeral types from biggest to smallest
    // This relies on the array above being implemented in order
    for (var conversion of mapping) {
        // If you can take a slice of the current numeral size out of the number, then do it and add the corresponding character(s) to the numeral
        // Otherwise move to the next numeral type until there are none left
        while(num >= conversion.number) {
            roman += conversion.numeral;
            num -= conversion.number;
        }
    }    
    // Return the now-complete roman numeral
    return roman;     
}

// Convert a roman numeral to a number
function convertToNumber(roman) {
    // Empty inputs should restore the screen to the default state
    if (roman == "") {
        return "";
    }
    // By converting the string to upper case, we are allowing the user to enter lower case characters as this should be allowed
    // This also means that we don't have to handle the case of lower case characters in the array, making it simpler to use
    roman = roman.toUpperCase();
    // Start from 0
    var number = 0;
    // Iterate overall all the numeral types from biggest to smallest
    for (var conversion of mapping) {
        // The numerals vary in length as either one or two chars. Getting the length upfront makes our code less verbose 
        // The length allows us to dynamically match the numeral types onto parts of the numeral entered.
        length = conversion.numeral.length;
        // If you can take a slice of the current numeral type out of the entered numeral, then do it and add the corresponding amount to the number
        while (roman.substring(0, length) == conversion.numeral) {
            roman = roman.substring(length, roman.length);
            number += conversion.number;
        }
    }    
    // If there are any characters remaining, then the input cannot be a valid roman numeral
    if (roman.length > 0) {
        return "Not a Roman numeral!"
    }
    // Otherwise return the equivalent number
    return number.toString();         
}

// Putting a listener onto each input field means that the fields update eachother dynamically using output from the above functions.
document.getElementById("number").addEventListener("keyup", function(event) {
    event.preventDefault();
    document.getElementById("roman").value = convertToRoman(document.getElementById("number").value);
});
document.getElementById("roman").addEventListener("keyup", function(event) {
    event.preventDefault();
    document.getElementById("number").value = convertToNumber(document.getElementById("roman").value);
});