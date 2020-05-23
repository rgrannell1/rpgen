
const fs = require('fs')
const readline = require('readline')
const constants = require('../commons/constants')

const createInput = { }

createInput.stdin = async () => {
	return process.stdin
}

createInput.fpath = fpath => {
	const isReadableFlag = fs.R_OK

	const handledMessage = {
		[constants.errCodes.noEntry]:  ( ) => {
			return `ERROR: could not read from "${fpath}"; does the file exist?\n`
		},
		[constants.errCodes.noAccess]: ( ) => {
			return `ERROR: could not read from "${fpath}", as it isn't read-accessible.\n`
		}
	}

	return new Promise((resolve, reject) => {
		fs.access(fpath, isReadableFlag, err => {
			if (err) {
				const message = handledMessage.hasOwnProperty(err.code)
					? handledMessage[err.code]( )
					: err.message

				process.stderr.write(message)
				process.exit(1)
			} else {
				resolve(fs.createReadStream(fpath))
			}
		})
	})
}

const readWords = async fpath => {
	const lines = [ ]
	const inputSource = createInput[fpath ? 'fpath' : 'stdin']
	const input = await inputSource(fpath)

	return new Promise((resolve, reject) => {
		readline.createInterface({input})
			.on('line', line => {
				lines.push(line)
			})
			.on('close', ( ) => {
				resolve(lines)
			})
	})
}

module.exports = readWords
