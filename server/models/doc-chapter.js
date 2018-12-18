const _             = require('lodash')
const Sequelize     = require('sequelize')
const { resolver }  = require("graphql-sequelize")
const baseModel     = require('./base')

module.exports = (sequelize) => {

  return sequelize.define('docChapter', baseModel.attr({
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: true,
        primaryKey: true
      },

      docId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      chapterId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }

    }), baseModel.option({

    })
  )

}
