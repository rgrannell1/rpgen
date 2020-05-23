
const crypto = require('crypto')

/*
convert 4 bytes into a 32 bit unsigned integer.
*/
const convertBytesToInteger = buffer => {
	return buffer.readUInt32BE( )
}

/*

map random bytes onto random numbers in the range `0...upperBound`.

there are 8 bits per byte, so we need to request a number of bytes n such that
2 ^ (8 x n) is equal to or larger than the input `upperBound`.

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

const randFloat = async () => {
	const number = await randInt32()
	return number / Math.pow(2, 32)
}

const randInt = async upperBound => {
	const rfloat = await randFloat()
	return Math.floor(rfloat * upperBound)
}

module.exports = {
	randInt32,
	randInt,
	randFloat
}
