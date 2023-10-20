<p align="center">
  <img src="https://github.com/RomainLanz/ally-twitch/assets/2793951/d3ccf29b-6169-4563-b932-5b15258a7fa3" alt="@rlanz/ally-twitch">
</p

<p align="center">
  <a href="https://www.npmjs.com/package/@rlanz/ally-twitch"><img src="https://img.shields.io/npm/dm/@rlanz/ally-twitch.svg?style=flat-square" alt="Download"></a>
  <a href="https://www.npmjs.com/package/@rlanz/ally-twitch"><img src="https://img.shields.io/npm/v/@rlanz/ally-twitch.svg?style=flat-square" alt="Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@rlanz/ally-twitch.svg?style=flat-square" alt="License"></a>
</p>

`@rlanz/ally-twitch` is a Twitch driver for [AdonisJS Ally](https://v6-alpha.adonisjs.com/docs/social_auth).

## Getting Started

This package is available in the npm registry.

```bash
npm install @rlanz/ally-twitch
```

Next, configure the package by running the following command.

```bash
node ace configure @rlanz/ally-twitch
```

Then register the service inside the configuration file `config/ally.ts`.

```ts
// config/ally.ts
import { defineConfig } from '@adonisjs/ally';
import { twitch } from '@rlanz/ally-twitch'
import env from '#start/env';

const allyConfig = defineConfig({
  twitch: twitch({
    clientId: env.get('TWITCH_CLIENT_ID'),
    clientSecret: env.get('TWITCH_CLIENT_SECRET'),
    callbackUrl: env.get('TWITCH_CALLBACK_URL'),
    scopes: ['user:read:email']
  }),
})
```
