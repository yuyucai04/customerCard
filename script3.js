const rtvCust = document.getElementById('rtv_cust');
const addBtn =  document.getElementById('add_btn');


//////////page3 - Add Customer   //////////////////////////////////
addBtn.addEventListener('click', ()=> {
    const custID = document.getElementById('addcustID').value;
    const name = document.getElementById('addname').value;
    const contact = document.getElementById('addtel').value;
    const email = document.getElementById('addemail').value;
    const department = document.getElementById('addoccupation').value;

// This is the data that we are going to send to the server
// It should follow the format of JSON that we test in POSTMAN
    const data = {
        "customer": {
            "customerno":custID,
            "customername": name,
            "contactno":contact,
            "email":email,
            "department":department
        }
}

fetch("https://api.sheety.co/9cd1eec4d95b2275d6100039175039f2/mockData/customer", 
{
    "method":"POST",
    "body": JSON.stringify(data),
    "headers":{
        "Authorization":"Bearer secret",
        "Content-Type":"application/json" //We add data to json
    }
})
.then(response => response.json())
.then(data => {
    alert("Data successfully added!")
}) .catch(err => {
    alert("There was an error!")
    console.log(err);
});
})