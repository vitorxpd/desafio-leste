# Leste Contact

Este projeto foi desenvolvido como parte de um desafio para a vaga de desenvolvimento na **[Leste Telecom](https://www.lestetelecom.com.br/).**

### Requisitos
- **[Git](https://git-scm.com/)** = `latest`
- **[Node.js](https://nodejs.org/)** >= `20` (Dê preferência a uma versão **LTS**)
- **[Yarn](https://yarnpkg.com/)** >= `1.22`

### Tecnologias e Bibliotecas Utilizadas

- **[Vite](https://vitejs.dev/):** Um build tool rápido e minimalista para projetos modernos de frontend.
- **[React](https://react.dev/):** Biblioteca JavaScript para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/):** Superset do JavaScript que adiciona tipagem estática ao código.
- **[tailwindcss](https://tailwindcss.com/):** Framework utilitário de CSS para estilização rápida e consistente.
- **[shadcn/ui](https://ui.shadcn.com/):** Componentes prontos para uso, facilitando a criação de interfaces de usuário.
- **[React Router DOM](https://reactrouter.com/):** Biblioteca para gerenciamento de rotas em aplicações React.
- **[React Hook Form](https://www.react-hook-form.com/):** Biblioteca para gerenciamento de formulários em React, focada em performance e simplicidade.
- **[Zod](https://zod.dev/):** Biblioteca para validação de esquemas TypeScript, garantindo a integridade dos dados.
- **[Husky](https://typicode.github.io/husky/):** Utilitário para criar hooks de Git, garantindo a execução de scripts antes dos commits.
- **[ESLint](https://eslint.org/)**: Ferramenta para identificar e corrigir problemas de linting no código JavaScript.
- **[Prettier](https://prettier.io/):** Ferramenta de formatação de código, garantindo consistência no estilo do código.
- **[lint-staged](https://github.com/lint-staged/lint-staged):** Executa linters em arquivos versionados para garantir que apenas códigos limpos sejam commitados.
- **[commitlint](https://commitlint.js.org/):** Ferramenta para validar mensagens de commit de acordo com as convenções definidas.

### Funcionalidades

- **Adicionar Contato:** Permite adicionar novos contatos ao sistema.
- **Editar Contato:** Possibilita a edição de informações de contatos existentes.
- **Excluir Contato:** Permite a remoção de contatos do sistema.
- **Estatísticas:** Gera relatórios mostrando a distribuição de contatos por gênero e idioma.
- **Paginação:** Divide a lista de contatos em páginas, facilitando a navegação e visualização.
- **Filtros de Exibição:**
  - **Itens por Página:** Controla o número de contatos exibidos por página.
  - **Por Gênero:** Filtra contatos com base no gênero.
  - **Por Idioma:** Filtra contatos com base no idioma.
  - **Por Mês de Aniversário:** Filtra contatos de acordo com o mês de nascimento.
  - **Por Idade:** Filtra contatos com base na faixa etária.
  - **Busca de Contatos:** Permite a pesquisa de contatos por nome.


### Guia de Instalação

1. Clone o projeto
```bash
git clone https://github.com/vitorxpd/desafio-leste.git
```

2. Acesse a pasta
```bash
cd desafio-leste
```

3. Instale as dependências do projeto
```bash
yarn install
```

---
### Guia de Scripts

Modo Desenvolvimento
```bash
yarn dev
```

**Gerar Build**
```bash
yarn build
```
**Verificação de Lint**
```bash
yarn lint
```
