
"use strict"





const rand       = require('rpgen/crypto/rand-int')
const nodeCanvas = require('canvas')


const canvas     = new nodeCanvas(512, 512)
const ctx        = canvas.getContext('2d')

for (let ith = 0; ith < 512; ++ith) {
	for (let jth = 0; jth < 512; ++jth) {

		ctx.fillRect(ith, jth, 1, 1)

	}
}





const required = process.argv[2]





const callback = (err, number) => {
	console.log(number)
}

for (let ith = 0; ith < required; ++ith) {
	rand(callback)
}
