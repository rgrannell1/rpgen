#!/usr/bin/env node

"use strict"





const doc = `
Usage:
	rand-image [-w WIDTH | --width WIDTH] [-h HEIGHT| --height HEIGHT]

Options:
	-w WIDTH, --width WIDTH       [default: 512]
	-h HEIGHT, --height HEIGHT    [default: 512]
`




const rand       = require('rpgen/crypto/rand-int')




const docopt     = require('docopt').docopt
const nodeCanvas = require('canvas')
const fs         = require('fs')

const args       = docopt(doc)




const dimensions = {
	height: parseInt(args['--height'], 10),
	width:  parseInt(args['--width'], 10)
}
const canvas = new nodeCanvas(dimensions.width, dimensions.height)
const ctx    = canvas.getContext('2d')





const randomNumberPNG = (ith, jth, callback) => {

	if (ith === dimensions.width && jth === dimensions.height) {
		callback( )
	} else if (ith > dimensions.width) {
		randomNumberPNG(0, jth + 1, callback)
	} else {

		rand((err, num) => {

			if (err) {
				throw err
			}

			ctx.fillStyle = num >= 0.5 ? "black" : "white"
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
