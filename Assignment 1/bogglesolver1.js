exports.findAllSolutions = function (grid, dictionary) {
  let solutions_Set = new Array();
  let solutions = [];

  if (grid == null || dictionary == null) {
    //checks of grid or dict is empty
    return solutions;
  }

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length != grid.length) {
      return solutions;
    }
  }

  convertToLowerCase(grid, dictionary);
  let trie = new Set(dictionary);

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      let visited = new Array(grid.length)
        .fill(false)
        .map(() => new Array(grid.length).fill(false));
      let word = []; //is empty to start
      findWords(word, grid, trie, x, y, visited, solutions_Set);
    }
  }
  solutions = Array.from(solutions_Set);
  return solutions;
};

function findWords(word, grid, trie, y, x, visited, solutions_Set) {
  //this is the recursive call
  const adjacent_lookup = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  //given a wor and grid[y][x] and visited[y][x]
  //Base cases:
  // y/x out of bounds
  // it already visited grid [y][x]

  if (
    y < 0 ||
    y >= grid.length ||
    x < 0 ||
    x >= grid.length ||
    visited[y][x] == true
  )
    return;

  //1. append grid [y][x] to the word
  word += grid[y][x]; //word = word + grid

  //2. check if word is a prefix
  if (isPrefix(trie, word)) {
    visited[y][x] = true;

    //2a. check if prefix is marked as visited
    //2b. test if word is valid

    if (isWord(trie, word)) {
      //2b. if word is valid: word is added to solution_Set
      solutions_Set.push(word);
    }

    //2c. call findWords, and call each adjacent grid[y][x]
    for (let i = 0; i < 8; i++) {
      findWords(
        word,
        grid,
        trie,
        y + adjacent_lookup[i][0],
        x + adjacent_lookup[i][1],
        visited,
        solutions_Set
      );

      //3. unmark visited[y][x]
    }
  }

  visited[y][x] = false;
}

//will return true if prefix is found in the trie
function isPrefix(trie, word) {
  //O(N) operation

  for (let tword of trie) {
    if (tword.substr(0, word.length) == word) {
      return true;
    }
  }
  return false;
}

//returns true if word is found in the trie
function isWord(trie, word) {
  for (let tword of trie) {
    if (tword == word && word.length >= 3) {
      return true;
    }
  }
  return false;
}
function convertToLowerCase(grid, dictionary) {
  for (let x = 0; x < grid.length; x++) {
    for (let i = 0; i < grid[x].length; i++) {
      grid[x][i] = grid[x][i].toLowerCase();
    }
  }
  for (let x = 0; x < dictionary.length; x++) {
    dictionary[x] = dictionary[x].toLowerCase();
  }
}
