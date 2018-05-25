import { Chip, withStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

function Options({ classes: { chip }, options }) {
  return options.map(option => (
    <Chip key={option} className={chip} label={option} />
  ))
}

Options.propTypes = {
  classes: PropTypes.shape({ chip: PropTypes.string.isRequired }).isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default withStyles(theme => ({
  chip: { margin: theme.spacing.unit }
}))(Options)
