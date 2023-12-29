# Fortuna Front-end

Esse é o repositório do código front-end do sistema Fortuna. Trata-se de um sistema completo para vendas de produtos com geração de relatórios, controle de estoque, área dedicada ao cliente para consulta de saldo e extrato, possibilidade de leitura de código de barras, etc.

> [Repositório do código back-end](https://github.com/paulotss/fortuna_backend)

## Tecnologias utilizadas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Execução

Faça o clone do repositório:

```
git clone git@github.com:paulotss/fortuna_frontend.git
```

Crie um arquivo .env e insira a variável de ambiente com a URL base da API back-end conforme o exemplo:

```
REACT_APP_API_BASE_URL="http://localhost:3001"
```

Preferencialmente utilize o docker junto com docker-compose para rodar a aplicação:

```
docker-compose up -d
```

Agora basta entra no container do front-end e rodar a aplicação:

```
docker exec -it fortuna_front bash
npm run dev
```

Acesse a aplicação usando a URL:

```
http://localhost:3000
```