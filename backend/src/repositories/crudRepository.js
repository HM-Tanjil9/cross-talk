export default function crudRepository(model) {
  return {
    create: async function (data) {
      const newDocument = await model.create(data);
      return newDocument;
    },
    getAll: async function () {
      const allDocuments = await model.find();
      return allDocuments;
    },
    getById: async function (id) {
      const document = await model.findById(id);
      return document;
    },
    delete: async function (id) {
      const deletedDocument = await model.findByIdAndDelete(id);
      return deletedDocument;
    },
    update: async function (id, data) {
      const updateDocument = await model.findByIdAndUpdate(id, data, {
        new: true
      });
      return updateDocument;
    }
  };
}
