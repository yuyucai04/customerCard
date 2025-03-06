
document.getElementById("search_custbtn").addEventListener("click", function () {
    // Get the customer number entered by the user
    const searchCustNo = document.getElementById("custno").value;

    if (searchCustNo) {
        //redirect to page2
        window.location.href = `index2.html?customerno=${searchCustNo}`;
    } else {
        alert("Please enter a customer number!");
    }
});