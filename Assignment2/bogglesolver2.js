/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */

//Collaborated with Deontae Smith and Chad Toomer
 
exports.findAllSolutions = function (grid, dictionary) {
  let finalans = [];
 
   if (grid == null || dictionary == null){
   return finalans;
   }
 
 
   let gridlen = grid.length
   let gridgood = true;
   for (let i=0; i < gridlen; i++){
     if (grid[i].length != gridlen){
       return finalans;
     }
   }
 
   lowercaseFunctionHelp(grid, dictionary);
 
   let hash = newHash(dictionary);
   let answerset = new Set();
 
   for (let y_Coor = 0; y_Coor < gridlen; y_Coor++) {
     for (x_Coor = 0; x_Coor < gridlen; x_Coor++) {
       let word = "";
       let hasvisited = new Array(gridlen).fill(false).map(() => new Array(gridlen).fill(false));
       findWords(word, y_Coor, x_Coor, grid, hasvisited, hash, answerset);
     }
   }
 
   finalans = Array.from(answerset);
   return finalans;
 };
 
 lowercaseFunctionHelp = function (grid, dict) {
   for (let i = 0; i < grid.length; i++) {
     for (let j = 0; j < grid[i].length; j++) {
       grid[i][j] = grid[i][j].toLowerCase();
     }
   }
 
   for (let i = 0; i < dict.length; i++) {
     dict[i] = dict[i].toLowerCase();
   }
 };
 
 findWords = function (word, y_Coor, x_Coor, grid, hasvisited, hash, answerset) {
   let neighbor_Coor = [
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
     y_Coor < 0 ||
     x_Coor < 0 ||
     y_Coor >= grid.length ||
     x_Coor >= grid.length ||
     hasvisited[y_Coor][x_Coor] == true
   )
     return;
 
   word += grid[y_Coor][x_Coor];
 
   if (hash[word] != undefined) {
     hasvisited[y_Coor][x_Coor] = true;
 
     if (hash[word] == 1) {
       if (word.length >= 3) answerset.add(word);
     }
 
     for (let i = 0; i < 8; i++) {
       findWords(
         word,
         y_Coor + neighbor_Coor[i][0],
         x_Coor + neighbor_Coor[i][1],
         grid,
         hasvisited,
         hash,
         answerset
       );
     }
   }
   hasvisited[y_Coor][x_Coor] = false;
 };
 
 
 newHash = function (dictionary) {
   var dict = {};
   for (let i = 0; i < dictionary.length; i++) {
     dict[dictionary[i]] = 1;
     let wordlength = dictionary[i].length;
     var str = dictionary[i];
 
     for (let j = wordlength; wordlength > 1; wordlength--) {
       str = str.substr(0, wordlength - 1);
 
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
 
 
 
 
 var grid = [['T', 'W', 'Y', 'R'],
               ['E', 'N', 'P', 'H'],
               ['G', 'Z', 'Qu', 'R'],
               ['St', 'N', 'T', 'A']];
 var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                     'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                     'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
 
 console.log(exports.findAllSolutions(grid, dictionary));
 
 