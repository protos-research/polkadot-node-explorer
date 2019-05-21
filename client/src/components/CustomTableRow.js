import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import Queries from '../constants/queries'

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

class CustomTableRow extends Component {
  render() {
    const { data } = this.props
    const { index } = data.variables
    const { loading, error, ipInfo } = data

    if (loading) {
      return <h4>Loading...</h4>
    }
    if (error) {
      return <h4>{error.message}</h4>
    }
    if (ipInfo.status !== 'success') {
      return null
    }

    return (
      <TableRow key={index}>
        <CustomTableCell align="right">{index+1}</CustomTableCell>
        <CustomTableCell align="right">{ipInfo.isp}</CustomTableCell>
        <CustomTableCell align="right">{ipInfo.as}</CustomTableCell>
        <CustomTableCell align="right">{ipInfo.query}</CustomTableCell>
        <CustomTableCell align="right">{`${ipInfo.city}, ${
          ipInfo.country
        }`}</CustomTableCell>
        <CustomTableCell align="right">{ipInfo.status}</CustomTableCell>
      </TableRow>
    )
  }
}

const CustomTableRowQuery = graphql(Queries.GET_IP_DETAILS, {
  options: ({ index, ipAddress }) => {
    return { variables: { index, ipAddress } }
  },
})(CustomTableRow)

export { CustomTableCell, CustomTableRowQuery }
