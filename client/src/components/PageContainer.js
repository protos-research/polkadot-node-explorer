import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Footer from './Footer'
import { Typography } from '@material-ui/core'
import Centered from './Centered'

export default ({ children }) => (
  <React.Fragment>
    <Centered>
      <AppBar
        position="static"
        color="default"
        style={{ borderBottom: '1px solid lightGrey' }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
          >
            Polkadot Node Explorer
          </Typography>
          <Typography variant="overline" style={{ letterSpacing: '0.2em' }}>
            about
          </Typography>
        </Toolbar>
      </AppBar>
    </Centered>
    {children}
    <Footer />
  </React.Fragment>
)
