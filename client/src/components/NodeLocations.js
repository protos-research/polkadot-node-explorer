import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

import { COLOR_DARKEST_GREY, COLOR_MEDIUM_GREY } from '../utils/theme'
import CustomMap from '../components/CustomMap'
import CustomHeader from '../components/CustomHeader'
import LocationRow from '../components/LocationRow'
import CustomProgress from '../components/CustomProgress'
import Anchor from '../components/Anchor'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 10,
  },
  column: {
    boxShadow: `0px -30px 0px -29px ${COLOR_MEDIUM_GREY}, 0px 30px 0px -29px ${COLOR_MEDIUM_GREY}`,
  },
})

class NodeLocations extends React.Component {
  renderList = () => {
    const { nodesPerCountry } = this.props
    const countriesSorted = Object.keys(nodesPerCountry).sort(function(a, b) {
      return nodesPerCountry[b] - nodesPerCountry[a]
    })
    const numOfNodesSorted = countriesSorted.map(key => nodesPerCountry[key])
    return countriesSorted.map((country, i) => {
      if (i < 9) {
        return (
          <LocationRow
            index={i}
            country={country}
            numberOfNodes={numOfNodesSorted[i]}
          />
        )
      }
      return null
    })
  }
  render() {
    const { classes, nodesPerCountry } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>
          <Anchor id="locations">Node Locations</Anchor>
        </Typography>
        <Grid container>
          <Grid item xs={6} style={{ backgroundColor: COLOR_DARKEST_GREY }}>
            <CustomMap nodesPerCountry={nodesPerCountry} />
          </Grid>
          <Grid item xs={3} className={classes.column}>
            <CustomHeader
              label="Top locations"
              style={{ paddingLeft: '16px', paddingBottom: '24px' }}
            />
            {this.renderList()}
          </Grid>
          <Grid item xs={3} className={classes.column}>
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
