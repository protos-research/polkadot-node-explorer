import React from 'react'
import { Query, Subscription, withApollo, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import Queries from '../constants/queries'
import StatsCard from '../components/StatsCard'
import Anchor from '../components/Anchor'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 10,
  },
})

class Stats extends React.Component {
  state = {
    blockHeight: null,
    blockTimes: []
  }

  componentDidMount() {
    const {client} = this.props
    this.client = client
    this.client.subscribe({
      query: Queries.BLOCK_SUBSCRIPTION
    })
    .subscribe({
      next: ({ data }) => {
        const { newBlock={} } = data
        this.recordBlockTime(newBlock.blockHeight)
      }
    });
  }

  componentWillUnmount() {
    if (this.client && this.client.unsubscribe) {
      this.client.unsubscribe()
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Anchor>Stats</Anchor>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Query query={Queries.GET_NETWORK_SNAPSHOTS}>
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const { nodes } = data.networkSnapshots[0]

                return (
                  <StatsCard
                    size="large"
                    label="Nodes online (currently)"
                    data={nodes.length}
                    isInline={true}
                  />
                )
              }}
            </Query>
          </Grid>
          <Grid item xs={3}>
            {this.renderBlockHeight()}  
          </Grid>
          <Grid item xs={3}>
            {this.renderLastBlock()}
          </Grid>
          <Grid item xs={3}>
            {this.renderAverage()}
          </Grid>
        </Grid>
      </div>
    )
  }

  renderBlockHeight = () => {
    return <StatsCard size="small" label="Block Height" data={this.state.blockHeight} />
  }

  renderLastBlock = () => {
    const {blockTimes} = this.state
    const [current, prev] = blockTimes

    const lastBlock = blockTimes.length >= 2 ? (current - prev).toPrecision(2) : null

    return (
      <StatsCard
        size="small"
        label="Last block"
        data={lastBlock}
        dataLabel={lastBlock && 'sec ago'}
      />
    )
  }

  renderAverage = () => {
    const {blockTimes} = this.state

    const intervals = blockTimes.reduce((intervals, time, i, arr) => {
      const prevTime = arr[i-1]
      if (!!prevTime) {
        intervals.push(prevTime - time)
      }
      return intervals
    }, [])
    const average = intervals.reduce((a, b) => a + b, 0) / intervals.length
    
    return (
      <StatsCard
        size="small"
        label="Average block time"
        data={!!average && average.toPrecision(3)}
        dataLabel={!!average && 'sec'}
      />
    )
  }

  recordBlockTime = (blockHeight) => {
    const time = Date.now() / 1000
    const {blockTimes} = this.state
    const newBlockTimes = [time, ...blockTimes].slice(0, 100)
    this.setState({blockTimes: newBlockTimes, blockHeight})
  }
}

export default compose(
  withStyles(styles), 
  withApollo
)(Stats)
