
"use strict"




var entropy = { }





const log2 = function (num) {
	return Math.log(num) / Math.log(2)
}

entropy.shannonEntropyOf = (len, base) => {
	return Math.floor(len * log2(base))
}




module.exports = entropy
