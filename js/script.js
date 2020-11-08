var getKnop = document.getElementById("testKnop"); // pak knop0 in html
var getKnopSteen = document.getElementById("steen-knop");
var getKnopPapier = document.getElementById("papier-knop");
var getKnopSchaar = document.getElementById("schaar-knop");

// het weergeven van 0 op de score
var ownScore = document.getElementById("eigenScore");
var npcScore = document.getElementById("pcScore");
ownScore.innerHTML = 0;
npcScore.innerHTML = 0;



// functie voor klik op de waarde boven
// getKnop.onclick = mijnKlikFunctie;
getKnopSteen.onclick = mijnKlikFunctie;
getKnopPapier.onclick = mijnKlikFunctie;
getKnopSchaar.onclick = mijnKlikFunctie;


function mijnKlikFunctie() {
  var invoer = this.value;
  var t = new Date(); // datum object aanmaken
  var tS = t.getMilliseconds(); // neem Millisecs van datum obj
  var resVeld0 = document.getElementById("displayVeld0")
  var resVeld1 = document.getElementById("displayVeld1")
  var npc = "";
  var ownScore = document.getElementById("eigenScore");
  var npcScore = document.getElementById("pcScore");

// logica voor de AI
if (tS < 100) {
  npc = "steen";
} else if (tS > 100 && tS < 200) {
     npc = "papier";
} else if (tS > 200 && tS < 300) {
     npc = "schaar";
} else if (tS < 300 && tS < 400) {
     npc = "steen";
} else if (tS > 400 && tS < 500) {
    npc = "papier";
} else if (tS > 500 && tS < 600) {
    npc = "schaar";
} else if (tS > 600 && tS < 700) {
   npc = "steen";
} else if (tS < 700 && tS < 800) {
   npc = "papier";
} else if (tS > 800 && tS < 900) {
   npc = "schaar";
} else if (tS > 900 && tS < 1001) {
   npc = "steen";
} else {
  npc = "papier";
};

// gelijkspel logica geen punten
// var gelijkspel = invoer.localeCompare(npc);
// if (gelijkspel == 0) {
// resVeld1.innerHTML = "gelijkspel";
// console.log("gelijkspel");
//
//
// } else {
// resVeld1.innerHTML = "GEEN gelijkspel"  ;
// };

// steen
if (npc == "steen" && invoer == "schaar") {
  npcScore.innerHTML++;
resVeld1.innerHTML = "verloren"  ;
} else if (npc == "steen" && invoer == "papier") {
  ownScore.innerHTML++;
  resVeld1.innerHTML = "gewonnen"  ;
// papier
} else if (npc == "papier" && invoer == "schaar") {
  ownScore.innerHTML++;
resVeld1.innerHTML = "gewonnen"  ;
} else if (npc == "papier" && invoer == "steen") {
  npcScore.innerHTML++;
  resVeld1.innerHTML = "verloren"  ;
// schaar
} else if (npc == "schaar" && invoer == "steen") {
  ownScore.innerHTML++;
resVeld1.innerHTML = "gewonnen"  ;
} else if (npc == "schaar" && invoer == "papier") {
  npcScore.innerHTML++;
  resVeld1.innerHTML = "verloren"  ;
}
else {
  resVeld1.innerHTML = "gelijkspel";
}

//debuggerij
console.log(npc, invoer);
  resVeld0.innerHTML = "jij: " + invoer + " vs CPU: " + npc; // tekst voor nieuwe element
};
  // einde functie
