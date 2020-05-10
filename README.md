# Game of Life

A version of the Game of Life for JavaScript.  
I thought 'Staying Alive' by the Bee Gees was a very fitting background song :smirk:.


## Tech stack

This is a full frontend project. It uses web technologies (HTML/CSS/JS) and in particular the canvas API.

Most of the Game of Life logic is in the `grid.js`, `location.js` and `starters.js` files. The rest is for display.

This project uses [gulp](https://gulpjs.com/) with some node modules to build the site, and [the browser version of Jasmine](https://github.com/jasmine/jasmine/releases) for the tests.

"_...but Webpack and Yarn and Jest mimimimimi..._" :neutral_face: [leave me alone, I was created free](https://tirania.org/blog/archive/2011/Feb-17.html).


## Running

Clone the project and enter repo:

```
git clone git@github.com:octopusinvitro/game-of-life-js.git .
cd game-of-life-js
```

Install dependencies and run gulp:

```
npm install
gulp
```

Go to <http://localhost:4000/site> to see the site.

Gulp will translate, concatenate and ugligy all javascript files, listening to changes in the files every time you save and rebuilding the site inside of the `gh-pages` folder. It will also reload the site in the browser.


## Running the tests:

Go to <http://localhost:4000/test> to see the tests.


## Contributions

This repo requires a bit of initial setup, as the source code lives in the `master` branch, but the built site lives in the `gh-pages` branch (you just need to set it up once forever).

To achieve this:


**If you have already run gulp**

Enter the `gh-pages` directory and remove everything (don't worry its contents are recreated automatically):

```
cd gh-pages
rm -rf .
```

Continue with Next Steps

**If you haven't run gulp yet**

Create a new directory called `gh-pages` and enter it:

```
mkdir gh-pages
cd gh-pages
```

Continue with Next Steps

**Next steps**

* Clone the repository again in that folder and checkout the `gh-pages` branch:

```
git clone PREVIOUS_URL .
git checkout gh-pages
```

* Make sure you are in the `gh-pages` branch, and stay there forever inside of this folder:

```
git branch
* gh-pages
  master
```

* Pull the last changes:

```
git pull origin gh-pages
```

That's it, you are all set up. From now on, everytime you build the site, it will be built inside of this folder, so you just have to remember to enter the folder, commit, and push to the `gh-pages` branch.
