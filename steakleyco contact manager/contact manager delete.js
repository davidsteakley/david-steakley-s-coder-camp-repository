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

  var contactsListID = parseInt(urlParams["contactsListID"]);


  var maxContactID = 0;
  var contactsString = localStorage.getItem('contacts');
  var contactsList = JSON.parse(contactsString);
  if (contactsList === undefined || contactsList === null){
    var contactsList = [];
  }

  var contactsListIndex = contactsList.findIndex(function(a) {return a.contactID == contactsListID;});

  document.getElementById('delFirstName').innerHTML = contactsList[contactsListIndex].contactFirstName;
  document.getElementById('delLastName').innerHTML = contactsList[contactsListIndex].contactLastName;
  document.getElementById('delEmail').innerHTML = contactsList[contactsListIndex].contactEmail;
  document.getElementById('delPhone').innerHTML = contactsList[contactsListIndex].contactPhone;

  function writeTable(){
    var contactsString = JSON.stringify(contactsList);
    // add to session storage
    localStorage.setItem('contacts', contactsString);
  }

  $('#deleteDialog').on('click', function() {
    contactsList.splice(contactsListIndex,1);
    writeTable();
    window.open("contact manager home.html","_self");
  });

  $('#cancelDialog').on('click', function() {
    window.open("contact manager home.html","_self");
  });
