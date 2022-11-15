# NTNP stack

Next.js, Tailwind CSS, Nest.js, and PostgreSQL.

## Commands

Start the client:

```bash
cd client
npm run dev
```

Start the server:

```bash
cd server
npm run start:dev
```

Restore the database:

```bash
cd db
./run.sh restore
```

Generate models for TypeORM from database:

```bash
cd db
./run.sh generate-models
```

> - [typeorm-model-generator](https://www.npmjs.com/package/typeorm-model-generator) is used
> - the models will be outputted to `db/generated-models`

## Client setup

```bash
npx create-next-app client --ts --eslint
```

- delete `public/vercel.svg`, `pages/api`, `styles/Home.module.css`, `README.md`
- edit `pages/index.tsx`
- replace `public/favicon.ico`
- [create custom document](https://nextjs.org/docs/advanced-features/custom-document)
- create `src` directory and move `pages` into it
- [optional] `next.config.js`: [turn off strict mode to avoid "double-invoking" functions](
https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)

### Prettier

```bash
npm i -D eslint-config-prettier eslint-plugin-prettier
```

- `.eslintrc.json`: edit extends, plugins, and rules
- `.prettierrc`: [create](https://prettier.io/docs/en/configuration.html)

### Jest

```bash
npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

- `jest.config.js`, `src/setupTests.ts`:
  - [create](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler)
  - [Optional: Extend Jest with custom matchers](https://nextjs.org/docs/testing#setting-up-jest-with-babel)
- `package.json`: add `test` script
- `next.config.js`: [remove react properties used for tests](https://nextjs.org/docs/advanced-features/compiler#remove-react-properties)

### Tailwind CSS

```bash
npm i -D tailwindcss postcss autoprefixer @tailwindcss/typography
npx tailwindcss init -p
```

- [follow the guide](https://tailwindcss.com/docs/guides/nextjs)
- [optional] `@tailwindcss/typography`
  - install so can use the `prose` class
  - add `prose` class to `src/pages/_document.tsx`

### class-transformer

```bash
npm i class-transformer reflect-metadata
```

- `src/pages/_app.tsx`: import `reflect-metadata`
- `tsconfig.json`: set `experimentalDecorators` to `true`

## Server setup

```bash
nest new server --strict
```

- delete `.git`, `README.md`, `src/app.controller.ts`, `src/app.controller.spec.ts`, `src/app.service.ts`
- `.eslintrc.js`: add prettier to rules
- `spec` to `test`
  - `package.json`: edit `testRegex`
  - `tsconfig.build.json`: edit `exclude`

### Fastify

```bash
npm i @nestjs/platform-fastify
```

- [use the FastifyAdapter](https://docs.nestjs.com/techniques/performance#adapter)

### PostgreSQL/TypeORM

```bash
npm i @nestjs/typeorm typeorm typeorm-naming-strategies pg
```

- [import TypeOrmModule](https://docs.nestjs.com/techniques/database)
- [optional] `typeorm-naming-strategies`
  - install so can use snake case in PostgreSQL
  - set `TypeOrmModule` `namingStrategy` to `SnakeNamingStrategy`

