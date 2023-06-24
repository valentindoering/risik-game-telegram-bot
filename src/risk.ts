
export function risk_attack(text: string): string {
  const n_people: string = text;
  const attacker: number = parseInt(n_people[0]);
  const defender: number = parseInt(n_people[1]);

  const roll_dice = (): number => Math.floor(Math.random() * 6) + 1;
  const n_dices = (n: number): number[] => [...Array(n)].map(_ => roll_dice()).sort((a, b) => b - a);
  const throw_dice: number[][] = [n_dices(attacker), n_dices(defender)];


  let outStr: string = `🎲 attacker (${throw_dice[0]}) | defender (${throw_dice[1]}) \n`;

  outStr += Array(Math.min(attacker, defender)).fill(null).map((_, i) => {
      const attacker_val: number = throw_dice[0][i];
      const defender_val: number = throw_dice[1][i];
      return attacker_val <= defender_val
        ? `🥊 minus attacker army (A${attacker_val} D${defender_val})`
        : `🔫 minus defender army (A${attacker_val} D${defender_val})`;
    }).join('\n')
  
    return outStr
}

function shuffle(array: string[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function assignValuesToPlayers(values: string[], numOfPlayers: number): string[][] {
  const numOfValues = values.length;
  const numOfValuesPerPlayer = Math.floor(numOfValues / numOfPlayers);
  const numOfPlayersWithExtraValue = numOfValues % numOfPlayers;

  const players: string[][] = [];
  let valueIndex = 0;

  // Assign values to players
  for (let i = 0; i < numOfPlayers; i++) {
    const numOfValuesForPlayer = numOfValuesPerPlayer + (i < numOfPlayersWithExtraValue ? 1 : 0);
    const playerValues: string[] = [];

    for (let j = 0; j < numOfValuesForPlayer; j++) {
      playerValues.push(values[valueIndex++]);
    }

    players.push(playerValues);
  }

  return players;
}

export function divide_countries(nPlayers: number): string {
  const countries = [
    'Alaska',
    'Alberta (Western Canada)',
    'Central America',
    'Eastern United States',
    'Greenland',
    'Northwest Territory',
    'Ontario (Central Canada)',
    'Quebec (Eastern Canada)',
    'Western United States',
  
    // South America
    'Argentina',
    'Brazil',
    'Peru',
    'Venezuela',
  
    // Europe
    'Great Britain (Great Britain & Ireland)',
    'Iceland',
    'Northern Europe',
    'Scandinavia',
    'Southern Europe',
    'Ukraine (Eastern Europe, Russia)',
    'Western Europe',
  
    // Africa
    'Congo (Central Africa)',
    'East Africa',
    'Egypt',
    'Madagascar',
    'North Africa',
    'South Africa',
  
    // Asia
    'China',
    'India (Hindustan)',
    'Irkutsk',
    'Japan',
    'Kamchatka',
    'Middle East',
    'Mongolia',
    'Siam (Southeast Asia)',
    'Siberia',
    'Ural',
    'Yakutsk',
  
    // Australia
    'Eastern Australia',
    'Indonesia',
    'New Guinea',
    'Western Australia',
  ];

  shuffle(countries)
  const playerCountries = assignValuesToPlayers(countries, nPlayers)

  let outStr = `Total: ${countries.length} countries\n`
  for (let i = 0; i < nPlayers; i++) {
    outStr += `  Player ${i + 1}: ${playerCountries[i].length} countries\n`
  }
  outStr += `\n`

  for (let i = 0; i < nPlayers; i++) {
    const playerCountries_i = playerCountries[i]
    outStr += `Player ${i + 1} (${playerCountries_i.length})\n`
    for (let j = 0; j < playerCountries_i.length; j++) {
      outStr += `  ${playerCountries_i[j]}\n`
    }
    outStr += `\n\n`
  }

  return outStr
}


