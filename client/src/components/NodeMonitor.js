import React from 'react'
import { Query, withApollo, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'

import StatsCard from '../components/StatsCard'
import Chart from '../components/Chart'
import Anchor from '../components/Anchor'
import Queries from '../constants/queries'

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 10,
  },
  chartContainer: {
    height: '250px',
  },
  nodeMonitor: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

class NodeMonitor extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: 'line',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'black',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          borderWidth: '2',
          lineTension: 0.45,
          data: [],
        },
      ],
    },
    lineChartOptions: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10,
            },
          },
        ],
      },
    },
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

          const oldDataSet = this.state.lineChartData.datasets[0]
          const newDataSet = { ...oldDataSet }
          newDataSet.data.push(newBlock.blockHeight)

          const newChartData = {
            ...this.state.lineChartData,
            datasets: [newDataSet],
            labels: this.state.lineChartData.labels.concat(
              new Date().toLocaleTimeString()
            ),
          }
          this.setState({ lineChartData: newChartData })
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
        <div className={classes.nodeMonitor}>
          <Anchor id="monitor">Node Monitor</Anchor>
          <Query query={Queries.GET_NETWORK_SNAPSHOTS}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const { nodes } = data.networkSnapshots[0]

              return (
                <StatsCard
                  size="small"
                  label="Average nodes online"
                  data={nodes.length}
                  isInline={true}
                />
              )
            }}
          </Query>
        </div>
        <div className={classes.chartContainer}>
          <Chart
            data={this.state.lineChartData}
            options={this.state.lineChartOptions}
          />
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withApollo
)(NodeMonitor)
