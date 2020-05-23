
const rand = require('../crypto/rand-int')
const commons = require('../commons/commons')
const readWords = require('../commons/read-words')
const entropy = require('../crypto/entropy')

/**
 * Select random words
 *
 * @param {Object} args misc options
 *
 * @returns {Promise<Object>} password information
 */
const chooseWords = async args => {
	const fpath = args.stdin
		? null
		: args.fpath
	const content = await readWords(fpath)

	const charset = commons.string.getCharset(content.join(''))
	const words = content.map(word => word.toLowerCase())

	if (words.length === 0) {
		resolve()
	}

	let chosenWordsLength = 0
	const randomWords = []

	for (let ith = 0; ith < args.number; ++ith) {
		let idx = await rand.randInt(words.length)
		let randomWord = words[idx]
		randomWords.push(randomWord)
		chosenWordsLength += randomWord.length
	}

	return {
		selected: randomWords,
		entropies: {
			dictEntropy: entropy.shannonEntropyOf(args.number, words.length),
			charEntropy: entropy.shannonEntropyOf(chosenWordsLength, charset.length)
		}
	}
}

module.exports = chooseWords
