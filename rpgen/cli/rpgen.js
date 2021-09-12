#!/usr/bin/env node

const constants = require('../commons/constants')

const dictionaries = constants.dictionaries.map(dict => `            * ${dict}`).join('\n')

const doc = `
Name:
  rpgen — Generate a high entropy, memorable password.

Usage:
  rpgen
  rpgen [-n NUM | --num NUM] [-p | --password-only] [-d DELIM | --delimiter DELIM]
  rpgen (-f WORDS | --fpath WORDS)     [-n NUM | --num NUM] [-p | --password-only] [-d DELIM | --delimiter DELIM]
  rpgen (-g NAME  | --dictionary NAME) [-n NUM | --num NUM] [-p | --password-only] [-d DELIM | --delimiter DELIM]
  rpgen (-h | --help | --version)

Description:
  Rpgen — Random password generator — chooses random words from an input dictionary to use as a password. The program outputs three space-seperated values:

  * a password created by combining randomly-chosen words from a dictionary.
  * the "naive" entropy of a password of n words chosen from a dictionary of k words
  * the entropy of the total number of letters chosen from a uniform character set of "letters" present in the dictionary. Note that the
    letter frequency will vary in most dictionaries, so this is only a rough estimate.

  The latter two values are guides to help you determine how resistant a password is to brute-force guessing. A typical password output looks like:

    rpgen --dictionary english
    > bermuda-ur-cuneiform-flippers-sluggishness-dejects   96   23

Security:
  Random words are selected using a cryptographically secure random number generator derived from the Node.js builtin 'crypto.randomBytes'. This RNG
  is verified against the 'dieharder' test suite.

  The strength of the password depends on the quality of the input dictionary. If a short or repetitive dictionary is chosen, generated passwords will be weak.

Examples:
  Generate a password using the provided english dictionary

    rpgen --dictionary english
    > bermuda-ur-cuneiform-flippers-sluggishness-dejects   96   23

  Generate an eight-word password
    rpgen -n 8 --dictionary english
    > alabamians-magyar-diluted-questioned-bites-gurus-hardships-jilting   129   309

  Generate an underscore delimited, four-word password
    rpgen -n 4 --dictionary english -d _
    > enables_convocation_neutralizer_starts   64   183

  Generate an eight-word koremutake password, with no seperator between 'words'
    rpgen -n 8 --dictionary koremutake -d ''
    > grefrogefrynofranibi   56   87

  Hide the entropy values on-output
    rpgen --dictionary english -p
    > fraught-submersible-adhesion-obstetrical-oboists-doctoral

  Use a custom dictionary from a file-path.

    rpgen --fpath my_newline_delimited_list_of_words.txt
    > gould-ovations-deign-conveyances-prizefighters-mcleod   96   251

  Convert output values to a JSON object, using column and jq utilies which you may need to install

    rpgen | column -J --table-columns 'password,char_entropy,dict_entropy' | jq '.table[0]'
    {
      "password": "hawking-manfred-divinest-ganges-soaring-tittered",
      "naive_entropy": "96",
      "character_entropy": "225"
    }

Options:
  -f WORDS, --fpath WORDS                A path containing the words to derive the password from.
  -g NAME, --dictionary NAME             The name of the build-in dictionary to use. [default: english] The supported dictionaries are:
${dictionaries}
  -d DELIM, --delimiter DELIM            The delimiter seperating words in the output password [default: -].
  -n NUM, --num NUM                      The number of words to choose from the input file or dictionary. [default: 6]
  -p, --password-only                    Do not display the password entropy.
  -h, --help                             Display this documentation.

Authors:
  Róisín Grannell <r.grannell2@gmail.com>
Version:
  v${constants.packageJson.version}

Copyright:
  The MIT License
  Copyright (c) 2021 Róisín Grannell
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
