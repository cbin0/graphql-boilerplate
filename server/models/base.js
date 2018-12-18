const Sequelize  = require('sequelize')
const _ = require('lodash')

module.exports = {
  attr(attrs) {
    return _.extend({
    }, attrs)
  },
  option(options) {
    return _.extend({
      freezeTableName: true
    }, options)
  }
}
