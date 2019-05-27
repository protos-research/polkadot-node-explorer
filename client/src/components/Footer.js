import React from 'react'
import Grid from '@material-ui/core/Grid'
import theme from '../utils/theme'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { COLOR_MEDIUM_GREY } from '../utils/theme'

// NOTE: need to make sure react-snap have access to crawl all the static pages
function Footer({ classes }) {
  return (
    <footer className={classes.pageFooter}>
      <Grid container>
        <Grid item xs={6}>
          <Typography>Copyright © 2019 Polkadot Node Explorer</Typography>
        </Grid>
      </Grid>
    </footer>
  )
}

export default withStyles({
  pageFooter: {
    borderTop: `1px solid ${COLOR_MEDIUM_GREY}`,
    flex: 0,
    padding: theme.spacing.unit * 3,
  },
})(Footer)
