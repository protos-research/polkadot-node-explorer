import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import {
  faChartLine,
  faSignal,
  faGlobeAmericas,
  faList,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { COLOR_MEDIUM_GREY } from '../utils/theme'

const styles = theme => ({
  nav: {
    height: '100%',
    width: '165px',
    borderRight: `1px solid ${COLOR_MEDIUM_GREY}`,
  },
  navItem: {
    paddingLeft: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2.5,
    paddingBottom: theme.spacing.unit * 2.5,
    borderBottom: `1px solid ${COLOR_MEDIUM_GREY}`,
  },
  icon: {
    marginRight: theme.spacing.unit,
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
            <FontAwesomeIcon className={classes.icon} icon={faSignal} />
            <Typography inline>Stats</Typography>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link href="#monitor">
            <FontAwesomeIcon className={classes.icon} icon={faChartLine} />
            <Typography inline>Monitor</Typography>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link href="#locations">
            <FontAwesomeIcon className={classes.icon} icon={faGlobeAmericas} />
            <Typography inline>Locations</Typography>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link href="#list">
            <FontAwesomeIcon className={classes.icon} icon={faList} />
            <Typography inline>List</Typography>
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(NavBar)
