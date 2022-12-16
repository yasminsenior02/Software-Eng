/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 * Credit and Collaborated to Chad toomer and Deontae Smith
 */

 exports.findAllSolutions = function(grid, dictionary) {
  let finalans = [];

  if (grid == null || dictionary == null) {
    return finalans;
  }


  const gridlen = grid.length;
  for (let i=0; i < gridlen; i++) {
    if (grid[i].length != gridlen) {
      return finalans;
    }
  }

  lowercaseFunctionHelp(grid, dictionary);

  const hash = newHash(dictionary);
  const answerset = new Set();

  for (let yCoor = 0; yCoor < gridlen; yCoor++) {
    for (xCoor = 0; xCoor < gridlen; xCoor++) {
      const word = '';
      const hasvisited = new Array(gridlen).fill(false).map(() =>
        new Array(gridlen).fill(false));
      findWords(word, yCoor, xCoor, grid, hasvisited, hash, answerset);
    }
  }

  finalans = Array.from(answerset);
  return finalans;
};

lowercaseFunctionHelp = function(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
};

findWords = function(word, yCoor, xCoor, grid, hasvisited, hash, answerset) {
  const neighborCoor = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  if (
    yCoor < 0 ||
    xCoor < 0 ||
    yCoor >= grid.length ||
    xCoor >= grid.length ||
    hasvisited[yCoor][xCoor] == true
  ) {
    return;
  }

  word += grid[yCoor][xCoor];

  if (hash[word] != undefined) {
    hasvisited[yCoor][xCoor] = true;

    if (hash[word] == 1) {
      if (word.length >= 3) solutionSet.add(word);
    }

    for (let i = 0; i < 8; i++) {
      findWords(word, yCoor + neighborCoor[i][0], xCoor + neighborCoor[i][1],
          grid, hasvisited, hash, answerset);
    }
  }
  hasvisited[yCoor][xCoor] = false;
};


newHash = function(dictionary) {
  const dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlen = dictionary[i].length;
    let str = dictionary[i];

    for (wordlen; wordlen > 1; wordlen--) {
      str = str.substr(0, wordlen - 1);

      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};

const grid = [['T', 'W', 'Y', 'R'],
  ['E', 'N', 'P', 'H'],
  ['G', 'Z', 'Qu', 'R'],
  ['St', 'N', 'T', 'A']];
const dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
  'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
  'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));
