import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Head from '../components/Head'
import PageContainer from '../components/PageContainer'
import Centered from '../components/Centered'
import NavBar from '../components/Navbar'
import Stats from '../components/Stats'
import NodeMonitor from '../components/NodeMonitor'
import NodeLocations from '../components/NodeLocations'
import NodeList from '../components/NodeList'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  content: {
    height: '100%',
    width: '100%',
    padding: theme.spacing.unit * 5,
  },
})

class Landing extends React.PureComponent {
  render() {
    const { classes } = this.props

    return (
      <PageContainer>
        <Head title="Polkadot Node Explorer" />
        <Centered container>
          <div className={classes.root}>
            <NavBar />
            <div className={classes.content}>
              <Stats />
              <NodeMonitor />
              <NodeLocations />
              <NodeList />
            </div>
          </div>
        </Centered>
      </PageContainer>
    )
  }
}

export default withStyles(styles)(Landing)
