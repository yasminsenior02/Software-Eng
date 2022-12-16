const boggle_solver = require("/home/codio/workspace/Boggle_Testing/boggle_solver.js");
/**
 * Name: Allan Shane Oliver
 * SID: @02940666
 * Credit to: softnami.com "Trie Tree with JavaScript" (2020)
 * Credit to: GeeksforGeeks.com "Boggle (Find all possible words in a board
 * of characters) | Set 1" (2020)
 * Credit to: Professor Burge "Lecture 13 Sept" (2021)
 *
 * Lowercases a string array in-place. (Used for case-insensitive string array matching).
 * @param {string[]} stringArray - String array to be lowercase.
 */
function lowercaseStringArray(stringArray) {
  for (let i = 0; i < stringArray.length; i++)
    stringArray[i] = stringArray[i].toLowerCase();
}

describe("Boggle Solver tests suite:", () => {
  describe("Normal input", () => {
    test("normal gridn 4x4", () => {
      let grid = [
        ["L", "W", "B", "H"],
        ["O", "I", "A", "G"],
        ["V", "M", "T", "U"],
        ["S", "E", "N", "D"],
      ];
      let dictionary = [
        "sad",
        "bag",
        "cat",
        "mail",
        "love",
        "mat",
        "bat",
        "rat",
        "tag",
        "lit",
        "hat",
        "has",
        "had",
        "end",
        "send",
      ];
      let expected = [
        "bag",
        "mail",
        "love",
        "mat",
        "bat",
        "tag",
        "lit",
        "hat",
        "end",
        "send",
      ];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("normal grid 3x3", () => {
      let grid = [
        ["A", "B", "C"],
        ["G", "H", "I"],
        ["J", "K", "O"],
      ];
      let dictionary = ["hi", "ok", "bag", "cab", "bio", "ohio", "job"];
      let expected = ["bio", "bag"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("normal gridrid 4x4", () => {
      let grid = [
        ["L", "O", "N", "Z"],
        ["P", "R", "U", "V"],
        ["W", "X", "Y", "M"],
        ["A", "B", "C", "D"],
      ];
      let dictionary = ["run", "rum", "wax", "can", "rot"];
      let expected = ["run", "rum", "wax"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  describe("Problem constraints", () => {
    test("grid containing Qu", () => {
      let grid = [
        ["T", "W", "Y", "R"],
        ["E", "N", "P", "H"],
        ["G", "Z", "Qu", "R"],
        ["O", "N", "T", "A"],
      ];

      let dictionary = [
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
      let expected = [
        "ten",
        "wet",
        "went",
        "ego",
        "net",
        "new",
        "newt",
        "pry",
        "prat",
        "get",
        "gent",
        "qua",
        "quar",
        "quart",
        "quartz",
        "rat",
        "tar",
        "tarp",
        "art",
      ];

      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("grid containing St", () => {
      let grid = [
        ["D", "St", "A"],
        ["F", "R", "E"],
        ["J", "M", "O"],
      ];
      let dictionary = ["red", "dream", "steam", "star", "more"];
      let expected = ["star", "more"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("grid containing both Qu and St", () => {
      let grid = [
        ["D", "St", "A"],
        ["Qu", "E", "R"],
        ["I", "D", "F"],
      ];
      let dictionary = ["red", "star", "quid", "query", "quest", "fed", "deaf"];
      let expected = ["red", "star", "quid", "quest", "fed"];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });

  describe("Input edge cases", () => {
    // Example Test using Jess
    test("Dictionary is empty", () => {
      //(Edge case) Since there are no possible solution, it should return an empty list.
      let grid = [
        ["A", "B", "C", "D"],
        ["E", "F", "G", "H"],
        ["I", "J", "K", "L"],
        ["M", "N", "O", "P"],
      ];
      let dictionary = [];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      // Lowercasing for case-insensitive string array matching.
      lowercaseStringArray(solutions);
      lowercaseStringArray(expected);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("Grid is empty", () => {
      let grid = [[]];
      let dictionary = [
        "art",
        "ego",
        "gent",
        "grid",
        "get",
        "net",
        "new",
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
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("uppercase dictionary with lowercase grid", () => {
      let grid = [
        ["t", "w", "y", "r"],
        ["e", "n", "p", "h"],
        ["g", "z", "qu", "r"],
        ["o", "n", "t", "a"],
      ];
      let dictionary = [
        "ART",
        "EGO",
        "GENT",
        "GET",
        "NET",
        "NEW",
        "NEWT",
        "PRAT",
        "QUART",
        "TEN",
        "WENT",
        "ARTY",
        "EGG",
        "NOT",
        "QUAR",
      ];
      let expected = [
        "ten",
        "went",
        "ego",
        "net",
        "new",
        "newt",
        "prat",
        "get",
        "gent",
        "quar",
        "quart",
        "art",
      ];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });

    test("empty grid and empty dictionary", () => {
      let grid = [[]];
      let dictionary = [];
      let expected = [];
      let solutions = boggle_solver.findAllSolutions(grid, dictionary);
      expect(solutions.sort()).toEqual(expected.sort());
    });
  });
});
