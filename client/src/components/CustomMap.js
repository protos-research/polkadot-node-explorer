import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import tooltip from 'wsdm-tooltip'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

import {
  COLOR_LIGHT_GREY,
  COLOR_MEDIUM_GREY,
  COLOR_PURPLE,
  COLOR_PINK,
} from '../utils/theme'

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
}

class CustomMap extends Component {
  componentDidMount() {
    this.tip = tooltip({
      className: 'custom-tooltip',
      styles: {
        'font-size': '0.75rem',
        'color': 'black',
        'background-color': 'white',
        'font-family': 'Helvetica',
        'border-radius': '3px',
        'width': '100px',
        'text-align': 'left',
        'line-height': '1.4',
      },
    })
    this.tip.create()
  }

  render() {
    const { nodesPerCountry } = this.props
    const nodesValues = Object.values(nodesPerCountry)
    const max = Math.max(...nodesValues)

    const nodeScale = scaleLinear()
      .domain([0, max / 14, max])
      .range([COLOR_MEDIUM_GREY, COLOR_PURPLE, COLOR_PINK])

    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11, 0, 0],
          }}
          width={980}
          height={551}
          style={{
            width: '100%',
            height: 'auto',
          }}
        >
          <ZoomableGroup center={[0, 20]} disablePanning>
            <Geographies
              geography="world-50m-with-population.json"
              disableOptimization
            >
              {(geographies, projection) =>
                geographies.map((geography, i) => {
                  return (
                    <Geography
                      key={i}
                      data-tip={geography.properties.name}
                      geography={geography}
                      projection={projection}
                      onMouseMove={this.handleMouseMove}
                      onMouseLeave={this.handleMouseLeave}
                      style={{
                        default: {
                          fill: nodeScale(
                            this.getNumOfNodes(geography.properties.iso_a2)
                          ),
                          stroke: 'transparent',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: COLOR_LIGHT_GREY,
                          stroke: 'transparent',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: COLOR_LIGHT_GREY,
                          stroke: 'transparent',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }

  handleMouseMove = (geography, evt) => {
    const numOfNodes = this.getNumOfNodes(geography.properties.iso_a2)
    const nodeText = numOfNodes === 1 ? 'Node' : 'Nodes'
    this.tip.show(
      renderToString(
        <div>
          {geography.properties.name}
          <br />
          <span style={{ fontWeight: 'bold' }}>{numOfNodes}</span> {nodeText}
        </div>
      )
    )

    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }

  handleMouseLeave = () => {
    this.tip.hide()
  }

  getNumOfNodes = country => {
    const { nodesPerCountry } = this.props
    if (nodesPerCountry[country] !== undefined) {
      return nodesPerCountry[country]
    }
    return 0
  }
}

export default CustomMap
