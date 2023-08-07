import FirebaseController from "./FirebaseController"

/* eslint-disable camelcase */

async function createOffer(offer) {
  const firebaseController = new FirebaseController("offers")
  firebaseController.setDocument(offer)
}

async function readOffers() {
  const firebaseController = new FirebaseController("offers")
  const docs = await firebaseController.readAllDocuments()
  return docs
}

async function deleteOffer(id) {
  const firebaseController = new FirebaseController("offers")
  firebaseController.deleteDocument(id)
}

export { createOffer, readOffers, deleteOffer }
