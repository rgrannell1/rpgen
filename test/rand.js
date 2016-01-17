#!/usr/bin/env node

"use strict"





const doc = `
Usage:
	rand [-n NUM | --number NUM] [-s | --start]

Options:
	-n NUM, --number NUM    [default: 10000]
`




const rand     = require('rpgen/crypto/rand-int')
const commons  = require('rpgen/commons/commons')





const docopt   = require('docopt').docopt
const args     = docopt(doc)





const required = parseInt(args['--number'], 10)





const callback = (err, number) => {

	const numString = number.toString( )
	const message   = commons.string.repeat(10, ' ').slice(0, 10 - numString.length) + numString

	console.log(message)

}





for (let ith = 0; ith < required; ++ith) {
	rand.randInt32(callback)
}
