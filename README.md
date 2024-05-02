# Autenticacao_login
Autenticação com Node.js e jwt.

1- A criação da pasta src, contendo todos os arquivos de configuração.

2 - A pasta controllers contendo a autenticação e o usercontroller contendo o controller do user, bem como o try/except

3 - A pasta models contendo o schema para criação de usuário, com os requisitos de nome, e-mail e senha.

4 - a pasta repository usando o crud no com base nas informações do User.js

5 - A pasta routes contendo as rotas e as requisições GET,POST,PUT E DELETE

6 - a pasta env para rodar a port e a secret key 

7 - O arquivo gitignore para não subir a env e revelar a secret key 

8 - O arquivo database contendo a conexão do banco de dados pelo mongoose

9 - O arquivo index contendo a pagina principal da aplicação.

10 - O arquivo package.json para configuração do projeto e suas dependências.

Para a autentucação foi usado o Post para a criação do usuário e o hash de senha, assim, usando o postman para testa o link /login e verificar o sucesso da requisição. Com a biblioteca bcrypt é feita uma verificação dos dados no corpo da rquisição com o mongodb. É necessário no final enviar os dados que foram criados pela rota privada /private para fazer a verificação de que o usuário foi autenticado com sucesso. 
