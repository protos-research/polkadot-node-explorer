import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'

const styles = theme => ({
  nav: {
    height: '100%',
    width: '165px',
    borderRight: '1px solid lightGrey',
  },
  navItem: {
    paddingLeft: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2.5,
    borderBottom: '1px solid lightGrey',
  },
})

class NavBar extends React.Component {
  state = {
    dropdownAnchor: null,
    drawer: false,
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.nav}>
        <div className={classes.navItem}>
          <Link href="#stats">
            <Typography>Stats</Typography>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link href="#monitor">
            <Typography>Monitor</Typography>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link href="#locations">
            <Typography>Locations</Typography>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link href="#list">
            <Typography>List</Typography>
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(NavBar)
