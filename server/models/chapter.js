const _             = require('lodash')
const Sequelize     = require('sequelize')
const { resolver }  = require("graphql-sequelize")
const baseModel     = require('./base')

module.exports = (sequelize) => {

  return sequelize.define('chapter', baseModel.attr({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: true,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: true
      }

    }), baseModel.option({

    })
  )

}
