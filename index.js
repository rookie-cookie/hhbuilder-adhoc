/*
HHBUILDER PROBLEM - TASK
[done] Validate data entry (age is required and > 0, relationship is required)
[done] Add people to a growing household list
[done] Remove a previously added person from the list
[] Display the household list in the HTML as it is modified
[] Serialize the household as JSON upon form submission as a fake trip to the server

*/

var form = document.getElementsByTagName('form')[0],
    body = document.getElementsByTagName('body')[0];
form.setAttribute("action","#");
form.setAttribute("method", "post");

//user input - contents area
var hhContainer = document.createElement('div');
hhContainer.setAttribute('id', 'hhContainer');
hhContainer.innerHTML = "<h1>Household Members</h1>";
var hhContents = document.createElement('div'),
    hhContentsUL = document.createElement('ul');
hhContentsUL.setAttribute('id','mylist');
hhContents.appendChild(hhContentsUL);
hhContainer.appendChild(hhContents);
body.appendChild(hhContainer);

var age = document.getElementsByTagName('input')[0].value,
    select = document.getElementsByTagName('select')[0],
    relationship = select.options[select.selectedIndex].value,
    smoker = document.getElementsByTagName('input')[1].checked;


// - - - FUNCTIONS - - -

//set all event listeners
function init (){
  var addbtn = document.getElementsByTagName('button')[0],
      submitbtn = document.getElementsByTagName('button')[1];
  //event listeners - click
  addbtn.addEventListener('click', addData);
  submitbtn.addEventListener('click', submitData);
}
window.onload = init;

// validation
function validateData (e){
  e.preventDefault();
  var err = document.createElement('p');
  err.id = 'errormsg';
  var age = document.getElementsByTagName('input')[0].value,
      select = document.getElementsByTagName('select')[0].value;

  if (age === "" || age <= 0 || isNaN(age)){
    err.innerHTML = "Please enter a valid age, must be older than 1";
    body.appendChild(err);
    return false;
  } else if (select === ""){
    err.innerHTML = "Please select your relationship";
    body.appendChild(err);
    return false;
  }
  return true;
}

// when user inputs data
function addData (e){
  if (validateData(e)){
    var age = document.getElementsByTagName('input')[0].value,
        relationship = document.getElementsByTagName('select')[0].options[select.selectedIndex].value,
        s = document.getElementsByTagName('input')[1].checked,
        addtolist = hhContentsUL.appendChild(document.createElement('div'));

    if (s){
      var smoker = "yes";
    } else {
      smoker = "no";
    }

    function Members (age, relationship, smoker){
      this.age = age;
      this.relationship = relationship;
      this.smoker = smoker;
    };
    var familyMem = new Members(age, relationship, smoker),
        familyArr = [];
    familyArr.push(familyMem);

    //display the user input
    addtolist.appendChild(document.createTextNode("AGE: " + familyArr[0].age));
    addtolist.appendChild(document.createElement("p"));
    addtolist.appendChild(document.createTextNode("RELATIONSHIP: " + familyArr[0].relationship.toUpperCase()));
    addtolist.appendChild(document.createElement("p"));
    addtolist.appendChild(document.createTextNode("SMOKER: " + familyArr[0].smoker.toUpperCase()));
    addtolist.appendChild(document.createElement("p"));

    //add checkbox to determine which one to delete
    var inp = addtolist.appendChild(document.createElement("input"));
    inp.type = "checkbox";
    inp.name = "deletethis";
    //delete items that are checked
    btn.addEventListener("click", function(){
      var inputs = hhContainer.getElementsByTagName('input');
      console.log(inputs.length);
      for (var i = 0; i < inputs.length; i++){
        if (inputs[i].checked){
          console.log("delete me");
          mylist.removeChild(mylist.childNodes[i]);
        };
      };
    });
    addtolist.appendChild(document.createElement("p"));
    addtolist.appendChild(document.createTextNode("------------------------------------------------"));

    //clear any previous error messages
    document.getElementById('errormsg').remove();
  }
}

//remove button
var btn = body.appendChild(document.createElement("button"));
btn.appendChild(document.createTextNode("Remove"));


function submitData (e){
  if (validateData(e)){
    console.log("hi");
  }
}
