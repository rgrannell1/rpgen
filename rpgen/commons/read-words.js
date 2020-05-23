
const fs = require('fs')
const readline = require('readline')
const constants = require('../commons/constants')

const createInput = { }

/**
 * Return stdin
 *
 * @returns {Stream}
 */
createInput.stdin = async () => {
	return process.stdin
}

/**
 * Return a read stream to a file-path.
 *
 * @param {string} fpath the dictionary file-path
 *
 * @returns {Promise<Stream>} a read stream
 */
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

/**
 * Read lines of words from a dictionary
 *
 * @param {string} fpath the file-path to a dictionary
 *
 * @returns {Promise<Array<string>>} lines from the dictionary
 */
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
