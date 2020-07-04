
const crypto = require('crypto')

/**
 * convert 4 bytes into a 32 bit unsigned integer.
 *
 * @param {buffer} buffer an input buffer
 *
 * @returns {number} an unsigned int 32 range number
 */
const convertBytesToInteger = buffer => {
  return buffer.readUInt32BE()
}

/**
 * Return a random unsigned int32
 *
 * @param {Promise<number>} a random number
 */
const randInt32 = async () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(4, (err, buffer) => {
      if (err) {
        reject(err)
      } else {
        resolve(convertBytesToInteger(buffer))
      }
    })
  })
}

/**
 * Return a number in the range 0...1
 *
 * @returns {number} a random number in the range 0...1
 */
const randFloat = async () => {
  const number = await randInt32()
  return number / Math.pow(2, 32)
}

/**
 * Return a number in the range 0...upperBound
 *
 * @param {number} upperBound the upper bound of the random number
 *
 * @returns {number} a random number
 */
const randInt = async upperBound => {
  const rfloat = await randFloat()
  return Math.floor(rfloat * upperBound)
}

module.exports = {
  randInt32,
  randInt,
  randFloat
}
