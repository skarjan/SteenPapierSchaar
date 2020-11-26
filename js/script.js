  const bericht = document.querySelector('.bericht');
  const score = document.querySelector('.score');
  const buttons = document.querySelectorAll('button');
  const winnaarScores = [0,0];

  //event listeners toevoegen aan alle knoppen
  for ( let i = 0 ; i < buttons.length ; i++){
      buttons[i].addEventListener('click', playGame);
  }

  function playGame(e){
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
      if (result === 'Speler'){
          result += ' wint!!';
          //score bijwerken
          winnaarScores[0]++;
      }

      if (result === 'CPU'){
          result += ' wint!!';
          winnaarScores[1]++;
      }

      if (result === 'Gelijkspel'){
          result += '. Helaas...'
      }

      //score weergeven in de betreffende score div
      score.innerHTML = 'Speler: [ ' + winnaarScores[0]+ ' ] CPU: [ ' + winnaarScores[1] + ' ]';

      //weergeven wat speler en CPU hebben ingevoerd
      messenger('Speler: <strong>' + spelerInvoer + '<br></strong> CPU: <strong>' + cpuInvoer + '</strong><br>' + result);
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
              return 'CPU';
          } else {
              return 'Speler';
          }
      }

      if (Speler === 'Papier'){
          if (CPU === 'Schaar'){
              return 'CPU';
          } else {
              return 'Speler';
          }
      }

      if (Speler === 'Schaar'){
          if (CPU === 'Steen'){
              return 'CPU';
          } else {
              return 'Speler';
          }
      }
  }
