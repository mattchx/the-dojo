import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

export default function useDocument(collection, id) {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // realtime data for document
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)

    const unsub = ref.onSnapshot(
      (snapshot) => {
        setDocument({ ...snapshot.data() })
        setError(null)
      },
      (err) => {
        console.log(err.message)
        setError('failed to get document')
      }
    )
    //
    return () => unsub()
    //
  }, [collection, id])

  return { document, error }
}
