/**
 * @rlanz/ally-twitch
 *
 * @license MIT
 * @copyright Romain Lanz <romain.lanz@pm.me>
 */

import type { HttpContext } from '@adonisjs/core/http'
import type { TwitchDriverConfig, TwitchDriverContract } from './main.js'

declare module '@adonisjs/ally/types' {
  export interface AllyDriversList {
    twitch: (config: TwitchDriverConfig, ctx: HttpContext) => TwitchDriverContract
  }
}
