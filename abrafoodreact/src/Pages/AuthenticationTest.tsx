import React from 'react'
import { withAuth } from '../HOC'

function AuthenticationTest() {
  return (
    <div>You are logged in</div>
  )
}

export default withAuth(AuthenticationTest) 