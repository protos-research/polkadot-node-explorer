import React from 'react'
import CustomTable from '../components/CustomTable'
import Anchor from '../components/Anchor'

class NodeList extends React.Component {
  render() {
    return (
      <div>
        <Anchor id="list">Node List</Anchor>
        <CustomTable />
      </div>
    )
  }
}

export default NodeList
