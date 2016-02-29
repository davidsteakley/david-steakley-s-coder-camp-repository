  // set maxContactID to 0 in preparation for determining the highest contact ID used so far,
  // based on reading in the table from local storage
  var maxContactID = 0;
  var contactsListID = 0;
  // get the array of contacts from local storage
  var contactsString = localStorage.getItem('contacts');
  var contactsList = JSON.parse(contactsString);
  // if there is no local storage of the contacts, set to empty
  if (contactsList === undefined || contactsList === null){
    var contactsList = [];
  }
  // get reference to the display table of contacts
  var tableSelect = document.getElementById('contacts');

  function buildDisplayTable(contactsList, i){
    holder += "<tr><td class='column1'>";
    holder += contactsList[i].contactFirstName + "</td>" + "<td class='column2'>" + contactsList[i].contactLastName + "</td>";
    holder += "<td class='column3'>" + contactsList[i].contactEmail + "</td>" + "<td class='column4'>" + contactsList[i].contactPhone + "</td>";
    // glyphicons representing edit and delete.  special classes are used in the click event
    // to detect whether the user clicked the pencil or the delete button
    holder += "<td><a href='#'><span class='edit glyphicon glyphicon-pencil'></span></td>";
    holder += "<td><a href='#'><span class='delete glyphicon glyphicon-remove-sign'></span></td>";
    // hidden column in the contacts list display table, with the contact's unique ID
    holder += "<td style='display:none'>" + contactsList[i].contactID + "</td></tr>";
  }

  function displayTable(){
    holder = "";
    for (var i=0;i<contactsList.length;i++) {
      buildDisplayTable(contactsList, i);
      if (contactsList[i].contactID > maxContactID){maxContactID = contactsList[i].contactID;}
    }
    tableSelect.innerHTML = holder;
  }

  function displaySearchResults(contactsArray){
    holder = "";
    for (var i=0;i<contactsArray.length;i++) {
      buildDisplayTable(contactsArray, i);
    }
    tableSelect.innerHTML = holder;
  }

  function writeTable(){
    var contactsString = JSON.stringify(contactsList);
    // save the contacts array to local storage
    localStorage.setItem('contacts', contactsString);
  }

  displayTable();

  $("#contacts").on("click", function(e) {
    //  this function handles clicks on either of the clickable glyphicons.
    //  the function determines which glyphicon was clicked by checking the clicked item's
    //  class list to see if it is the "edit" class or the "delete" class
    if (e.target.classList[0] === "delete"){
      // the display table contains a hidden element, with the unique contact identifier
      // this operation retrieves the hidden element and passes it to the delete page
      // as a URL parameter
      contactsListID = parseInt(e.target.parentElement.parentElement.parentElement.lastChild.innerHTML);
      window.open("contact-manager-delete.html?contactsListID=" + contactsListID,"_self");
    }
    else if (e.target.classList[0] === "edit"){
      contactsListID = parseInt(e.target.parentElement.parentElement.parentElement.lastChild.innerHTML);
      window.open("contact-manager-edit.html?contactsListID=" + contactsListID,"_self");
    }
  })

  $('#addDialog').on('click', function() {

    // grab the contact entry fields
    var contactFirstName = document.getElementById('firstname').value;
    var contactLastName = document.getElementById('lastname').value;
    var contactEmail = document.getElementById('email').value;
    var contactPhone = document.getElementById('phone').value;

    // validate the contact entry fields
    var allValid = contactEntryProcess();

    if (allValid) {
      // initialize the object representing the contact to be pushed onto the array
      var pushcontactsList = {};
      // increment the unique contact identifier
      maxContactID++;
      pushcontactsList["contactID"] = maxContactID;
      pushcontactsList["contactFirstName"] = contactFirstName;
      pushcontactsList["contactLastName"] = contactLastName;
      pushcontactsList["contactEmail"] = contactEmail;
      pushcontactsList["contactPhone"] = contactPhone;
      // add the new contact to the end of the list
      contactsList[contactsList.length] = pushcontactsList;
      // update the displayed table to include the new contact
      displayTable();
      // save the modified table to local storage
      writeTable();
      // reset the entry fields to blank
      document.getElementById('firstname').value = "";
      document.getElementById('lastname').value = "";
      document.getElementById('email').value = "";
      document.getElementById('phone').value = "";
      $('#addModal').modal('hide');
    }
    });

  $('#cancelAdd').on('click', function() {
    $('#addModal').modal('hide');
  });

  $('#addContact').on('click', function() {
    //
    // set all the fields to blank, set the error buffer to blank, set the fields
    // to white, indicating no error
    //
    document.getElementById('errorMessage').innerHTML = "";
    document.getElementById('firstname').style.backgroundColor = "white";
    document.getElementById('lastname').style.backgroundColor = "white";
    document.getElementById('email').style.backgroundColor = "white";
    document.getElementById('phone').style.backgroundColor = "white";
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    $('#addModal').modal('show');
  });

  $('#searchCancel').on('click', function() {
    document.getElementById('searchFirstName').value = "";
    document.getElementById('searchLastName').value = "";
    displayTable();
  });

  $('#search').on('click', function() {
    var searchFirst = document.getElementById('searchFirstName').value;
    var searchLast = document.getElementById('searchLastName').value;

    // filter the list based on first name or last name, case insensitive

    if (searchFirst == "" && searchLast != "") {
      var contactsArray = contactsList.filter(function(a)
      {return (a.contactLastName.toUpperCase() == searchLast.toUpperCase());});
      displaySearchResults(contactsArray);
    }
    else if (searchFirst != "" && searchLast == ""){
      displaySearchResults(contactsList.filter(function(a)
       {return (a.contactFirstName.toUpperCase() == searchFirst.toUpperCase());}));
    }
    else if (searchFirst != "" && searchLast != ""){
      displaySearchResults(contactsList.filter(function(a)
        {return (a.contactFirstName.toUpperCase() == searchFirst.toUpperCase() &&
        a.contactLastName.toUpperCase() == searchLast.toUpperCase());}));
    }
  });
