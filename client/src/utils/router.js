import React from 'react'
import history from '../models/history'

export function navigate(uri) {
  history.push(uri)
}

export function to(uri) {
  return e => {
    e.preventDefault()
    history.push(uri)
  }
}

export const Link = (props = {}) => {
  return (
    <a {...props} onClick={to(props.href)}>
      {props.children}
    </a>
  )
}

/**
 * Redirect handling: https://github.com/tj/react-enroute/issues/4
 * - ex: <Route path="/unauthorized" component={replace('/login')} />
 * @param redirectTo
 */
export const replace = redirectTo => {
  return () => {
    history.replace(redirectTo)
    return null
  }
}

export default history
