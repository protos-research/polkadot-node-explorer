import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CustomMap from '../components/CustomMap'
import CustomHeader from '../components/CustomHeader'
import LocationRow from '../components/LocationRow'
import CustomProgress from '../components/CustomProgress'
import Anchor from '../components/Anchor'
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 10,
  },
  locationInfo: {
    boxShadow: '0px -30px 0px -29px black, 0px 30px 0px -29px black',
  },
})

class NodeLocations extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          <Anchor id="locations">Node Locations</Anchor>
        </Typography>
        <Grid container>
          <Grid item xs={6} style={{ border: '1px solid lightgrey' }}>
            <CustomMap />
          </Grid>
          <Grid item xs={3} className={classes.locationInfo}>
            <CustomHeader
              label="Top locations"
              style={{ paddingLeft: '16px', paddingBottom: '24px' }}
            />
            <LocationRow numberOfNodes="115" country="United States" />
            <LocationRow numberOfNodes="105" country="Germany" />
            <LocationRow numberOfNodes="87" country="Japan" />
            <LocationRow numberOfNodes="23" country="France" />
            <LocationRow numberOfNodes="19" country="Singapore" />
            <LocationRow numberOfNodes="18" country="Netherlands" />
            <LocationRow numberOfNodes="13" country="United Kingdom" />
            <LocationRow numberOfNodes="8" country="Russia" />
            <LocationRow numberOfNodes="8" country="Australia" />
          </Grid>
          <Grid item xs={3} className={classes.locationInfo}>
            <CustomHeader
              label="Operating Systems"
              style={{ paddingLeft: '16px' }}
            />
            <CustomProgress value={87} label="Linux" />
            <CustomProgress value={7} label="Windows" />
            <CustomProgress value={3} label="Mac" />
            <CustomProgress value={3} label="Other" />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(NodeLocations)
