import React from 'react'
import Grid from '@material-ui/core/Grid'
import theme from '../utils/theme'
import { Small } from '../components/Text'
import { withStyles } from '@material-ui/core/styles'

// NOTE: need to make sure react-snap have access to crawl all the static pages
function Footer({ classes }) {
  return (
    <footer className={classes.pageFooter}>
      <Grid container>
        <Grid item xs={6}>
          <Small color="black">Copyright © 2019 Polkadot Node Explorer</Small>
        </Grid>
      </Grid>
    </footer>
  )
}

export default withStyles({
  pageFooter: {
    borderTop: '1px solid lightGrey',
    flex: 0,
    background: 'white',
    padding: theme.spacing.unit * 3,
    color: 'white',
  },
})(Footer)
