
"use strict"




const rand      = require('../crypto/rand-int')
const commons   = require('../commons/commons')
const readWords = require('../fs/read-words')
const entropy   = require('../crypto/entropy')





const chooseWords = (args, callback) => {

	readWords(args.stdin ? null : args.fpath, (err, content) => {

		if (err) {
			throw err
		}

		const charset    = commons.string.getCharset(content.join(''))
		const words      = content.map(word => word.toLowerCase( ))

		if (words.length === 0) {
			return
		}

		commons.async.repeat(
			args.number,
			rand.randInt.bind({ }, words.length),
			randIndices => {

			const chosenWords       = randIndices.map(index => words[index])
			const chosenWordsLength = chosenWords
				.map(word =>  word.length)
				.reduce((acc, num) => acc + num, 0)

			callback({
				selected: chosenWords,
				entropies: {
					dictEntropy: entropy.shannonEntropyOf(args.number,    words.length),
					charEntropy: entropy.shannonEntropyOf(chosenWordsLength, charset.length)
				}
			})

		})

	})

}





module.exports = chooseWords
