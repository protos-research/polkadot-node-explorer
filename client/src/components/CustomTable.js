import React, { Component } from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import { CustomTableCell, CustomTableRowQuery } from './CustomTableRow'
import Queries from '../constants/queries'

const CustomTableRow = ({ children }) => (
  <TableRow>
    <CustomTableCell align="right">{children}</CustomTableCell>
  </TableRow>
)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
  },
})

class CustomTable extends Component {
  render() {
    const { classes } = this.props

    return (
      <Paper className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>#</CustomTableCell>
              <CustomTableCell align="right">
                Internet Service Provider
              </CustomTableCell>
              <CustomTableCell align="right">Server Name</CustomTableCell>
              <CustomTableCell align="right">Resolved IP</CustomTableCell>
              <CustomTableCell align="right">Location</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Query query={Queries.GET_NETWORK_INFO}>
              {({ loading, error, data }) => {
                if (loading) return <CustomTableRow>Loading</CustomTableRow>
                if (error) return <CustomTableRow>Error</CustomTableRow>

                const nodesToRender = data.networkInfo.nodes

                return nodesToRender.map((node, index) => (
                  <CustomTableRowQuery
                    index={index}
                    ipAddress={node.ipAddress}
                  />
                ))
              }}
            </Query>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CustomTable)
