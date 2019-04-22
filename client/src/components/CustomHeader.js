import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  header: {
    fontWeight: 300,
  },
})

class CustomHeader extends Component {
  render() {
    const { classes, style, label, headerProps } = this.props
    if (label) {
      return (
        <Typography
          variant="overline"
          className={classes.header}
          style={style}
          {...headerProps}
        >
          {label}
        </Typography>
      )
    }
    return null
  }
}

export default withStyles(styles)(CustomHeader)
