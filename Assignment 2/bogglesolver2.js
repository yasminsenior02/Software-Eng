exports.findAllSolutions = function (grid, dictionary) {
  let solutions = [];
  if (grid == null || dictionary == null) {
    return solutions;
  }

  let gridlen = grid.length;
  for (let i = 0; i < gridlen; i++) {
    if (grid[i].length != gridlen) {
      return solutions;
    }
  }
  convertToLowerCase(grid, dictionary); //jump to function below via local call

  if (!isTheGridValid(grid)) {
    return solutions;
  }

  let solutionSet = new Set();
  let hash = createHashMap(dictionary); //you may also use a trie tree

  for (let y = 0; y < gridlen; y++) {
    for (let x = 0; x < gridlen; x++) {
      let foundword = "";
      let visited = new Array(gridlen)
        .fill(false)
        .map(() => new Array(gridlen).fill(false));
      findWordsInGrid(foundword, y, x, grid, visited, hash, solutionSet); //recursive function call
    }
  }
  solutions = Array.from(solutionSet);

  return solutions;

  function convertToLowerCase(grid, dictionary) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = grid[i][j].toLowerCase();
      }
    }

    for (let i = 0; i < dictionary.length; i++) {
      dictionary[i] = dictionary[i].toLowerCase();
    }
  }

  function isTheGridValid(grid) {
    searchfor = /(st|qu) | [a-prt-z]/;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (!grid[i][j].match(searchfor)) {
          return solutions;
        }
      }
    }
    return grid;
  }

  function findWordsInGrid(foundword, y, x, grid, visited, hash, solutionSet) {
    let adjMatrix = [
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
      y < 0 ||
      x < 0 ||
      y >= grid.length ||
      x >= grid.length ||
      visited[y][x] == true
    ) {
      return;
    }

    foundword += grid[y][x];

    if (isPrefix(foundword, hash)) {
      visited[y][x] = true;

      if (isWord(foundword, hash)) {
        if (foundword.length >= 3) {
          solutionSet.add(foundword);
        }
      }

      for (let i = 0; i < 8; i++) {
        findWordsInGrid(
          foundword,
          y + adjMatrix[i][0],
          x + adjMatrix[i][1],
          grid,
          visited,
          hash,
          solutionSet
        );
      }
    }

    visited[y][x] = false;
  }

  function isPrefix(foundword, hash) {
    return hash[foundword] != undefined;
  }

  function isWord(foundword, hash) {
    return hash[foundword] == 1;
  }

  function createHashMap(dictionary) {
    var hashdict = {};
    for (let i = 0; i < dictionary.length; i++) {
      hashdict[dictionary[i]] = 1;
      let wordlength = dictionary[i].length;
      var hashstr = dictionary[i];
      for (let j = wordlength; wordlength > 1; wordlength--) {
        hashstr = hashstr.substr(0, wordlength - 1);
        if (hashstr in hashdict) {
          if (hashstr == 1) {
            hashdict[hashstr] = 1;
          }
        } else {
          hashdict[hashstr] = 0;
        }
      }
    }
    return hashdict;
  }
};

var grid = [
  ["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"],
];

var dictionary = [
  "art",
  "ego",
  "gent",
  "get",
  "net",
  "new",
  "newt",
  "prat",
  "pry",
  "qua",
  "quart",
  "quartz",
  "rat",
  "tar",
  "tarp",
  "ten",
  "went",
  "wet",
  "arty",
  "egg",
  "not",
  "quar",
];

console.log("These words were found in the boggle grid\n");

console.log(exports.findAllSolutions(grid, dictionary));
