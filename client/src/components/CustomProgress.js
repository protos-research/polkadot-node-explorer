import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

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
    backgroundColor: 'lightGrey',
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
          classes={{
            colorPrimary: classes.linearColorPrimary,
            barColorPrimary: classes.linearBarColorPrimary,
          }}
        />
        <Typography inline variant="body1" className={classes.value}>
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
