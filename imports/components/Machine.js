import React from 'react'
import PropTypes from 'prop-types'

const Machine = ({ onClick, Identification, _id }) => (
  <button 
    id="{_id.valueOf()}"
    type="button"
    onClick={onClick}
    className="btn btn-sm show-variables">
      <i className="glyphicon glyphicon-plus"></i>{Identification.Number}
  </button>
)

Machine.propTypes = {
  _id: PropTypes.object.isRequired,
  Identification: PropTypes.object.isRequired,
}

export default Machine