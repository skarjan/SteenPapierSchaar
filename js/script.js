  //  Globale Variablen waar alle functies bij kunnen.
  const berichtInvoer = document.querySelector('.berichtInvoer');
  const bericht = document.querySelector('.bericht');
  const score = document.querySelector('.score');
  const buttons = document.querySelectorAll('button');
  const winnaarScores = [0,0];
  let spelerNaamDisplay = document.getElementById("spelerNaam").innerHTML;
  let computerNaamDisplay = document.getElementById("computerNaam").innerHTML;
  // uitslag word gekoppeld aan een html element om weer te geven
  let berichtInvoerID = document.getElementById("berichtInvoerID");
  let realScoreID = document.getElementById("realScoreID");
  // speler invoer
  let spelerInvoer = "";

  // Voor ontwikkeldoeleinden, verwijder voordat je live gaat 8-)
  // spelerNaamDisplay = "Arjan";
  // computerNaamDisplay = "Computernaam";

  //event listeners toevoegen aan invoer knoppen
  for ( let i = 0 ; i < buttons.length ; i++){
      buttons[i].addEventListener('click', captureEvent);
  }
  // toetsaanslagen opvangen
  document.addEventListener('keydown', captureEvent);

// vangt click en keydown events op
function captureEvent (e) {
console.log(e.type)
    if (e.type == "click"){
      determineClickAction(e);
    } else if (e.type == "keydown") {
      determineKeyAction(e);
    } else {
        return alert("Nog niet goed ingesteld");
    }
}

// wat te doen bij welke toetsaanslag.
function determineKeyAction (e) {
  if (e.keyCode === 82) {
   document.getElementById("steen-knop").click();
} else if (e.keyCode === 80) {
   document.getElementById("papier-knop").click();
} else if (e.keyCode === 83) {
   document.getElementById("schaar-knop").click();
} else if (e.keyCode === 72) {
   document.getElementById("hagedis-knop").click();
} else if (e.keyCode === 79) {
   document.getElementById("spock-knop").click();
 }
}//einde functie

// wat te doen bij welke klik
function determineClickAction (e) {
  let buttonValue = e.target.value;
  if (buttonValue == "steen" || buttonValue == "schaar" ||
      buttonValue == "papier" || buttonValue == "spock" ||
      buttonValue == "hagedis") {
    playGame(e);
  } else {
    return alert("Dit gaat fout...");
  }
} // einde functie

  function playGame(e)  {

    // pre-game routine: klasses verwijderen van de resultaten,
    // kijken of er al namen zijn ingesteld, vastleggen van de speler invoer,
    // generen van een cpu invoer. Daarna start de game

    // verwijderd de kleur en animaties van de vorige uitslag winst/verlies/gelijk
    // wordt pas ná de eerste keer uitgevoerd
    berichtInvoerID.classList.remove("bg-success", "text-white", 'animate__animated', 'animate__pulse');
    berichtInvoerID.classList.remove("bg-info");
    berichtInvoerID.classList.remove("bg-danger", "text-white", 'animate__animated', 'animate__headShake');

     // kijken of er al namen zijn ingesteld
      if (spelerNaamDisplay == "Spelernaam:") {
      spelerNaamDisplay = voerNaamSpelerIn();
    }
    // vragen om computer-naam als deze niet al is ingesteld.
     if (computerNaamDisplay == "CPU: ") {
      computerNaamDisplay = voerNaamComputerIn();
   }
      // invoer van speler koppelen aan de betreffende knoppen/toetsen
      if (e.type == 'click') {
      spelerInvoer = e.target.value;
    } else if (e.type == 'keydown') {
      console.log(e.key);
    } else console.log("gaat iets fout");

      // functie berekend een willekeurige getal tussen 0 en 1
      let cpuInvoer = Math.random();

      // verdeling van CPU invoer adh van random() resultaat
      if (cpuInvoer < .20){
          cpuInvoer = 'steen';
      } else if (cpuInvoer <= .40){
          cpuInvoer = 'papier';
        } else if (cpuInvoer <= .60){
            cpuInvoer = 'hagedis';
        } else if (cpuInvoer <= .80){
            cpuInvoer = 'spock';
        } else {
          cpuInvoer = 'schaar';
      }

      // game in uitvoering
      // Functie om de invoeren te vergelijken en winnaar te bepalen.
      let result = checkWinner(spelerInvoer, cpuInvoer);

      //Hoe en welke uitslage weer te geven
      if (result === spelerNaamDisplay){
          berichtInvoerID.classList.add("bg-success", "text-white", 'animate__animated', 'animate__pulse');
          berichtInvoerID.addEventListener('animationend', removeAnimation);
          result += ' is de winnaar';
          winnaarScores[0]++;
      }

      if (result === computerNaamDisplay){
          berichtInvoerID.classList.add("bg-danger", "text-white", 'animate__animated', 'animate__headShake');
          berichtInvoerID.addEventListener('animationend', removeAnimation);
          result += ' is de winnaar';
          winnaarScores[1]++;
      }

      if (result === 'Gelijkspel'){
          berichtInvoerID.classList.add("bg-info");
          result += ', er is geen winnaar'
      }

      // post-game routine
      //score weergeven in de betreffende score div
      score.innerHTML =  spelerNaamDisplay + " " + winnaarScores[0]
      + ": " + computerNaamDisplay + " " + winnaarScores[1];

      let realScore = (winnaarScores[0] - winnaarScores[1])*3;

      // totaalscore berekenen en weergeven
      if (realScore  <= -1) {
        realScoreID.innerHTML = "Score: 0";
      } else {
        realScoreID.innerHTML = "Score: "+realScore;
      }

      //weergeven wat speler en CPU hebben ingevoerd
      messenger(spelerNaamDisplay + ": "
      + spelerInvoer + " " + computerNaamDisplay
      + ": " + cpuInvoer + " ", result);
} // einde van de play game functies

//  begin functies die aangeroepen worden in playGame()

  function voerNaamSpelerIn (promptAntwoordSpeler) {
    promptAntwoordSpeler = prompt("Wat is je naam?", "Vul hier je naam in")
    return promptAntwoordSpeler;
  }

  function voerNaamComputerIn (promptAntwoordComputer) {
    promptAntwoordComputer = prompt("Hoe moet de tegenstander heten?", "Vul hier een naam in")
    return promptAntwoordComputer;
  }

  function messenger(uitslag, invoer){
      bericht.innerHTML = uitslag;
      berichtInvoer.innerHTML = invoer;
  }

  function checkWinner(Speler, CPU){
      if (Speler === CPU){
          return 'Gelijkspel';
      }

      if (Speler === 'steen'){
          if(CPU === 'papier' || CPU === 'spock'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }

      if (Speler === 'papier'){
          if (CPU === 'schaar' || CPU === 'hagedis'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }

      if (Speler === 'schaar'){
          if (CPU === 'steen' || CPU === 'spock'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
      if (Speler === 'hagedis'){
          if (CPU === 'steen' || CPU === "schaar"){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
      if (Speler === 'spock'){
          if (CPU === 'papier' || CPU === "hagedis"){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
  } // einde functie

// function om de animaties te verwijderen bij het einde van een animatie
function removeAnimation (e) {
  berichtInvoerID.classList.remove('animate__animated', 'animate__headShake', 'animate__pulse');
}
