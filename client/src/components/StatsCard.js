import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CustomHeader from './CustomHeader'

const styles = theme => ({
  item: {
    borderRadius: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  dataLabel: {
    fontWeight: 100,
    letterSpacing: '2px',
  },
})

class StatsCard extends Component {
  renderContent = () => {
    const { classes, size, label, data, dataLabel, isInline } = this.props
    const dataFontSize = {
      large: 'h2',
      small: 'h4',
    }
    const displayStyle = {
      true: 'flex',
      false: 'initial',
    }
    const labelPadding = {
      true: '0 8px',
      false: '0',
    }

    return (
      <div style={{ display: displayStyle[isInline], alignItems: 'top' }}>
        {size === 'small' && (
          <CustomHeader
            label={label}
            inline={isInline}
            style={{ padding: labelPadding[isInline] }}
          />
        )}
        <Typography
          inline
          className={classes.data}
          variant={dataFontSize[size]}
        >
          {data}
        </Typography>
        <Typography
          inline
          className={classes.dataLabel}
          variant={dataFontSize[size]}
        >
          {' '}
          {dataLabel}
        </Typography>
        {size === 'large' && (
          <CustomHeader
            label={label}
            inline={isInline}
            style={{
              padding: '0 16px 16px 16px',
              width: '150px',
              lineHeight: '16px',
            }}
          />
        )}
      </div>
    )
  }

  render() {
    const { classes, size, isInline } = this.props
    const cardProps = {
      elevation: 0,
      classes: {
        root: classes.item,
      },
    }
    const paddingStyle = {
      true: '',
      false: '0 24px',
    }
    const height = {
      large: '88px',
      small: '72px',
    }
    const shadow = {
      large: '-24px 0px 0px -23px black',
      small: '-16px 0px 0px -15px black',
    }

    return (
      <Card
        {...cardProps}
        style={{ height: height[size], boxShadow: shadow[size] }}
      >
        <CardContent style={{ padding: paddingStyle[isInline] }}>
          {this.renderContent()}
        </CardContent>
      </Card>
    )
  }
}

StatsCard.defaultProps = {
  size: 'small',
  isInline: false,
}

StatsCard.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.string,
  isInline: PropTypes.bool,
}
export default withStyles(styles)(StatsCard)
