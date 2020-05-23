
const showOutput = (args, data) => {
	let message = data.selected.join(args.delimiter)

	if (!args.passwordOnly) {
		message += `   ${data.entropies.dictEntropy}   ${data.entropies.charEntropy}`
	}

	console.log(message)
}

module.exports = showOutput
