#!/usr/bin/env node

"use strict"




const doc = `
Name:
	rpgen — Generate a high entropy, memorable password.

Usage:
	rpgen (-f WORDS | --fpath WORDS)     [-n NUM | --num NUM] [-p | --password-only] [-d DELIMITER | --delimiter DELIMITER]
	rpgen (-g NAME  | --dictionary NAME) [-n NUM | --num NUM] [-p | --password-only] [-d DELIMITER | --delimiter DELIMITER]
	rpgen                            [-n NUM | --num NUM] [-p | --password-only] [-d DELIMITER | --delimiter DELIMITER] [--] -
	rpgen (-h | --help | --version)

Description:
	Rpgen — Random password generator — chooses random words from an input dictionary to use as a password.

Security:
	Random words are selected using a cryptographically secure random number
	generator derived from the Node.js builtin 'crypto.randomBytes'. This RNG is verified against the 'dieharder' test suite.

Options:
	-f WORDS, --fpath WORDS                A path containing the words to derive the password from.
	-g NAME, --dictionary NAME             The name of the build-in dictionary to use.
	-d DELIMITER, --delimiter DELIMITER    The delimiter to use between words [default: -].
	-n NUM, --num NUM                      The number of words to choose. [default: 6]
	-p, --password-only                    Do not display the password entropy.
	-h, --help                             Display this documentation.

Arguments:
	-                                      Read words from standard input.
`





const docopt = require('docopt').docopt
const rpgen  = require('../app/rpgen')
const args   = docopt(doc)





rpgen(args)