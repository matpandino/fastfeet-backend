<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 3: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 2/4 do Desafio Final :warning:
</h3>

## :rocket: Sobre

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile).</p>

[Repositório do desafio](https://github.com/Rocketseat/bootcamp-gostack-desafio-03)

---

## Rotas

TODO

## **Configuração ambiente**

### **Ferramentas utilizadas**

- Express
- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (PostegreSQL);
- BeeQueue

### **1. Criar o Bancos de Dados**

<p>Criar banco de dados PostegreSQL ou MySQL</p>
<p>Criar Redis</p>

### **2. Configurar .env**

<p>Configure o .env de acordo com o .env.example

### **3. Configurar Insomnia**

<p>Importe os dados no arquivo <b>Insomnia_*.json</b> para importar as rotas para o Insomnia</p>


### Rodando a aplicação

Instale as dependencias 

    yarn 

Realize as migrations

    yarn sequelize db:migrate

Aplique o seed para incluir o usuário administrador inicial

    yarn sequelize db:seed:all

Por fim execute 

    yarn dev
