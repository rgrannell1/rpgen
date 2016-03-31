
"use strict"




const fs         = require('fs')
const readline   = require('readline')
const constants  = require('../commons/constants')





const createInput = { }

createInput.stdin = (_, callback) => {
	callback(process.stdin)
}

createInput.fpath = (fpath, callback) => {

	const isReadableFlag = fs.R_OK

	const handledMessage = {
		[constants.errCodes.noEntry]:  ( ) => {
			return `ERROR: could not read from "${fpath}"; does the file exist?\n`
		},
		[constants.errCodes.noAccess]: ( ) => {
			return `ERROR: could not read from "${fpath}", as it isn't read-accessible.\n`
		}
	}

	fs.access(fpath, isReadableFlag, err => {

		if (err) {

			const message = handledMessage.hasOwnProperty(err.code)
				? handledMessage[err.code]( )
				: err.message

			process.stderr.write(message)
			process.exit(1)

		} else {

			return callback(fs.createReadStream(fpath))

		}


	})

}





const readWords = (fpath, callback) => {

	const lines                = [ ]
	createInput[fpath ? 'fpath' : 'stdin'](fpath, input => {

		readline.createInterface({input})
		.on('line', line => {
			lines.push(line)
		})
		.on('close', ( ) => {
			callback(null, lines)
		})

	})

}





module.exports = readWords
