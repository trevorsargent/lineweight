import { ErrorCallback } from 'node-tradfri-client'

export const error = (error$): ErrorCallback => (e) => {
  console.log(e)
  error$.next({
    error: true,
  })
}
