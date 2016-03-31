
"use strict"





const showOutput = (args, data) => {

	var message = ''
	message += data.selected.join(args.delimiter)

	if (!args.passwordOnly) {

		message += '   '
		message += data.entropies.dictEntropy

		message += '   '
		message += data.entropies.charEntropy

	}

	console.log(message)

}





module.exports = showOutput
