
# Rpgen

Generate a high entropy, memorable password.

## Usage

```
$ rpgen --help
$ rpgen
```
The output is of the format `<password> <dictionaryEntropy> <characterEntropy>`; see `Security` for notes on entropy.

```
stacking-patty-divergent-tiresome-deviants   80   199
```
### "stacking-patty-divergent-tiresome-deviants isn't *that* memorable."

It's more memorable than `yIRXLbae6ixc0BXXtYxG`.

## Security

### Random Word Selection

Random words are selected using a cryptographically secure random number generator derived from
Node.js's `crypto.randomBytes`. This generator is tested, as described below.

### Entropy

A password's information entropy quantifies its resistance to brute-force attacks. For example, it would take up to `2e80 ~ 1.2e+24` attempts to guess a password with `80` bits of entropy.

```
entropy = log2( number-of-possible-symbols ^ { number-of-symbols-used  } )
```

The character entropy is the entropy of the password when a 'naive' attack is carried out; that is, if the password is 100 characters long the attacker is brute-forcing all combinations of 100 characters. This
is a reasonable assumption for many brute-force attacks, especially if you use a private input dictionary rather
than the stock one supplied with this tool.

The second included entropy, the dictionary entropy, is the entropy of the password when each combination of words is brute-forced. This entropy will be much lower, but under this view the password should still be secure.

## Testing

### Random Bitmap Test

rpgen passes the superficial but important "random-bitmap" test:

![Random Data Bitmap](rand-image.png)

for comparison, PHPs `rand( )` does not

![PHP Random Data](https://www.random.org/analysis/randbitmap-wamp-section.png)

### Dieharder

rpgen was also tested against 100,000,000 (1.1Gb) random integers.

## Changelog

### v0.4.0

- Granted snapcraft access to home file reads, fixing some issues with custom rpgen dictionaries
- Added many examples, as requested by a displeased user. Every operation `rpgen` can perform is now documented
- Removed stdin support, since it didn't work with snapcraft and is essentially unneeded given file-parameter arguments

### v0.3.0

- Fixed support for standard input; running `rpgen -` now behaves as expected
- Rpgen now uses a default english-langugage dictionary. Running `rpgen -g english` was not an intuitive workflow. Language patches are welcome to support other languages!

## License

The MIT License

Copyright (c) 2020 Róisín Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
