
# Rpgen v0.1.0 [![Build Status](https://travis-ci.org/rgrannell1/rpgen.svg)](https://travis-ci.org/rgrannell1/rpgen)

Generate a high entropy, memorable password.





## Usage

```
$ rpgen --help
$ rpgen
```
The output is of the format `<password> <dictionaryEntropy> <characterEntropy>`

```
houstonlarynxbacardibleaklycalipering    80    194
```
### "houstonlarynxbacardibleaklycalipering isn't *that* memorable."

It's more memorable than `yIRXLbae6ixc0BXXtYxG`.





## Security

### Random Word Selection

![Random Data Bitmap](rand-image.png)

Random words are selected using a cryptographically secure random number generator derived from
Node.js's `crypto.randomBytes`. This generator is tested against `dieharder` to ensure it works as
expected.





## Requirements

- Node.js >= v5.0.0





## License

The MIT License

Copyright (c) 2016 Ryan Grannell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.





### Versioning

Versioning complies with the Semantic Versioning 2.0.0 standard.

http://semver.org/
