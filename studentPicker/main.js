
// var students = ["Patrick", "Brian", "David", "Lizzie", "John", "Mikey"];
var students = [];

var studentNameInput = document.getElementById('studentName');
studentNameInput.focus();

// event listeners & handler functions
studentNameInput.addEventListener('keypress', keyPressed);
document.getElementById('addButton').addEventListener('click', addStudent);
document.getElementById('randomStudentButton').addEventListener('click', getRandomStudent);
document.getElementById('makeRandomPairs').addEventListener('click', makeRandomPairs);
document.getElementById('makeGroupsButton').addEventListener('click', makeGroups);

function keyPressed(event){
  if (event.which === 13){
    addStudent();
  }
}

// update the students array after user input
function addStudent(){
  var inputStr = studentNameInput.value;

  if(inputStr){
    var names = inputStr.split(',').map(function(name){
      return name.trim();
    }).filter(function(elem){
      return elem;
    });

    // update the students array
    students = students.concat(names);

    // clear and reset the input box
    studentNameInput.value = "";
    studentNameInput.focus();

    listNames(students);
  }
}

// displays the names after user input
function listNames(arr){
  var namesList = document.getElementById('namesList');

  namesList.innerHTML = "";

  var containerUl = document.createElement('ul');

  arr.forEach(function(name){
    var listElement = document.createElement('li');
    listElement.innerHTML = name;
    containerUl.appendChild(listElement);
  });

  namesList.appendChild(containerUl);
}

//Select a random student and display
function getRandomStudent(){
  if (students.length){
    var randomStudent = students[Math.floor(Math.random() * students.length)];
    document.getElementById('randomStudent').innerHTML = randomStudent;
  }
}

// Create random pairs of students and display
function makeRandomPairs(){

  var teams = shuffleStudentPairs(students);

  var pairsList = document.getElementById('randomPairs');
  pairsList.innerHTML = "";

  var containerUl = document.createElement('ul');

  teams.forEach(function(pair){
    var newPair = document.createElement('li');

    if (pair[1]){
      newPair.innerHTML = pair[0] + " + " + pair[1];
    } else {
      newPair.innerHTML = pair[0];
    }

    containerUl.appendChild(newPair);

  });

  pairsList.appendChild(containerUl);

}

// helper function that randomizes the students array
function shuffleArray(arr){
  var pos = arr.length;
  var temp;
  var rand;

  while (pos){
    rand = Math.floor(Math.random() * pos);
    pos--;

    temp = arr[pos];
    arr[pos] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}

// display random pairs of students
function shuffleStudentPairs(arr){
  arr = shuffleArray(arr);
  var teams = [];
  for(var i = 0; i < arr.length; i+=2){
    if (arr[i+1]){
      teams.push([arr[i], arr[i+1]]);
    } else {
      teams.push([arr[i]]);
    }
  }

  return teams;
}

// display random groups with group size determined by user
function makeGroups(){
  var makeGroupsInput = document.getElementById('makeGroups');
  var num = parseInt(makeGroupsInput.value);
  if (num === 0 || isNaN(num)) {
    document.getElementById('makeGroups').value = "";
    return;
  }

  var teams = shuffleTeams(students, num);

  var teamsList = document.getElementById('teamsList');
  teamsList.innerHTML = "";

  var teamsContainerUl = document.createElement('ul');

  teams.forEach(function(team){
    var newTeam = document.createElement('li');
    newTeam.innerHTML = team.join(' + ');
    teamsContainerUl.appendChild(newTeam);
  });

  teamsList.appendChild(teamsContainerUl);

  makeGroupsInput.value = "";

}

//helper function for randomizing groups with group size determined by user
function shuffleTeams(arr, num){

  arr = shuffleArray(arr);

  var teams = [];
  for(var i = 0; i < arr.length; i+=num){
    var tempTeam = [];
    if (arr[i+num]){

      for (var k = i; k < i+num; k++){
        tempTeam.push(arr[k]);
      }
      teams.push(tempTeam);
    } else {
      for (var j = i; j < arr.length; j++){
        tempTeam.push(arr[j]);
      }
      teams.push(tempTeam);
    }
  }
  return teams;
}
