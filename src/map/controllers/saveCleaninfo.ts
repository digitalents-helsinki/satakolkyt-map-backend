import { db } from '@/config/arangodb'
import { RequestHandler } from 'express'
const collection = db.collection('cleaninfos')

export const saveCleanInfo: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    collection.save(req.body).then(
      meta => console.log('Document saved:', meta._rev),
      err => console.error('Failed to save document:', err)
    );
    res.end()

  } catch (err) {
    res.send({ error: err.message })
  }
}
