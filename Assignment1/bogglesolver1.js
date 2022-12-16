/**
 * Name: Yasmin Senior
 * SID: @02965903
 * Credit to: Chad Toomer and Shane Olliver
 * Credit to: softnami.com "Trie Tree with JavaScript" (2020)
 * Credit to: Professor Burge 
 * 
 *
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
  let finalans = [];
  if (grid == null || dictionary == null){
    return finalans;
  }
  
  let lenofgrid = grid.length;
  for (let i=0; i<lenofgrid; i++){
    if (grid[i].length != lenofgrid){
      return finalans;
    }
  }
  convertToLowerCase(grid, dictionary); //jump to function below via local call
  
  if (!isTheGridValid(grid)){
    return finalans;
  }
  
  let newans = new Set();
  let hash = createHashMap(dictionary); //you may also use a trie tree
  
  for (let y=0; y<lenofgrid; y++){
    for (let x=0; x<lenofgrid; x++){
      let new_word = "";
      let beenvisit = new Array(lenofgrid).fill(false).map(() => new Array(lenofgrid).fill(false));
      findWordsInGrid(new_word, y, x, grid, beenvisit, hash, newans) 
    }
  }
  finalans = Array.from(newans);
  
  return finalans;
  
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
  
  function isTheGridValid(grid){
    searching = /(st|qu) | [a-prt-z]/;
    for (let i=0; i < grid.length; i++){
      for (let j=0; j<grid[i].length; j++){
        if(!grid[i][j].match(searching)){
          return finalans;
        }
      }
    }
    return grid;
  } 
  
  function findWordsInGrid(new_word, y, x, grid, beenvisit, hash, newans){
    let adjMatrix = [[-1,-1], [-1,0], [-1,1], [0,1], [1,1], [1,0], [1, -1], [0, -1]];
    
    if (y<0 || x<0 || y>=grid.length || x>=grid.length || beenvisit[y][x] == true){
      return;
    }
    
    new_word += grid[y][x];
    
    if (isPrefix(new_word, hash)){
      beenvisit[y][x] = true;
      
      if (isWord(new_word, hash)){
        if (new_word.length >= 3){
          newans.add(new_word);
        }
      }
      
      for (let i=0; i<8; i++){
      findWordsInGrid(new_word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, beenvisit, hash, newans);
      } 
   }
    
    beenvisit[y][x] = false;
  
  }
  
  
  function isPrefix(new_word, hash){
    return hash[new_word] != undefined;
  }
  
  function isWord(new_word, hash){
    return hash[new_word] == 1;
  }
  
  
  function createHashMap(dictionary){
    var dicth = {};
    for (let i=0; i<dictionary.length; i++){
      dicth[dictionary[i]] = 1;
      let wordlen = dictionary[i].length;
      var strhash = dictionary[i];
      for (let j=wordlen; wordlen > 1; wordlen--){
        strhash = strhash.substr(0, wordlen-1);
        if (strhash in dicth){
          if (strhash == 1){
            hashdict[strhash] = 1;
          }
        }
        else{
          dicth[strhash] = 0;
        }
      }
    }
    return dicth;
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