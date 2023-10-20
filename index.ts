/**
 * @rlanz/ally-twitch
 *
 * @license MIT
 * @copyright Romain Lanz <romain.lanz@pm.me>
 */

export { stubsRoot } from './stubs/main.js'
export { configure } from './configure.js'
import { TwitchDriver } from './src/twitch.js'
import type { TwitchDriverConfig } from './src/types/main.js'
import type { HttpContext } from '@adonisjs/core/http'

export function twitch(config: TwitchDriverConfig) {
  return (ctx: HttpContext) => new TwitchDriver(ctx, config)
}
