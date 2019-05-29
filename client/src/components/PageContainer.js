import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import Footer from './Footer'
import { Typography } from '@material-ui/core'
import Centered from './Centered'
import {
  COLOR_MEDIUM_GREY,
  COLOR_DARKEST_GREY,
  COLOR_PINK,
} from '../utils/theme'

export default ({ children }) => (
  <React.Fragment>
    <Centered>
      <AppBar
        position="static"
        color="default"
        style={{ borderBottom: `1px solid ${COLOR_MEDIUM_GREY}` }}
      >
        <Toolbar
          style={{ backgroundColor: COLOR_DARKEST_GREY, height: '80px' }}
        >
          <img src="logo-polkadot.svg" alt="" height="30" />
          <Typography
            variant="h5"
            style={{
              textTransform: 'uppercase',
              fontWeight: '300',
              color: COLOR_PINK,
              letterSpacing: '0.15em',
            }}
          >
            Node Explorer
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
