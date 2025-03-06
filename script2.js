document.addEventListener("DOMContentLoaded", function (){
//After the page is loaded, this will be executed    

    // Step1: Get the customerno from the URL query parameter (pass from first page)
        const urlParams = new URLSearchParams(window.location.search);
        const searchCust = urlParams.get('customerno'); 

    let wCustNo = null;  //working field to store customer no [fetchDataFromCustomerAPI]

    function fetchDataFromAPI(){
        fetch("https://api.sheety.co/9cd1eec4d95b2275d6100039175039f2/mockData/card")
        .then(response =>response.json())
        .then(data =>{
            console.log(data)

             ////// Card Detail info ///////
            //verify with your API/sheety data (data.card)
            const cards = data.card;

            //Filter cards by customer number (matching the customer number fetched earlier)
            const filteredCards = cards.filter(card => card.customerno === wCustNo);

            let tableRows = '';

            //do for loop 
            // for(let i=0; i<cards.length; i++){
            for(let i=0; i<filteredCards.length; i++){

                //Create new row, TR
                let newTr = document.createElement("tr");

                //Verify on your table. How many column are there
                //Create new columns
                let newTD1 = document.createElement("td");
                let newTD2 = document.createElement("td");
                let newTD3 = document.createElement("td");
                let newTD4 = document.createElement("td");
                let newTD5 = document.createElement("td");

                //Set the innerHTML of the column
                newTD1.innerHTML = filteredCards[i].cardno;
                newTD2.innerHTML = filteredCards[i].network;
                newTD3.innerHTML = filteredCards[i].cardproduct;
                newTD4.innerHTML = filteredCards[i].expdate;

                //Create 3 buttons
                //Add class to the button "btn btn-primary", "btn btn-secondary", "btn btn-danger"
                //AddEventListener
                newTD5.innerHTML = "TODO BUTTON LATER!!"

                //Add the column to the row
                newTr.appendChild(newTD1);
                newTr.appendChild(newTD2);
                newTr.appendChild(newTD3);
                newTr.appendChild(newTD4);
                newTr.appendChild(newTD5);


                //Add the row to the tbody
                let tbody = document.getElementById("cards_tbody");
                tbody.appendChild(newTr);
            }

        })
        .catch(err=> console.log(err))
    }


    function fetchDataFromCustomerAPI(searchCust){
        fetch("https://api.sheety.co/9cd1eec4d95b2275d6100039175039f2/mockData/customer")
        .then(response =>response.json())
        .then(data =>{
            console.log(data)

            //verify with your API/sheety data (data.customer)
            const customers = data.customer;
            const customerSelect = customers.find(cust => cust.customerno === searchCust);

            wCustNo = customers[0].customerno;  // Store the customer number
            alert(wCustNo);
            ////// Customer Detail  ///////
            // rtv_custno.innerHTML = customers[0].customerno;
            // rtv_cname.innerHTML = customers[0].customername;
            // rtv_tel.innerHTML = customers[0].contactno;
            // rtv_email.innerHTML = customers[0].email;

            if (customerSelect) {
                document.getElementById("rtv_custno").innerHTML = customers[0].customerno;
                document.getElementById("rtv_cname").innerHTML = customers[0].customername;
                document.getElementById("rtv_tel").innerHTML = customers[0].contactno;
                document.getElementById("rtv_email").innerHTML = customers[0].email;

            } else {
                alert("Customer not found");
            }
        })
        .catch(err=> console.log(err))
    }

    //Invoke the function
    if (searchCust) {
        // Fetch customer data and card data using the customerno
        fetchDataFromCustomerAPI(searchCust);
        fetchDataFromAPI(searchCust);
    } else {
        alert("Customer number is missing in the URL.");
    }
})