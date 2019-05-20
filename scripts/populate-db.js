const path = require('path')
require('dotenv-safe').config({
  path: path.resolve(process.cwd(), '.env'),
  example: path.resolve(process.cwd(), '.env.example')
})
const arango = require('arangojs')

const { DB_USER, DB_PASS, DB_NAME, DB_URL } = process.env
/**
 * Checks (rudimentally) if the given JSON is valid for the database.
 * TODO: Make the validation better.
 * @returns {Boolean}
 */
function isGeoJsonValid(target) {
  return Array.isArray(target) && target.length > 0
}

/**
 *
 * @param {Object} options
 * @param {Array} options.geojson
 * @param {String} options.collectionName
 */
async function populateDB({ geojson, collectionName }) {
  console.time('')
  if (!isGeoJsonValid(geojson)) {
    console.error(
      new Error(
        'geoJSON is not in satisfactory format (needs to be an array of objects)'
      )
    )
    process.exit(1)
  }

  // Create database connection
  const connection = new arango.Database({
    url: DB_URL
  })
    .useBasicAuth(DB_USER, DB_PASS)
    .useDatabase(DB_NAME)

  try {
    // Create collection and catch if the collection already exists.
    const collectionRef = connection.collection(collectionName)
    await collectionRef.create().catch(err => {
      if (err.code === 409) {
        console.log(`Found existing collection '${collectionName}'. `)
        return
      }

      throw err
    })
    const reservations = connection.collection('reservations')
    await reservations.create().catch(err => {
      if (err.code === 409) {
        console.log(`Found existing collection 'reservations'. `)
        return
      }

      throw err
    })
    const cleaninfos = connection.collection('cleaninfos')
    await cleaninfos.create().catch(err => {
      if (err.code === 409) {
        console.log(`Found existing collection 'cleaninfos'. `)
        return
      }

      throw err
    })
    const misc = connection.collection('misc')
    await misc.create().catch(err => {
      if (err.code === 409) {
        console.log(`Found existing collection 'misc'. `)
        return
      }

      throw err
    })

    // Check if the collection is already populated. If so, throw error and abort.
    const collectionDocumentsRef = await collectionRef.list()
    if (
      Array.isArray(collectionDocumentsRef) &&
      collectionDocumentsRef.length > 0
    ) {
      throw new Error(
        `Collection '${collectionName}' is not empty. Aborting...`
      )
    }

    // Index the collection with geospatial structure.
    await collectionRef.createGeoIndex(['geometry'])

    // Populate the collection with the given geojson
    for (let obj of geojson) {
      const savedDocuments = await collectionRef.save(obj)
    }

    console.log('Done!')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

populateDB({
  geojson: require('./data/geo.json'),
  collectionName: 'geojson_features'
})

module.exports = populateDB
