class Solution {
  /**
   * @param {string[]} strs
   * @returns {string}
   */
  encode(strs) {
    let enclodedStr = "";
    for (const str of strs) {
      enclodedStr += `${str.length}#${str}`;
    }
    return enclodedStr;
  }

  /**
   * @param {string} str
   * @returns {string[]}
   */
  decode(str) {
    const result = [];
    let i = 0;

    while (i < str.length) {
      // Step 1: find '#'
      let j = i;
      while (str[j] !== "#") {
        j++;
      }

      // Step 2: extract length
      const length = parseInt(str.substring(i, j));

      // Step 3: extract actual string
      const word = str.substring(j + 1, j + 1 + length);

      result.push(word);

      // Step 4: move pointer
      i = j + 1 + length;

      console.log(i, j, length, word);
    }

    return result;
  }
}

const solutionClass = new Solution();
// const encode = solutionClass.encode([""]);
const encode = solutionClass.encode(["Hello", "World1"]);
const decode = solutionClass.decode(encode);
console.log(encode, decode);
