
const commons = {
  string: { }
}

/**
 * Get the character set of a string
 *
 * @param {string} chars a string
 *
 * @returns {Array<string>} an array of characters
 */
commons.string.getCharset = chars => {
  return [...new Set(chars.split(''))]
}

module.exports = commons
