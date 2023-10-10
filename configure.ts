/**
 * @rlanz/ally-twitch
 *
 * @license MIT
 * @copyright Romain Lanz <romain.lanz@pm.me>
 */

import type Configure from '@adonisjs/core/commands/configure'

/**
 * Configures the package
 */
export async function configure(command: Configure) {
  const codemods = await command.createCodemods()

  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider('@rlanz/ally-twitch/twitch_provider')
  })

  await codemods.defineEnvVariables({
    TWITCH_CLIENT_ID: '',
    TWITCH_CLIENT_SECRET: '',
    TWITCH_CALLBACK_URL: '',
  })

  await codemods.defineEnvValidations({
    variables: {
      TWITCH_CLIENT_ID: 'Env.schema.string()',
      TWITCH_CLIENT_SECRET: 'Env.schema.string()',
      TWITCH_CALLBACK_URL: 'Env.schema.string()',
    },
    leadingComment: 'Variables for @rlanz/ally-twitch',
  })
}
