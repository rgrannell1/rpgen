
const entropy = { }

/**
 * Calculate log2 of a value
 *
 * @param {number} num an input number
 *
 * @return {number} the log2 of an input number
 */
const log2 = function (num) {
  return Math.log(num) / Math.log(2)
}

/**
 * Calculate the shannon entropy of a password
 *
 * @param {number} len the length of the password
 * @param {number} base the size of the dictionary / character set
 *
 * @returns {number} the shannon entropy
 */
entropy.shannonEntropyOf = (len, base) => {
  return Math.floor(len * log2(base))
}

module.exports = entropy
