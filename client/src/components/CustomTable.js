import React, { Component } from 'react'
import { Query } from 'react-apollo'
import PropTypes from 'prop-types'
import _sortBy from 'lodash.sortby'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import Paper from '@material-ui/core/Paper'
import TableRow from '@material-ui/core/TableRow'
import { CustomTableCell } from './CustomTableRow'
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
              <CustomTableCell align="right">Resolved IP</CustomTableCell>
              <CustomTableCell align="right">Location</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Query query={Queries.GET_NETWORK_INFO}>
              {({ loading, error, data }) => {
                if (loading) return null
                if (error) return <CustomTableRow>Error</CustomTableRow>

                // Clean out faulty addresses
                const nodesToRender = data.networkInfo.nodes.map(node => {
                  if (!node.ipAddress) {
                    return {
                      ...node, 
                      country: null,
                      city: null, 
                      region: null, 
                      asHandle: null
                    }
                  } else {
                    return node
                  }
                })

                return _sortBy(nodesToRender, ['country']).map((node, index) => (
                  <TableRow key={index}>
                    <CustomTableCell align="right">{index + 1}</CustomTableCell>
                    <CustomTableCell align="right">
                      {node.asHandle || '-'}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {node.ipAddress || '-'}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {(node.country &&
                        [node.city, node.country].filter(a => a).join(', ')) ||
                        '-'}
                    </CustomTableCell>
                  </TableRow>
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
