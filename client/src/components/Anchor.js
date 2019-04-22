import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  anchor: {
    fontWeight: 'normal',
  },
})

class Anchor extends React.Component {
  render() {
    const { classes, children, ...props } = this.props
    return (
      <Typography {...props} variant="h6" className={classes.anchor}>
        {children}
      </Typography>
    )
  }
}

export default withStyles(styles)(Anchor)
