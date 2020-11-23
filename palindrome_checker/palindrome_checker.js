// Disclaimer: Good variable and function names should in general take the place of most comments.
//             However, as the intention here is explain my code, I have commented as much as possible.
//             I have edited the code below as if it were a live project that may require ongoing extension or maintenance.

// This is an efficient function to quickly check if the input field contains a palindrome
// I could have combined this with AnalysePalindrome(), but I wanted to demonstrate how the boolean result can be achieved more optimally
function IsPalindrome() {
    // Grab the text from the input field and clean out whitespace and special chars using regex. convert to lower case
    var cleaned = document.getElementById("palindromeInput").value.replace(/[\W_]/g, "").toLowerCase();
    // Storing the length in a variable is not necessary but makes ny code less verbose
    var length = cleaned.length;
    // Assume the word is a palindrome - later we will pick through each character to find evidence to the contrary
    var isPalindrome=true;
    // Empty strings should return the screen to the default
    if(length == 0){
        return '';
    }
    // Iterate over the characters to check that each character matches it's mirrored counterpart
    for (var i=0; i<length; i++) {
        // If we're over halfway, the remaining work only duplicates the work already completed, so quit
        if (i > length/2) {
            break;
        }
        // This is the actual check - note the break - if we find a non-matching pair, no further checks are required
        // Note the -1 as the length is 1-indexed and the position is 0-indexed
        if (cleaned[i] != cleaned[length - 1 - i]) {
            isPalindrome=false;
            break;
        }
    }
    // Return a bootstrap icon to indicate palindrome or not
    return '<i class="fas fa-' + (isPalindrome ? 'check' : 'times') + '-circle" style="font-size:30px; color:' + (isPalindrome ? '#2ec02e' : 'red') + '"></i>';
}

// This function is simiilar, with minor differences highlighted below:
function AnalysePalindrome() {
    var cleaned = document.getElementById("palindromeInput").value.replace(/[\W_]/g,"");
    var lowered = cleaned.toLowerCase();
    var length = lowered.length;
    // String to store the analysed results
    var analysedPalindrome = "";
    // Counter to calculate percentage palindromicity
    var count = 0;
    // Default green color (this one has better contrast than CSS green)
    var color = "#2ec02e";
    // If empty, give a call to action
    if (length == 0) {
        analysedPalindrome = '<div style="color:' + color + '">Is your name a palindrome?</div>';
    }
    // Otherwise analyse the palindrome
    else {
        // Highlight each character as green (matching) or red (non-matching) for display to the user 
        for (var i=0; i<length; i++) {
            // Set the color back to the default green each time as a fail-safe measure
            color = "#2ec02e";
            // Set color to red if the characters fail to match 
            if (lowered[i] != lowered[length - 1 - i]) {
                color = "red";
            }
            // Otherwise increment the counter
            else {                
                count += 1;
            }
            // Put this together into a html output
            analysedPalindrome += '<span style="color:' + color + '">' + cleaned[i] + '</span>';
        }
        // Use the count and length to display a percentage 
        var percent = (count*100/length).toFixed(0)
        analysedPalindrome += '<div style="color:' + color + '">' + percent + '% Palindromicity' + (percent == "100" ? '!' : ' :-(') + '</div>'
    }        
    return analysedPalindrome;
}

// Both functions should always be run together, passing the results to UI elements
function CheckPalindrome(){
    document.getElementById("palindromeCheck").innerHTML=IsPalindrome();
    document.getElementById("palindromeAnalysis").innerHTML=AnalysePalindrome()
}

// Run the scripts once on first visiting the page
CheckPalindrome(); 

// Listen for further editing of the text input box, refresh UI elements each time by by calling the scripts again
document.getElementById("palindromeInput").addEventListener("keyup", function(event) {
    event.preventDefault();
    CheckPalindrome();
});