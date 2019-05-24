import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import {
  COLOR_MEDIUM_GREY,
  COLOR_LIGHT_GREY,
  COLOR_LINUX_BLUE,
  COLOR_ORANGE,
  COLOR_GREEN,
} from '../utils/theme'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  progress: {
    color: 'black',
    height: 8,
    borderRadius: 4,
    marginBottom: '8px',
  },
  linearColorPrimary: {
    backgroundColor: COLOR_MEDIUM_GREY,
  },
  linearBarColorPrimary: {
    backgroundColor: 'black',
  },
  value: {
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.05em',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
  },
  linuxBlue: {
    backgroundColor: COLOR_LINUX_BLUE,
  },
  msOrange: {
    backgroundColor: COLOR_ORANGE,
  },
  appleGray: {
    backgroundColor: COLOR_LIGHT_GREY,
  },
  otherGreen: {
    backgroundColor: COLOR_GREEN,
  },
})

class CustomProgress extends Component {
  render() {
    const { classes, value, label } = this.props

    return (
      <div className={classes.root}>
        <LinearProgress
          variant="determinate"
          value={value}
          className={classes.progress}
          classes={
            label === 'Linux'
              ? {
                  colorPrimary: classes.linearColorPrimary,
                  barColorPrimary: classes.linuxBlue,
                }
              : label === 'Windows'
              ? {
                  colorPrimary: classes.linearColorPrimary,
                  barColorPrimary: classes.msOrange,
                }
              : label === 'Mac'
              ? {
                  colorPrimary: classes.linearColorPrimary,
                  barColorPrimary: classes.appleGray,
                }
              : {
                  colorPrimary: classes.linearColorPrimary,
                  barColorPrimary: classes.otherGreen,
                }
          }
        />
        <Typography
          inline
          variant="body1"
          className={classes.value}
          style={
            label === 'Linux'
              ? {
                  color: COLOR_LINUX_BLUE,
                }
              : label === 'Windows'
              ? {
                  color: COLOR_ORANGE,
                }
              : label === 'Mac'
              ? {
                  color: COLOR_LIGHT_GREY,
                }
              : label === 'Other'
              ? {
                  color: COLOR_GREEN,
                }
              : null
          }
        >
          {value}%
        </Typography>
        <Typography inline variant="body1" className={classes.label}>
          {' '}
          {label}
        </Typography>
      </div>
    )
  }
}

CustomProgress.defaultProps = {}

CustomProgress.propTypes = {}
export default withStyles(styles)(CustomProgress)
