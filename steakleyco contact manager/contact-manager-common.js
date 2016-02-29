//  prep and validation routines for adding/editing contact info
//

function contactEntryProcess(){

  var allValid = true;

  // set error buffer to blank

  document.getElementById('errorMessage').innerHTML = "";

  // set colors to white, indicating no error, pending validation

  document.getElementById('firstname').style.backgroundColor = "white";
  document.getElementById('lastname').style.backgroundColor = "white";
  document.getElementById('email').style.backgroundColor = "white";
  document.getElementById('phone').style.backgroundColor = "white";

  // get entry values for contact info

  var contactFirstName = document.getElementById('firstname').value;
  var contactLastName = document.getElementById('lastname').value;
  var contactEmail = document.getElementById('email').value;
  var contactPhone = document.getElementById('phone').value;

  // validate email
  var validEmail = /\S+@\S+\.\S+/;
  if (!validEmail.test(contactEmail)) {
        document.getElementById('email').style.backgroundColor = "red";
        document.getElementById('errorMessage').innerHTML = "Please enter a valid email address.<br>";
        allValid = false;
  }
  // validate name--no blank names allowed
  if (contactFirstName == ""){
    allValid = false;
    document.getElementById('firstname').style.backgroundColor = "red";
    document.getElementById('errorMessage').innerHTML = document.getElementById('errorMessage').innerHTML +
      "First name cannot be blank.<br>";
  }
  // valid last name -- no blank names allowed
  if (contactLastName == ""){
    allValid = false;
    document.getElementById('lastname').style.backgroundColor = "red";
    document.getElementById('errorMessage').innerHTML = document.getElementById('errorMessage').innerHTML +
      "Last name cannot be blank.<br>";
  }
  // validate phone numnber:  allows a wide array of 10 digit US-type phone numbers,
  // and international style numbers
  var validPhone = /^[\(\)\s\-\+\d]{10,17}$/;
  if (!validPhone.test(contactPhone)) {
        document.getElementById('phone').style.backgroundColor = "red";
        document.getElementById('errorMessage').innerHTML = document.getElementById('errorMessage').innerHTML +
          "Please enter a valid phone number (999-999-9999).<br>";
        allValid = false;
  }
  return allValid;
}
