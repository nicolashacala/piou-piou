var scoreTable = document.getElementById('scoreTable');
var startingScreen = document.getElementById('startingScreen');
var restartingScreen = document.getElementById('restartingScreen');
var printFinalScore = document.getElementById('printFinalScore');
var scoreTableList = document.getElementById('scoreTableList');
var start = document.getElementById('start');
start.addEventListener('click', timerToStart);
var restart = document.getElementById('restart');
restart.addEventListener('click', resetGame);
var saveScore = document.getElementById('saveScore');
saveScore.addEventListener('click', saveScoreDB);
var pseudoEntered = document.getElementById('pseudoEntered');


function addHighestScore(){

	highestScores = scoreFinal.sort(function(a, b){return b-a});

	while(highestScoreList.firstChild){
		highestScoreList.removeChild(highestScoreList.firstChild);
	}

	highestScores.forEach(function(scoreSorted){
		var highestScoreListElement = document.createElement('LI');
		highestScoreListElement.appendChild(document.createTextNode(scoreSorted));
		highestScoreList.appendChild(highestScoreListElement);
	})
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA6v1vWxgTTSGCVLOzYAS2AOXfITWTMUIg",
  authDomain: "piou-piou.firebaseapp.com",
  databaseURL: "https://piou-piou.firebaseio.com",
  projectId: "piou-piou",
  storageBucket: "piou-piou.appspot.com",
  messagingSenderId: "974687654331"
};
firebase.initializeApp(config);

const dbRefObject = firebase.database().ref().child('scores');
const dbRefList = dbRefObject.child('score');

function saveScoreDB(){
  if(pseudoEntered.value.length > 0){
    dbRefList.update({
      [pseudoEntered.value] : {"scoreSaved":scoreFinal[0], "order": -scoreFinal[0]}
    })
  }
}


dbRefList.orderByChild("order").limitToLast(10).on('child_added', snap => {
  const li = document.createElement('li');
  for(var i=0; i<10; i++){
    li.innerText = snap.key + " : " + snap.val().scoreSaved;
    li.id = snap.key;
    scoreTableList.appendChild(li);
  }
})