
const commons = {
	async:  { },
	string: { }
}

commons.string.getCharset = chars => {
	return [...new Set(chars.split(''))]
}

module.exports = commons
