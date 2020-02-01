import React from 'react'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'

import Head from '../components/Head'
import PageContainer from '../components/PageContainer'
import Centered from '../components/Centered'
import Stats from '../components/Stats'
import NodeMonitor from '../components/NodeMonitor'
import NodeLocations from '../components/NodeLocations'
import NodeList from '../components/NodeList'
import Queries from '../constants/queries'
import LoadingIndicator from '../components/LoadingIndicator'
// import NavBar from '../components/Navbar'

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
            {/* <NavBar /> */}
            <div className={classes.content}>
              <Stats />
              <NodeMonitor />
              <Query query={Queries.GET_NETWORK_INFO}>
                {({ loading, error, data }) => {
                  if (loading) return <LoadingIndicator />
                  if (error) return <div>Error</div>

                  const nodesToRender = data.networkInfo.nodes

                  const nodesPerCountry = nodesToRender.reduce(
                    (total, node) => {
                      if (node.country != null) {
                        total[node.country] = total[node.country] || 0
                        total[node.country] += 1
                      }
                      return total
                    },
                    {}
                  )

                  return <NodeLocations nodesPerCountry={nodesPerCountry} />
                }}
              </Query>
              <NodeList />
            </div>
          </div>
        </Centered>
      </PageContainer>
    )
  }
}

export default withStyles(styles)(Landing)
