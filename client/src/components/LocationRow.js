import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { countries } from '../utils/countries'

const styles = theme => ({
  numberOfNodes: {
    width: '100px!',
    fontWeight: 600,
    fontSize: '1rem',
    letterSpacing: '0.05em',
  },
  country: {
    fontSize: '1rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
  },
  root: {
    width: '250px',
    paddingLeft: theme.spacing.unit * 2,
  },
})

class LocationRow extends Component {
  render() {
    const { classes, numberOfNodes, country, ...rowProps } = this.props

    return (
      <div className={classes.root} {...rowProps}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
            <Typography
              inline
              variant="body1"
              className={classes.numberOfNodes}
            >
              {numberOfNodes}
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography inline variant="body1" className={classes.country}>
              {countries.getName(country, 'en')}
            </Typography>
          </Grid>
        </Grid>
      </div>
    )
  }
}

LocationRow.defaultProps = {}

LocationRow.propTypes = {}
export default withStyles(styles)(LocationRow)
