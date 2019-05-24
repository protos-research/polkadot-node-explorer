import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Router, Route } from 'react-enroute'
import queryString from 'qs'

import appTheme from './utils/theme'
import apolloClient from './utils/apollo'
import Error404 from './views/Error404'
import Dashboard from './views/Dashboard'
import history from './models/history'
import { ApolloProvider } from 'react-apollo'

export default class Routes extends React.Component {
  state = {
    pathname: window.location.pathname,
    query: this._parseQuery(window.location.search),
  }

  componentDidMount() {
    history.listen(location => {
      const { pathname } = location
      this.setState({
        pathname,
        query: this._parseQuery(location.search),
      })
    })
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <MuiThemeProvider theme={createMuiTheme(appTheme)}>
          <CssBaseline />
          <Router location={this.state.pathname || '/'}>
            <Route path="/" component={Dashboard} />
            <Route path="*" component={Error404} />
          </Router>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }

  _parseQuery(query = '') {
    return queryString.parse(query, { ignoreQueryPrefix: true })
  }
}
