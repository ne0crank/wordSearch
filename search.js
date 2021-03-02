/***
 * search (grid, wordlist)
 * This function accepts a grid (a 2d array of letters)
 * and a wordlist (an array of words to search for). The function finds any words
 * that exist in the word search in any of the 8 possible directions (up, down, left, right
 * and all 4 diagonal directions). This function is case-insensitive in its matching.
 *
 * Returns: an array of words that can be found in the word search
 ***/
module.exports = function search (grid, wordlist) {

  // set initial variables
  let foundWords = [];

  const goodChar = (char) => {
    return (char.match(/^[A-Za-z]+$/));
  };

  const makeGood = (char) => {
    return char.toLowerCase();
  };

  if ( (grid.length > 0) && (wordlist.length > 0) ) {
    // set grid and wordList to lowercase
    let badGrid = [];
    let badWord = [];

    let lowerGrid = grid.map( row => {
      return row.map( cell => {
        if (goodChar(cell)) {
          return makeGood(cell);
        } else {
          badGrid.push(cell);
        };
      });
    });

    let lowerList = wordlist.map( word => {
      return word.split('').map( letter => {
        if ( goodChar(letter) ) {
          return makeGood(letter);
        } else {
          badWord.push(letter);
        };
      });
    });

    if ( badGrid.length > 0 ) {
      console.log("Bad characters found in [grid]: ", badGrid);
      exit(0);
    }
    if ( badWord.length > 0 ) {
      console.log("bad characters found in [wordlist]: ", badWord);
      exit(0);
    }

    // debug statement : display list of lowercase letters and words
    console.log(lowerGrid, lowerList);

    // directional functions
    let goUp = (row, col) => { return (--row, col) };
    let goDown = (row, col) => { return (++row, col) };
    let goLeft = (row, col) => { return (row, --col) };
    let goRight = (row, col) => { return (row, ++col) };
    let diagUpLeft = (row, col) => { return (--row, --col) };
    let diagUpRight = (row, col) => { return (--row, ++col) };
    let diagDownLeft = (row, col) => { return (++row, --col) };
    let diagDownRight = (row, col) => { return (++row, ++col) };

    // rotate through lowerGrid with characters in lowerList
    for ( wod = 0; wod < lowerList.length; wod++ ) {
      let wordFound = [];
      for ( row = 0; row < lowerGrid.length; row++ ) {
        for ( col = 0; col < row.length; col++ ) {
          // 1. find first letter of the word (wod) in the grid
          let currGridLoc = [row, col];
          let currGridChr = lowerGrid[row][col];
          let currWordLoc = [wod, 0];
          let currWordChr = lowerList[wod][0];
          if ( currWordChr === currGridChr ) {
            // start with north star: up
            for ( chr = 1; chr < wod.length; chr++ ) {
              wordFound.push(currGridChr);
              currGridLoc = goUp(currGridLoc);
              currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
              currWordLoc = goUp(currWordLoc);
              currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
              if ((!currGridChr) || (currGridChr != currWordChr)) {
                console.log('word: ', wod, ' found: ', wordFound);
                break;
              }
            }
            if ( wordFound === wod.split('') ) {
              foundWords.push(wod);
            }
          }
          // next: diagonal-up-right
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = diagUpRight(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = diagUpRight(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // next: right
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = goRight(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = goRight(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // next: diagonal-down-right
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = diagDownRight(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = diagDownRight(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // next: down
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = goDown(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = goDown(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // next: diagonal-down-left
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = diagDownLeft(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = diagDownLeft(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // next: left
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = goLeft(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = goLeft(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // lastly: diagonal-up-left
          for ( chr = 1; chr < wod.length; chr++ ) {
            wordFound.push(currGridChr);
            currGridLoc = diagUpLeft(currGridLoc);
            currGridChr = lowerGrid[currGridLoc[0]][currGridLoc[1]];
            currWordLoc = diagUpLeft(currWordLoc);
            currWordChr = lowerList[currWordLoc[0]][currWordLoc[1]];
            if ((!currGridChr) || (currGridChr != currWordChr)) {
              console.log('word: ', wod, ' found: ', wordFound);
              break;
            }
          }
          if ( wordFound === wod.split('') ) {
            foundWords.push(wod);
          }
          // 2. if found, set current position. if not found, next word
          // 3. if found, use directional functions to find further letters in word
          // 4. if all letters in word found in a series, add word to foundWords
        }
      }
    }

    console.log(foundWords);
    return foundWords;

  } else if ( grid ) {
    foundWords[0] = "No valid data found in [wordlist] file";
  } else if ( wordList ) {
    foundWords[0] = "No valid data found in [grid] files";
  } else {
    foundWords[0] = "No valid data found in [grid] or [wordlist] files";
  }

}
