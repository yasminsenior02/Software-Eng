/** *
* @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
  if (grid == null || dictionary == null){
    return solutions;
  }
  
  let gridlen = grid.length;
  for (let i=0; i<gridlen; i++){
    if (grid[i].length != gridlen){
      return solutions;
    }
  }
  convertToLowerCase(grid, dictionary); //jump to function below via local call
  
  if (!isTheGridValid(grid)){
    return solutions;
  }
  
  let solutionSet = new Set();
  let hash = createHashMap(dictionary); //you may also use a trie tree
  
  for (let y=0; y<gridlen; y++){
    for (let x=0; x<gridlen; x++){
      let foundWord = "";
      let visited = new Array(gridlen).fill(false).map(() => new Array(gridlen).fill(false));
      findWordsInGrid(foundWord, y, x, grid, visited, hash, solutionSet) //recursive function call
    }
  }
  solutions = Array.from(solutionSet);
  
  return solutions;
   /*
   * Converts all letters/characters in the grid and dictionary to lowercase
   * Returns a grid and a dictionary with all lowercase letters/characters
   */
   function convertToLowerCase(grid, dictionary){
     for (let i=0; i<grid.length; i++){
       for(let j=0; j<grid[i].length; j++){
         grid[i][j] = grid[i][j].toLowerCase();
       }
     }
     
     for (let i=0; i<dictionary.length; i++){
       dictionary[i] = dictionary[i].toLowerCase();
    }
  }
  /*
   * Checks if a grid contains the characters ST or QU
   * Returns the solutions list if grid is invalid, returns the grid if valid
   */
  function isTheGridValid(grid){
    var searchFor = /(st|qu) | [a-prt-z]/;
    for (let i=0; i < grid.length; i++){
      for (let j=0; j<grid[i].length; j++){
        if(!grid[i][j].match(searchFor)){
          return solutions;
        }
      }
    }
    return grid;
  } 
  
  /*
   * Main function to locate words within a grid, using a hashmap and matrix
   * Adds any words found to the output list solutionSet
   */
  function findWordsInGrid(foundWord, y, x, grid, visited, hash, solutionSet){
    let adjMatrix = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1, -1], [0, -1]];
    
    if (y<0 || x<0 || y>=grid.length || x>=grid.length || visited[y][x] == true){
      return;
    }
    
    foundWord += grid[y][x];
    
    if (isPrefix(foundWord, hash)){
      visited[y][x] = true;
      
      if (isWord(foundWord, hash)){
        if (foundWord.length >= 3){
          solutionSet.add(foundWord);
        }
      }
      
      for (let i=0; i<8; i++){
      findWordsInGrid(foundWord, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet);
      } 
   }
    
    visited[y][x] = false;
  
  }
  
  /*
   * Locates prefixes in hashmap, and informs the findWordsInGrid function
   * (the calling function) to keep searching if a prefix was found
   */
  function isPrefix(foundWord, hash){
    return hash[foundWord] != undefined;
  }
  
  /*
   * Locates words in hashmap, and increases the count when a word is found
   */
  function isWord(foundWord, hash){
    return hash[foundWord] == 1;
  }
  
  /*
   * Creates a hashmap to store all values from the dictionary and 
   * match it with values found in the grid
   */
  function createHashMap(dictionary){
    var hashDict = {};
    for (let i=0; i<dictionary.length; i++){
      hashDict[dictionary[i]] = 1;
      let wordLength = dictionary[i].length;
      var hashStr = dictionary[i];
      for (let j=wordLength; wordLength > 1; wordLength--){
        hashStr = hashStr.substr(0, j-1);
        if (hashStr in hashDict){
          if (hashStr == 1){
            hashDict[hashStr] = 1;
          }
        }
        else{
          hashDict[hashStr] = 0;
        }
      }
    }
    return hashDict;
  }
  
} 

var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['O', 'N', 'T', 'A']];

var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log("These words were found in the boggle grid\n");

console.log(exports.findAllSolutions(grid, dictionary));
