import { createAuthClient } from 'better-auth/react'
import { expoClient } from '@better-auth/expo/client'
import { usernameClient } from 'better-auth/client/plugins'
import * as Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

export const authClient = createAuthClient({
  baseURL: `http://${Constants.default.expoConfig?.hostUri ?? `localhost:8081`}`,
  plugins: [
    usernameClient(),
    // @ts-ignore
    expoClient({
      scheme: 'myapp',
      storagePrefix: 'myapp',
      storage: SecureStore
    })
  ]
});
