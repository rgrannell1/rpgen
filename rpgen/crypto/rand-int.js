
"use strict"




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

const randInt32 = callback => {

	crypto.randomBytes(4, (err, buffer) => {
		callback(err, convertBytesToInteger(buffer))
	})

}

const randFloat = callback => {
	randInt32((err, number) => {
		callback(err, number / Math.pow(2, 32))
	})
}

const randInt = (upperBound, callback) => {
	randFloat((err, float) => {
		callback(err, Math.floor(float * upperBound))
	})
}




module.exports = {
	randInt32,
	randInt,
	randFloat
}
