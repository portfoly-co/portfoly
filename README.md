# portfoly
> [!NOTE]
> 😊 <strong>portfoly</strong> was developed to simplify access to personal portfolios.

<p align="left">
  <a href="https://github.com/portfoly-co/portfoly/actions"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/portfoly-co/portfoly/main.yml?style=flat-square"></a>
  &nbsp;
  <a href="https://github.com/portfoly-co/portfoly/graphs/contributors"><img alt="npm" src="https://img.shields.io/github/contributors-anon/portfoly-co/portfoly?color=yellow&style=flat-square" /></a>
</p>
<hr/>

## About us
### [🌐 Website](https://portfoly.co)
## Usage
Our project uses PayloadCMS as Framework.
### [🌐 PayloadCMS](https://github.com/payloadcms/payload)
## Development
### Setup .env
- Copy .env.example to .env
```
cp .env.example .env
```

- Edit DATABASE_URI in .env
- Edit PAYLOAD_SECRET in .env (random strong string)

### Install dependencies
```
npm ci
```

### Setup existing theme (Seed database)
```
npm run seed
```

### Start development server
```
npm run dev
```
- Create a new admin user

# Production
### Setup .env
- Copy .env.example to .env
```
cp .env.example .env
```

- Edit DATABASE_URI in .env
- Edit PAYLOAD_SECRET in .env (random strong string)

### Install dependencies
```
npm ci
```

### Setup existing theme (Seed database)
```
npm run seed
```

### Build project
```
npm run build
```

### Start server
example with pm2 on port 4334
```
pm2 start npx --name "portfolio" -- next start -p 4334
```
- Create a new admin user