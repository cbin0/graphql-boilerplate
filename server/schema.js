const _ = require('lodash')
const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID
} = require('graphql')

const {
  resolver,
  defaultArgs,
  defaultListArgs,
  attributeFields
} = require("graphql-sequelize")

module.exports = ({
  user, doc, chapter
}) => {

  let userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: () => _.assign(attributeFields(user), {
      docs: {
        type: new GraphQLList(docType),
        args: defaultListArgs(doc),
        resolve: resolver(user.Docs)
      }
    })
  })

  let chapterType = new GraphQLObjectType({
    name: 'chapter',
    description: 'A chapter',
    fields: attributeFields(chapter)
  })

  let docType = new GraphQLObjectType({
    name: 'Doc',
    description: 'A doc',
    fields: () => _.assign(attributeFields(doc), {
      creator: {
        type: userType,
        resolve: resolver(doc.Creator)
      },
      chapters: {
        type: new GraphQLList(chapterType),
        args: defaultListArgs(chapter),
        resolve: resolver(doc.Chapters)
      }
    })
  })

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        // Field for retrieving a user by ID
        docs: {
          type: new GraphQLList(docType),
          // args will automatically be mapped to `where`
          args: _.assign(defaultListArgs(doc), {
            id: {
              type: GraphQLID
            }
          }),
          resolve: resolver(doc)
        },
        users: {
          type: new GraphQLList(userType),
          args: _.assign(defaultListArgs(user), {
            id: {
              type: GraphQLID
            }
          }),
          resolve: resolver(user)
        }
      }
    })
  })
}
