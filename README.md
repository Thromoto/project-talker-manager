
# Projeto Talker Manager

Foi construido uma aplicação de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações.


## Instalação

1. Clone o repositório.
```bash
git clone git@github.com:Thromoto/project-talker-manager.git
```
2. Entre na pasta do repositório que você acabou de clonar.

3. Rode o serviço node com o comando.
```bash
docker-compose up -d
```
* Esse serviço irá inicializar um container chamado ```talker_manager```.
* A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
* Use o comando ```docker exec -it talker_manager```.
* Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
4. Instale as dependências.
```bash
npm install
```
5. Inicie o servidor de desenvolvimento executando o seguinte comando.
```bash
npm start
```


## Stack utilizada

JavaScript, Node.js, Express, APIs REST, CRUD.