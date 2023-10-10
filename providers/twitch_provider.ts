/**
 * @rlanz/ally-twitch
 *
 * @license MIT
 * @copyright Romain Lanz <romain.lanz@pm.me>
 */

import { driversList } from '@adonisjs/ally'
import type { ApplicationService } from '@adonisjs/core/types'

import { TwitchDriver } from '../src/twitch.js'

export default class TwitchProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    driversList.extend('twitch', (config, ctx) => new TwitchDriver(ctx, config))
  }
}
