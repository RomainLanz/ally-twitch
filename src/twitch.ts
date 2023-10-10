/**
 * @rlanz/ally-twitch
 *
 * @license MIT
 * @copyright Romain Lanz <romain.lanz@pm.me>
 */

import { Oauth2Driver } from '@adonisjs/ally'
import type { HttpContext } from '@adonisjs/core/http'
import type { ApiRequestContract, RedirectRequestContract } from '@adonisjs/ally/types'
import type { TwitchDriverConfig, TwitchScopes, TwitchToken } from './types/main.js'

export class TwitchDriver extends Oauth2Driver<TwitchToken, TwitchScopes> {
  /**
   * The URL to hit to exchange the authorization code for the access token
   */
  accessTokenUrl = 'https://id.twitch.tv/oauth2/token'

  /**
   * The URL for the redirect request. The user will be redirected on this page
   * to authorize the request.
   */
  authorizeUrl = 'https://id.twitch.tv/oauth2/authorize'

  /**
   * The URL to hit to get the user details
   */
  userInfoUrl = 'https://api.twitch.tv/helix/users'

  /**
   * The param name for the authorization code
   */
  codeParamName = 'code'

  /**
   * The param name for the error
   */
  errorParamName = 'error'

  /**
   * Cookie name for storing the "twitch_oauth_state"
   */
  stateCookieName = 'twitch_oauth_state'

  /**
   * Parameter name to be used for sending and receiving the state
   * from Twitch
   */
  stateParamName = 'state'

  /**
   * Parameter name for defining the scopes
   */
  scopeParamName = 'scope'

  /**
   * Scopes separator
   */
  scopesSeparator = ' '

  constructor(
    ctx: HttpContext,
    public config: TwitchDriverConfig
  ) {
    super(ctx, config)

    this.loadState()
  }

  configureRedirectRequest(request: RedirectRequestContract<TwitchScopes>) {
    request.scopes(this.config.scopes || ['user:read:email'])
    request.param('response_type', 'code')
    request.param('grant_type', 'authorization_code')
  }

  /**
   * Returns the HTTP request with the authorization header set
   */
  getAuthenticatedRequest(url: string, token: string) {
    const request = this.httpClient(url)
    request.header('Authorization', `Bearer ${token}`)
    request.header('Client-id', this.config.clientId)
    request.header('Accept', 'application/json')
    request.parseAs('json')
    return request
  }

  /**
   * Fetches the user info from the Twitch API
   */
  async getUserInfo(token: string, callback?: (request: ApiRequestContract) => void) {
    const request = this.getAuthenticatedRequest(this.userInfoUrl, token)
    if (typeof callback === 'function') {
      callback(request)
    }

    const body = await request.get()
    const user = body.data[0]

    console.log(user)

    return {
      id: user.id,
      nickName: user.login,
      name: user.display_name,
      email: user.email,
      emailVerificationState: user.email_verified,
      avatarUrl: user.profile_image_url,
      original: user,
    }
  }

  /**
   * Find if the current error code is for access denied
   */
  accessDenied(): boolean {
    const error = this.getError()
    if (!error) {
      return false
    }

    return error === 'access_denied'
  }

  /**
   * Returns details for the authorized user
   */
  async user(callback?: (request: ApiRequestContract) => void) {
    const token = await this.accessToken(callback)
    const user = await this.getUserInfo(token.token, callback)

    return {
      ...user,
      token,
    }
  }

  /**
   * Finds the user by the access token
   */
  async userFromToken(token: string, callback?: (request: ApiRequestContract) => void) {
    const user = await this.getUserInfo(token, callback)

    return {
      ...user,
      token: { token, type: 'bearer' as const },
    }
  }
}
