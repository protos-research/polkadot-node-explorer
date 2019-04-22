import React, { Component } from 'react'
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps'
import { scaleLinear } from 'd3-scale'

const wrapperStyles = {
  width: '100%',
  maxWidth: 980,
  margin: '0 auto',
}

const popScale = scaleLinear()
  .domain([0, 100000000, 1400000000])
  .range(['#dbdbdb', '#8c8c8c', '#494949'])

class CustomMap extends Component {
  render() {
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
          <ZoomableGroup center={[0, 20]}>
            <Geographies geography="world-50m-with-population.json">
              {(geographies, projection) =>
                geographies.map((geography, i) => (
                  <Geography
                    key={i}
                    geography={geography}
                    projection={projection}
                    onClick={this.handleClick}
                    style={{
                      default: {
                        fill: popScale(geography.properties.pop_est),
                        stroke: '#8c8c8c',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#303030',
                        stroke: '#8c8c8c',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#303030',
                        stroke: '#8c8c8c',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default CustomMap
