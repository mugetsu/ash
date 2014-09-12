# ASH

[C4](https://bitbucket.org/jondanao/c4) after detonation comes ASH (Automated Scalable HTML5 Boilerplate powered by Grunt)

## Getting Started

1. Install [Node](http://nodejs.org/), [Sass](http://sass-lang.com/install) and [Git](http://git-scm.com/book/en/Getting-Started-Installing-Git) on your machine.

2. [Install Grunt](http://gruntjs.com/getting-started) using `npm install -g grunt-cli`. You may need to use `sudo` in front of the Grunt install command to give it permissions. For Windows tips with Grunt checkout their [FAQs](http://gruntjs.com/frequently-asked-questions).

3. [Install Bower](http://bower.io/) using `npm install -g bower`

4. Clone ASH Boilerplate `https://github.com/mugetsu/ash.git` and navigate your way to your ASH project directory `cd <TO_YOUR_ASH_BOILERPLATE>`

5. Navigate to the `grunt-dev.command` file and double-click it. This will open the Terminal and install the necessary `node_modules` folder, which are ASH's dependencies. The `grunt-dev.command` file includes a `sudo` prefix so you'll need to enter your password to install.

6. The `grunt-dev.command` should install all the dependencies, which you can check back to see in your folder, and then run the commands associated with ASH, and automatically open a new ASH project running on `localhost:9000`.

7. From now on, you can start grunt tasks using `grunt` command, this will run the default tasks while using `grunt build` will execute task for production like minifying css and js files. (you can check the Gruntfile.js for the tasks)

8. Don't forget to give this project a [star!](https://github.com/mugetsu/ash/stargazers). Share more ;)

## Scaffolding

````
├── app
│   ├── apple-touch-icon-precomposed.png
│   ├── theme
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── js
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── images
│   │   └── sprite
│   ├── js
│   │   └── scripts.js
│   │
│   ├── scss
│   │	├── breakpoints
│   │	├── mixins
│   │   ├── modules
│   │   ├── partials
│   │   ├── vendor
│   │   └── style.scss
│   │
│   └── templates
│       ├── includes
│       ├── pages
│       └── partials
│           ├── base
│           ├── blocks
│           └── content
├── docs
├── grunt-build.command
├── grunt-build.bat
├── grunt-dev.command
├── grunt-dev.bat
├── package.json
├── README.md
├── .editorconfig
├── .gitignore
├── .jshintrc
└── .travis.yml
````

## Documentation

You may need to install a few assets before you can [get started](https://github.com/mugetsu/ash/blob/master/docs/DOCS.md), such as [Node](http://nodejs.org/), [Git](https://github.com), [Bower](http://bower.io/), [Grunt](http://gruntjs.com/).

## Roadmap

* Grunt tasks to be polished.
* Standard code snippets for example, Validation.. etc.

## Contributors

[Randell Quitain](//github.com/mugetsu)

## License

#### The MIT License (MIT)

Copyright (c) ASH

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
