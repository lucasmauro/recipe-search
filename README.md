# Recipe Search

For Portuguese, click [here](LEIAME.md).

Recipe Search provides you with a list of recipes based on the ingredients of your choice.
This is done by consuming the [Recipe Puppy API](http://www.recipepuppy.com/about/api/).
Additionally, each recipe contains a gif that represents it, taken from the [Giphy API](https://developers.giphy.com/docs/)!

#### Usage

The API has a single endpoint, described by the following pattern:

    http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}

Which would, for instance, translate to:

    http://127.0.0.1/recipes/?i=onion,tomato
    
The response contains the given keywords and a list of recipes,
each containing a title, the ingredients, the link to the recipe and the link to a depicting gif.
The response is given in JSON format, as follows:

```
{
  "keywords": [
    "onion",
    "tomato"
  ],
  "recipes": [
    {
      "title": "Dehydrating Tomatoes",
      "ingredients": [
        "tomato"
      ],
      "link": "http://www.recipezaar.com/Dehydrating-Tomatoes-325795",
      "gif": "https://media0.giphy.com/media/vOxDQLo4tuMyA/giphy.gif?cid=fa6e4c411kcda6o20u9j6oyunfan9zzehn48g08q897n0b9x&rid=giphy.gif"
    },
    {
      "title": "Fresh Tomatoes With Caper Dressing",
      "ingredients": [
        "tomato"
      ],
      "link": "http://www.recipezaar.com/Fresh-Tomatoes-With-Caper-Dressing-244024",
      "gif": "https://media1.giphy.com/media/3o6nV9zCdncC1jdcvC/giphy.gif?cid=fa6e4c41vvb03gt8okvz5px6wrx2vvssohkez7jcxay9oa1y&rid=giphy.gif"
    }
  ]
}
```

---
## Requirements

For development you will only need Node.js and Yarn installed in your environement.

### Node
- #### Node installation on Windows

  You may download the installer from the [official Node.js website](https://nodejs.org/).
Also, be sure to have `git` available in your PATH, as `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and `npm` easily with apt install, just run the following commands:

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command:

    $ node --version
    v12.18.4

    $ npm --version
    6.14.4

If `npm` requires an update, you can do so using `npm` itself with the following command:

    $ npm install npm -g

###
### Yarn installation
  Installing `yarn` can be done with the following command:

      $ npm install -g yarn

---

## Install

  ### Clone the repository 

  This repository can be cloned with `git` and the following command:

    $ git clone https://github.com/lucasmauro/recipe-search
    
  ### Install dependencies
  
  After cloning Recipe Search, change into the project directory and download the dependencies with the following commands:
    
    $ cd recipe-search
    $ yarn install

## Configure

The required configuration for Recipe Search is located in the `.env` file. You should edit the file according to the description:

- APP_PORT: the port on which Recipe Search will run;
- GIPHY_API_KEY: the Key for accessing the Giphy API and retrieving gif files. More information can be found [here](https://developers.giphy.com/docs/);
- GIPHY_API_ENDPOINT: the Endpoint for accessing the Giphy API and retrieving gif files. More information can be found [here](https://developers.giphy.com/docs/);
- RECIPE_PUPPY_API_ENDPOINT: the Endpoint for accessing the Recipe Puppy API and retrieving recipes. More information can be found [here](http://www.recipepuppy.com/about/api/).

## Run
    
  The following command starts Recipe Search on development mode. Any change to the project triggers an automatic code reload: 

    $ yarn dev

## Run tests

  The following command runs all tests:

    $ yarn test

## Run tests code coverage

  The following command runs all tests and provides a code coverage report:

    $ yarn cover

## Run lint

  The following command validates the code syntax and style, pointing out any standard non-conformity:

    $ yarn lint

--- 

## Docker

  Recipe Search is capable of running on Docker. For doing so, you must have Docker installed in your system.
  Details on Docker installation can be found [here](https://docs.docker.com/get-docker/).
  
  ### Build 
  
  After installing Docker, build the image with the following command:
  
    $ docker-compose build
    
  ### Start
  
  After building the image, run Recipe Search with the following command:
  
    $ docker-compose start

  ### Stop

  For stopping Recipe Search, run the following command:

    $ docker-compose stop
    
  ### Build and Start
  
  It is also possible to build and start the project with a single command.
  The following command also attaches your terminal to the container and provides you with live log output:
  
    $ docker-compose up

