function getdata() {
  var pincode = document.getElementById("pincode");
  var date = document.getElementById("datepick");
  date = date.value.split("-").reverse().join("-");
  //console.log("Pincode " + pincode.value + " " + "DatePicker" + date);
  pincode = pincode.value;
  var api_url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`;

  getapi(api_url, pincode, date);
}

// Calling that async function
function CreateTableFromJSON(data) {
  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < data.length; i++) {
    for (var key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < data.length; i++) {
    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = data[i][col[j]];
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

function show(data) {
  let tab = `<tr>
          <th>CenterId</th>
          <th>Name</th>
          <th>Address</th>
          <th>State</th>
          <th>District</th>
          <th>City</th>
         
          <th>Fee Type</th>
          <th>Vaccine Fees</th>
         </tr>`;

  // Loop to access all rows
  for (let r of data) {
    tab += `<tr> 
    <td>${r.center_id} </td>
    <td>${r.name}</td>
    <td>${r.address}</td> 
    <td>${r.state_name}</td>  
    <td>${r.district_name} </td>
    <td>${r.block_name}</td>
    
    <td>${r.fee_type}</td> 
    <td>${
      JSON.stringify(r.vaccine_fees) ? JSON.stringify(r.vaccine_fees) : "NA"
    }</td>            
</tr>`;
  }
  document.getElementById("tabdata").innerHTML = tab;
}

async function getapi(url, pincode, date) {
  const response = await fetch(url);
  var data = await response.json();
  //console.log(data.centers);
  data = data.centers;
  if (data.length === 0) {
    document.getElementById("tabdata").style.display = "none";
    document.getElementById("msg").style.display = "";
    var x = document.getElementById("msg");
    x.textContent = "Not Found Data";
  } else {
    document.getElementById("tabdata").style.display = "";
    document.getElementById("msg").style.display = "none";
    show(data);
  }
}
