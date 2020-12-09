  //  Variablen waar alle functies bij kunnen.
  const bericht = document.querySelector('.bericht');
  const score = document.querySelector('.score');
  const buttons = document.querySelectorAll('button');
  const winnaarScores = [0,0];
  let spelerNaamDisplay = document.getElementById("spelerNaam").innerHTML;
  let computerNaamDisplay = document.getElementById("computerNaam").innerHTML;

  // Voor ontwikkeldoeleinden, verwijder voor productie
  // spelerNaamDisplay = "Arjan";
  // computerNaamDisplay = "Computernaam";



  //event listeners toevoegen aan invoer knoppen
  for ( let i = 0 ; i < buttons.length ; i++){
      buttons[i].addEventListener('click', playGame);
  }

  function playGame(e)  {

      if (computerNaamDisplay == "CPU: "){
      computerNaamDisplay = voerNaamIn();
    }
      if (spelerNaamDisplay == "Spelernaam:") {
      spelerNaamDisplay = voerNaamIn();
    }
      //invoer van speler koppelen aan de betreffende knoppen
      let spelerInvoer = e.target.innerText;
      // Functie berekend een willekeurige getal tussen 0 en 1
      let cpuInvoer = Math.random();

      //als waarde < 34, CPU selects Steen <= Steen en de rest schaar
      if (cpuInvoer < .34){
          cpuInvoer = 'Steen';
      } else if (cpuInvoer <= .67){
          cpuInvoer = 'Papier';
      } else {
          cpuInvoer = 'Schaar';
      }

      // Functie om de invoeren te vergelijken en winnaar te bepalen.
      let result = checkWinner(spelerInvoer, cpuInvoer);

      //scoren weergeven in DOM
      if (result === spelerNaamDisplay){
          result += ' wint!!';
          //score bijwerken
          winnaarScores[0]++;
      }

      if (result === computerNaamDisplay){
          result += ' wint!!';
          winnaarScores[1]++;
      }

      if (result === 'Gelijkspel'){
          result += '. Helaas...'
      }

      //score weergeven in de betreffende score div
      score.innerHTML =  spelerNaamDisplay + " " + winnaarScores[0]
      + ": " + computerNaamDisplay + " " + winnaarScores[1];

      //weergeven wat speler en CPU hebben ingevoerd
      messenger(spelerNaamDisplay + ": "
       + spelerInvoer + " " + computerNaamDisplay
       + ": " + cpuInvoer + " " + result);
  }

  function voerNaamIn (promptAntwoord) {
    promptAntwoord = prompt("Naam?, COMPUTER")
    return promptAntwoord;
  }

  function messenger(selectionbericht){
      bericht.innerHTML = selectionbericht;
  }

  function checkWinner(Speler, CPU){
      if (Speler === CPU){
          return 'Gelijkspel';
      }

      if (Speler === 'Steen'){
          if(CPU === 'Papier'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }

      if (Speler === 'Papier'){
          if (CPU === 'Schaar'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }

      if (Speler === 'Schaar'){
          if (CPU === 'Steen'){
              return computerNaamDisplay;
          } else {
              return spelerNaamDisplay;
          }
      }
  }
