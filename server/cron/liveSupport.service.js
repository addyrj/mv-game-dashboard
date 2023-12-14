const liveSupportModel = require('../model/schema/liveSupportSchema');

// Function to remove all documents from the collection
async function removeLiveSupportDocuments() {
   try {
      // delete documents from live support model.
      const deleteDocuments = await liveSupportModel.deleteMany({
         isApproved: false,
         isAssigned: false,
         isRejected: false,
      });

      // Also remove documents that have been rejected by the support team.
      // const deleteRejectedDocuments = await liveSupportModel.deleteMany({})

      if (deleteDocuments.deletedCount) {
         console.log('Live support documents deleted');
      }
   } catch (error) {
      console.error('Error removing documents:', error);
   }
}

module.exports = {
   removeLiveSupportDocuments,
};
