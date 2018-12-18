
module.exports = ({
  user, doc, chapter, docChapter
}) => {
  doc.Creator = doc.belongsTo(user, {as: 'creator'})
  user.Docs = user.hasMany(doc, {foreignKey: 'creatorId', as: 'docs'})

  doc.Chapters = doc.belongsToMany(chapter, {
    as: 'chapters',
    through: docChapter,
    foreignKey: 'docId'
  })

  chapter.Docs = chapter.belongsToMany(doc, {
    as: 'docs',
    through: docChapter,
    foreignKey: 'chapterId'
  })
}
