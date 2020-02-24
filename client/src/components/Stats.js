import React from 'react'
import numeral from 'numeral'

import { Query, withApollo, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { COLOR_PINK } from '../utils/theme'

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
    latestBlock: {},
    blockTimes: [],
  }

  componentDidMount() {
    const { client } = this.props
    this.client = client
    this.client
      .subscribe({
        query: Queries.BLOCK_SUBSCRIPTION,
      })
      .subscribe({
        next: ({ data }) => {
          const { newBlock = {} } = data
          this.recordBlockTime(newBlock)
        },
      })
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
            <Query query={Queries.GET_NETWORK_INFO}>
              {({ loading, error, data }) => {
                if (error) console.error(error)
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const { nodes } = data.networkInfo

                return (
                  <StatsCard
                    size="large"
                    label="Nodes online (currently)"
                    data={nodes.length}
                    isInline={true}
                    color="pink"
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
          <Grid item xs={3}>
            {this.renderLatestBlock()}
          </Grid>
        </Grid>
      </div>
    )
  }

  renderLatestBlock = () => {
    const { latestBlock={} } = this.state

    return (
      <div>   
        <Anchor>Parent Hash</Anchor>   
        <a href={`https://polkascan.io/pre/alexander/system/block/${latestBlock.parentHash}`} target="_blank" rel="noreferrer noopener">
          <Typography style={{color: COLOR_PINK, textDecoration: 'none'}}>
            {latestBlock.parentHash}
          </Typography>
        </a>
      </div>
    )
  }

  renderBlockHeight = () => {
    const { latestBlock={} } = this.state
    return (
      <StatsCard
        size="small"
        label="Block Height"
        data={numeral(latestBlock.blockHeight).format('0,0')}
      />
    )
  }

  renderLastBlock = () => {
    const { blockTimes } = this.state
    const [current, prev] = blockTimes

    const lastBlock =
      blockTimes.length >= 2 ? (current - prev).toPrecision(2) : null

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
    const { blockTimes } = this.state

    const intervals = blockTimes.reduce((intervals, time, i, arr) => {
      const prevTime = arr[i - 1]
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

  recordBlockTime = latestBlock => {
    const time = Date.now() / 1000
    const { blockTimes } = this.state
    const newBlockTimes = [time, ...blockTimes].slice(0, 100)
    this.setState({ latestBlock, blockTimes: newBlockTimes })
  }
}

export default compose(
  withStyles(styles),
  withApollo
)(Stats)
