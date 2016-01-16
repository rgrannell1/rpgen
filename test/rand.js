#!/usr/bin/env node

"use strict"





const doc = `
Usage:
	rand [-n NUM | --number NUM]

Options:
	-n NUM, --number NUM    [default: 10000]
`




const rand     = require('rpgen/crypto/rand-int')
const docopt   = require('docopt').docopt
const args     = docopt(doc)

const required = parseInt(args['--number'], 10)



const callback = (err, number) => {
	console.log(number)
}

for (let ith = 0; ith < required; ++ith) {
	rand(callback)
}
