
const path = require('path')

const constants = require('../commons/constants')
const chooseWords = require('../crypto/choose-words')
const showOutput = require('../app/show-output')

const rpgen = async rawArgs => {
	const args = rpgen.validate(rpgen.preprocess(rawArgs))

	const data = await chooseWords(args)
	showOutput(args, data)
}

rpgen.preprocess = rawArgs => {
	return {
		number: parseInt(rawArgs['--num'], 10),
		stdin: rawArgs['-'],
		fpath: rpgen.preprocess.fpath(rawArgs),
		passwordOnly: rawArgs['--password-only'],
		delimiter: rawArgs['--delimiter']
	}
}

rpgen.preprocess.fpath = rawArgs => {

	var fpath
	const dictionary = rawArgs['--dictionary']

	if (rawArgs['--fpath']) {
		return path.resolve(rawArgs['--fpath'])
	}

	if (constants.dictionaries.includes(dictionary)) {
		return path.resolve(path.join(__dirname, '..'), `data/${dictionary}.txt` )
	}

	console.error(`dictionary named "${dictionary}" does not exist in list of options "${constants.dictionaries.join(', ')}"`)
	process.exit(1)
}

rpgen.validate = args => {
	if (args.number === 0) {
		console.error('rpgen: cannot create length-zero password.')
		process.exit(1)
	}

	if (args.number < 0) {
		console.error('rpgen: cannot create negative length password.')
		process.exit(1)
	}

	if (args.number !== args.number) {
		console.error('rpgen: NaN or Infinity used as a password length.')
		process.exit(1)
	}

	return args
}

module.exports = rpgen
