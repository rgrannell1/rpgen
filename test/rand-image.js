
"use strict"





const rand       = require('rpgen/crypto/rand-int')
const nodeCanvas = require('canvas')
const fs         = require('fs')


const canvas     = new nodeCanvas(512, 512)
const ctx        = canvas.getContext('2d')





const randomNumberPNG = (ith, jth, callback) => {

	if (ith === 512 && jth === 512) {
		callback( )
	} else if (ith > 512) {
		randomNumberPNG(0, jth + 1, callback)
	} else {

		rand((err, num) => {

			if (num >= 0.5) {
 				ctx.fillStyle = "black"
			} else {
 				ctx.fillStyle = "white"
			}

			ctx.fillRect(ith, jth, 1, 1)

			randomNumberPNG(ith + 1, jth, callback)

		})

	}
}





randomNumberPNG(0, 0, ( ) => {

	ctx.save( )

	canvas.createPNGStream( ).on('data', chunk => {
		process.stdout.write(chunk)
	})

})
