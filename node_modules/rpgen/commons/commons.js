
"use strict"





const commons = {
	async:  { },
	string: { }
}




commons.async.repeat = (repetitions, fn, callback, acc) => {

	var collected = acc ? acc : [ ]

	if (repetitions === 0) {
		return callback(collected)
	}

	process.nextTick(

		fn.bind({ }, (err, data) => {

			if (err) {
				throw err
			}

			process.nextTick(
				commons.async.repeat.bind({ }, repetitions - 1, fn, callback, collected.concat(data))
			)

		})

	)

}





commons.string.getCharset = chars => {

	const unique = [ ]

	for (let ith = 0; ith < chars.length; ++ith) {

		var char = chars.charAt(ith)

		if (unique.indexOf(char) === -1) {
			unique.push(char)
		}

	}

	return unique

}





commons.string.repeat = (num, char) => {

	var out = ''

	for (var ith = 0; ith < num; ++ith) {
		out += char
	}

	return out

}





module.exports = commons
