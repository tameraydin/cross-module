# Cross Module Generator
Rapidly create modules that can be used both on Node.js & Browser.

- CommonJS & AMD support
- [ES6](https://babeljs.io/docs/learn-es6/) support via [Babel](https://babeljs.io/)
- [Gulpfile](http://gulpjs.com/) with tasks to watch, test & build.
- Ready to publish [Bower](http://bower.io/docs/creating-packages/#bowerjson) & [package.json](https://docs.npmjs.com/getting-started/creating-node-modules)
- Testing environment: [Jasmine](http://jasmine.github.io/2.1/introduction.html) + [Istanbul](https://github.com/gotwarlost/istanbul)
- [Travis CI](https://travis-ci.org) & [Coveralls](https://coveralls.io/) integration

## Getting Started
Install [Yeoman](http://yeoman.io/) and Cross Module Generator:

```bash
npm install -g yo
npm install -g generator-cross-module
```

Initialize the generator:

```bash
yo cross-module
```

## Usage
1. Run ``gulp watch``, work on **/src**
2. Execute ``gulp autotest``, write your tests
3. Finally, create distribution files with ``gulp build``
4. Publish!

## Live Examples
- [logical-phrase](https://github.com/tameraydin/logical-phrase)
- [hangman-engine](https://github.com/tameraydin/hangman-engine)

## License

MIT [http://tameraydin.mit-license.org/](http://tameraydin.mit-license.org/)
