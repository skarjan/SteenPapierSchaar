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

  // Voor ontwikkeldoeleinden, verwijder voordat je live gaat 8-)
  spelerNaamDisplay = "Arjan";
  computerNaamDisplay = "Computernaam";


  //event listeners toevoegen aan invoer knoppen
  for ( let i = 0 ; i < buttons.length ; i++){
      buttons[i].addEventListener('click', playGame);
  }
//   // keyboard input control
// document.addEventListener('keydown', fn)
// // keydown functie
// function fn () {
//   console.log("test");
// }



  function playGame(e)  {
    // update score

    //Verwijderd de kleur van de vorige uitslag winst/verlies/gelijk
    // wordt pas ná de eerste keer uitgevoerd
    berichtInvoerID.classList.remove("bg-success", "text-white");
    berichtInvoerID.classList.remove("bg-info");
    berichtInvoerID.classList.remove("bg-danger", "text-white");

     // Vragen om naam als deze niet al is ingesteld.
      if (spelerNaamDisplay == "Spelernaam:") {
      spelerNaamDisplay = voerNaamSpelerIn();
    }
    // Vragen om computer-naam als deze niet al is ingesteld.
     if (computerNaamDisplay == "CPU: ") {
      computerNaamDisplay = voerNaamComputerIn();
   }
      //invoer van speler koppelen aan de betreffende knoppen
      let spelerInvoer = e.target.innerText;
      // Functie berekend een willekeurige getal tussen 0 en 1
      let cpuInvoer = Math.random();

      //als waarde < 34, CPU selects Steen <= Steen en de rest schaar
      if (cpuInvoer < .20){
          cpuInvoer = 'Steen';
      } else if (cpuInvoer <= .40){
          cpuInvoer = 'Papier';
        } else if (cpuInvoer <= .60){
            cpuInvoer = 'Hagedis';
        } else if (cpuInvoer <= .85){
            cpuInvoer = 'Spock';
        } else {
          cpuInvoer = 'Schaar';
      }

      // Functie om de invoeren te vergelijken en winnaar te bepalen.
      let result = checkWinner(spelerInvoer, cpuInvoer);

      //scoren weergeven in DOM
      if (result === spelerNaamDisplay){
          berichtInvoerID.classList.add("p-3", "mb-2", "bg-success", "text-white");
          result += ' is de winnaar';
          //score bijwerken
          winnaarScores[0]++;
      }

      if (result === computerNaamDisplay){
          berichtInvoerID.classList.add("p-3", "mb-2", "bg-danger", "text-white");
          result += ' is de winnaar';
          winnaarScores[1]++;
      }

      if (result === 'Gelijkspel'){
          berichtInvoerID.classList.add("p-3", "mb-2", "bg-info");
          result += ', er is geen winnaar'
      }

      //score weergeven in de betreffende score div
      score.innerHTML =  spelerNaamDisplay + " " + winnaarScores[0]
      + ": " + computerNaamDisplay + " " + winnaarScores[1];

      let realScore = (winnaarScores[0] - winnaarScores[1])*3;

      if (realScore  <= -1) {
        realScoreID.innerHTML = "Score: 0";
      } else {
        realScoreID.innerHTML = "Score: "+realScore;
      }





      //weergeven wat speler en CPU hebben ingevoerd

      messenger(spelerNaamDisplay + ": "
      + spelerInvoer + " " + computerNaamDisplay
      + ": " + cpuInvoer + " ", result);
}


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

      if (Speler === 'Steen'){
          if(CPU === 'Papier' || CPU === 'Spock'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }

      if (Speler === 'Papier'){
          if (CPU === 'Schaar' || CPU === 'Hagedis'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }

      if (Speler === 'Schaar'){
          if (CPU === 'Steen' || CPU === 'Spock'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
      if (Speler === 'Hagedis'){
          if (CPU === 'Steen' || CPU === "Schaar"){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
      if (Speler === 'Spock'){
          if (CPU === 'Papier' || CPU === "Hagedis"){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
  } // einde functie
