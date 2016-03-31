
"use strict"




const path        = require('path')

const constants   = require('../commons/constants')
const chooseWords = require('../crypto/choose-words')
const showOutput  = require('../app/show-output')




const rpgen = rawArgs => {

	const args = rpgen.validate(rpgen.preprocess(rawArgs))

	chooseWords(args, showOutput.bind({ }, args))

}

rpgen.preprocess = rawArgs => {

	return {
		number:       parseInt(rawArgs['--num'], 10),
		stdin:        rawArgs['-'],
		fpath:        rpgen.preprocess.fpath(rawArgs),
		passwordOnly: rawArgs['--password-only'],
		delimiter:    rawArgs['--delimiter']
	}

}

rpgen.preprocess.fpath = rawArgs => {

	var fpath
	const dictionary = rawArgs['--dictionary']

	if (rawArgs['--fpath']) {

		fpath = path.resolve(rawArgs['--fpath'])

	} else if (constants.dictionaries.indexOf(dictionary) !== -1) {

		fpath = path.resolve(path.join(__dirname, '../../..'), `data/${dictionary}.txt` )

	} else {

		console.error(`dictionary named "${dictionary}" does not exist in list of options "${constants.dictionaries}"`)
		process.exit(1)

	}

	return fpath

}





rpgen.validate = args => {

	if (args.number === 0) {

		process.stderr.write('rpgen: cannot create length-zero password.\n')
		process.exit(1)

	}

	if (args.number < 0) {

		process.stderr.write('rpgen: cannot create negative length password.\n')
		process.exit(1)

	}

	if (args.number !== args.number) {

		process.stderr.write('rpgen: NaN or Infinity used as a password length.\n')
		process.exit(1)

	}

	return args

}





module.exports = rpgen
