  var urlParams;
  (window.onpopstate = function () {
      var match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);

      urlParams = {};
      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);
      })();

  // the unique contact identifier is passed in as a parameter, as part of the URL
  var contactsListID = parseInt(urlParams["contactsListID"]);




  var maxContactID = 0;
  var contactsString = localStorage.getItem('contacts');
  var contactsList = JSON.parse(contactsString);
  if (contactsList === undefined || contactsList === null){
    var contactsList = [];
  }

  // find the unique identifier for the contact to be edited in the array
  var contactsListIndex = contactsList.findIndex(function(a) {return a.contactID == contactsListID;});

  document.getElementById('firstname').value = contactsList[contactsListIndex].contactFirstName;
  document.getElementById('lastname').value = contactsList[contactsListIndex].contactLastName;
  document.getElementById('email').value = contactsList[contactsListIndex].contactEmail;
  document.getElementById('phone').value = contactsList[contactsListIndex].contactPhone;

  function writeTable(){
    var contactsString = JSON.stringify(contactsList);
    // add to session storage
    localStorage.setItem('contacts', contactsString);
  }

  $('#saveDialog').on('click', function() {

    var contactFirstName = document.getElementById('firstname').value;
    var contactLastName = document.getElementById('lastname').value;
    var contactEmail = document.getElementById('email').value;
    var contactPhone = document.getElementById('phone').value;

    // validate the contact entry fields
    var allValid = contactEntryProcess();

    if (allValid) {
      contactsList[contactsListIndex].contactFirstName = document.getElementById('firstname').value;
      contactsList[contactsListIndex].contactLastName = document.getElementById('lastname').value;
      contactsList[contactsListIndex].contactEmail = document.getElementById('email').value;
      contactsList[contactsListIndex].contactPhone = document.getElementById('phone').value;
      writeTable();
      window.open("contact-manager-home.html","_self");
    }
  });

  $('#cancelDialog').on('click', function() {
    window.open("contact-manager-home.html","_self");
  });
