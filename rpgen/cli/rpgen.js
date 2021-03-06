#!/usr/bin/env node

const constants = require('../commons/constants')

const dictionaries = constants.dictionaries.map(dict => `            * ${dict}`).join('\n')

const doc = `
Name:
  rpgen — Generate a high entropy, memorable password.

Usage:
  rpgen
  rpgen [-n NUM | --num NUM] [-p | --password-only] [-d DELIM | --delimiter DELIM] -
  rpgen (-f WORDS | --fpath WORDS)     [-n NUM | --num NUM] [-p | --password-only] [-d DELIM | --delimiter DELIM]
  rpgen (-g NAME  | --dictionary NAME) [-n NUM | --num NUM] [-p | --password-only] [-d DELIM | --delimiter DELIM]
  rpgen (-h | --help | --version)

Description:
  Rpgen — Random password generator — chooses random words from an input dictionary to use as a password. The program outputs three space-seperated values:

  * a password created by combining randomly-chosen words from a dictionary.
  * the naive entropy of a password of n words chosed from a dictionary of k words
  * the entropy of the total number of letters chosen from a uniform character set of letters present in the dictionary. Note that the
    letter frequency will vary in most dictionaries, so this is only a rough estimate.

  The latter two values are guides to help you determine how resistant a password is to brute-force guessing.

Security:
  Random words are selected using a cryptographically secure random number generator derived from the Node.js builtin 'crypto.randomBytes'. This RNG
  is verified against the 'dieharder' test suite.

  The strength of the password depends on the quality of the input dictionary. If a short or repetitive dictionary is chosen, generated passwords will be weak.

Example:
  rpgen --dictionary english
  bermuda-ur-cuneiform-flippers-sluggishness-dejects   96   23

Options:
  -f WORDS, --fpath WORDS                A path containing the words to derive the password from.
  -g NAME, --dictionary NAME             The name of the build-in dictionary to use. [default: english] The supported dictionaries are:
${dictionaries}
  -d DELIM, --delimiter DELIM            The delimiter seperating words in the output password [default: -].
  -n NUM, --num NUM                      The number of words to choose from the input file or dictionary. [default: 6]
  -p, --password-only                    Do not display the password entropy.
  -h, --help                             Display this documentation.

Arguments:
  -                                      Read words from standard input, rather than a file or built-in dictionary.

Authors:
  ${constants.packageJson.author}
Version:
  v${constants.packageJson.version}

Copyright:
  The MIT License
  Copyright (c) 2020 Róisín Grannell
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software, and to permit
  persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies
  or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
  OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
`

const docopt = require('docopt').docopt
const rpgen = require('../app/rpgen')
const args = docopt(doc)

rpgen(args)
