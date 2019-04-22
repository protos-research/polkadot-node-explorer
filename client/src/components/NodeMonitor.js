import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import StatsCard from '../components/StatsCard'
import Chart from '../components/Chart'
import Anchor from '../components/Anchor'

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
    const subscribe = {
      type: 'subscribe',
      channels: [
        {
          name: 'ticker',
          product_ids: ['BTC-USD'],
        },
      ],
    }

    this.ws = new WebSocket('wss://ws-feed.gdax.com')

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe))
    }

    this.ws.onmessage = e => {
      const value = JSON.parse(e.data)
      if (value.type !== 'ticker') {
        return
      }

      const oldBtcDataSet = this.state.lineChartData.datasets[0]
      const newBtcDataSet = { ...oldBtcDataSet }
      newBtcDataSet.data.push(value.price)

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        ),
      }
      this.setState({ lineChartData: newChartData })
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.nodeMonitor}>
          <Anchor id="monitor">Node Monitor</Anchor>
          <StatsCard
            size="small"
            label="Average nodes online"
            data="441"
            isInline={true}
          />
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

export default withStyles(styles)(NodeMonitor)
