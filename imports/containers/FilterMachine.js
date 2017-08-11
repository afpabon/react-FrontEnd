import React from 'react'
import { connect } from 'react-redux'
import { searchMachine } from '../actions'

let FilterMachine = ({ dispatch }) => {
  let input;
  submitFunction = e => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(searchMachine(input.value))
  };
  return (
    <div className="row">
      <form
        onSubmit={(e) => this.submitFunction(e)}
      >
        <div className="col-md-9">
          <input className = "form-control filter-text"
            ref={node => {
              input = node
            }}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-default filters-plate" type="submit">
            <span className="glyphicon glyphicon-search"></span>
          </button>
        </div>
      </form>
    </div>
  )
}
FilterMachine = connect()(FilterMachine)

export default FilterMachine