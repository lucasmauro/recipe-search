# Recipe Search

For English, click [here](README.md).

Recipe Search lhe provê uma lista de receitas baseadas nos ingredientes de sua escolha.
Isto é realizado através do consumo da [Recipe Puppy API](http://www.recipepuppy.com/about/api/).
Adicionalmente, cada receita contém um gif que a representa, obtido da [Giphy API](https://developers.giphy.com/docs/)!

#### Uso

A API tem apenas um _endpoint_, descrito pelo seguinte padrão:

    http://{HOST}/recipes/?i={ingredient_1},{ingredient_2}

Que seria, por exemplo, traduzido para:

    http://127.0.0.1/recipes/?i=onion,tomato
    
A resposta contém as palavras-chave e uma lista de receitas,
onde cada receita contém título, ingredientes, link para a receita e link para o gif que o representa. 
A resposta é dada em formato JSON, como a seguir:

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
## Dependências

Para desenvolvimento você necessita apenas de Node.js e Yarn instalados em seu sistema.

### Node
- #### Instalação do Node no Windows

  Você pode baixar o instalador do [website oficial do Node.js](https://nodejs.org/).
Além disso, certifique-se de ter `git` disponível em seu _PATH_, visto que `npm` pode necessitá-lo. (Git pode ser encontrado [aqui](https://git-scm.com/)).

- #### Instalação do Node no Ubuntu

  Você pode instalar nodejs e `npm` facilmente com apt install, bastando executar os seguintes comandos:

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Outros sistemas operacionais
  Você pode encontrar mais informações sobre a instalação no [website oficial do Node.js](https://nodejs.org/) e no [website oficial do NPM](https://npmjs.org/).

Se a instalação teve sucesso, você estará apto a executar os seguintes comandos:

    $ node --version
    v12.18.4

    $ npm --version
    6.14.4

Caso `npm` requeira  ruma atualização, você pode realizá-la usando o próprio `npm` com o seguinte comando:

    $ npm install npm -g

###
### Instalação do Yarn
  Instalar `yarn` pode ser feito com o seguinte comando:

      $ npm install -g yarn

---

## Instalar

  ### Clonar o repositório 

  Este repositório pode ser clonado com `git` e o seguinte comando:

    $ git clone https://github.com/lucasmauro/recipe-search
    
  ### Instalar dependências
  
  Após clonar Recipe Search, acesse o diretório do projeto e baixe as dependências com os seguintes comandos:
    
    $ cd recipe-search
    $ yarn install

## Configurar

A configuração necessária para Recipe Search está localizada no arquivo `.env`. Você deve editá-lo de acordo com a descrição:

- APP_PORT: a porta na qual Recipe Search executará;
- GIPHY_API_KEY: a chave para acessar a Giphy API e obter os arquivos gif. Mais informações podem ser encontradas [aqui](https://developers.giphy.com/docs/). 

## Executar
    
  O seguinte comando executa Recipe Search em modo de desenvolvimento.
  Qualquer alteração ao projeto dispara uma recarga automática de código.

    $ yarn dev

## Executar testes
  
  O seguinte comando executa todos os testes:

    $ yarn test

## Executar testes com cobertura de código

  O seguinte comando executa todos os  testes e provê um relatório de cobertura de código:

    $ yarn cover

## Executar lint

  O seguinte comando valida a sintaxe e o estilo do código, apontando para qualquer não conformidade ao padrão.

    $ yarn lint

--- 

## Docker

  Recipe Search é capaz de executar no Docker. Para tanto, você deve ter Docker instalado em seu sistema.
  Detalhes sobre a instalação do Docker podem ser encontradas [aqui](https://docs.docker.com/get-docker/).
  
  ### Criar
  
  Após instalar Docker, crie a imagem com o seguinte comando:
  
    $ docker-compose build
    
  ### Iniciar
  
  Após construir a imagem, inicie Recipe Search com o seguinte comando:
  
    $ docker-compose start

  ### Parar

  Para parar Recipe Search, execute o seguinte comando:

    $ docker-compose stop
    
  ### Criar e Iniciar
  
  Também é possível criar e iniciar o projeto com um único comando.
  O seguinte comando também anexa seu terminal ao _container_ e lhe provê com a saída de _logs_ em tempo real.
  
    $ docker-compose up

