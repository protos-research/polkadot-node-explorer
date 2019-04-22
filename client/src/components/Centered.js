import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'

const Centered = props => {
  const style = 'container' in props ? { flex: '1 0 auto' } : {}

  return (
    <Grid
      container
      className="animated fadeIn"
      justify="center"
      alignItems="center"
      direction="column"
      style={style}
    >
      {props.children}
    </Grid>
  )
}

Centered.propTypes = {
  container: PropTypes.bool,
}

export default Centered
