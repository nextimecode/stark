import { getFirestore, doc, getDoc } from 'firebase/firestore'

import { firebase_app } from '@/firebase/config'

// Get the Firestore instance
const db = getFirestore(firebase_app)

// Function to retrieve a document from a Firestore collection
export default async function getDocument(collection: string, id: string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id)
  // Variable to store the result of the operation
  let result = null
  // Variable to store any error that occurs during the operation
  let error = null

  try {
    // Retrieve the document using the document reference
    result = await getDoc(docRef)
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e
  }

  // Return the result and error as an object
  return { result, error }
}