const _             = require('lodash')
const Sequelize     = require('sequelize')
const { resolver }  = require("graphql-sequelize")
const baseModel     = require('./base')

module.exports = (sequelize) => {

  return sequelize.define('doc', baseModel.attr({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: true,
        primaryKey: true
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false
      },

      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }

    }), baseModel.option({

    })
  )

}
