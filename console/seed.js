import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'

let imageModel = null

async function loadJSON(filePath, value) {
  try {
    const module = await import(filePath, value)
    return module.default
  } catch (error) {
    console.error('Error loading JSON:', error)
    return null
  }
}

async function seeder() {
  if (fs.existsSync('./src/theme/data/images/favicon.png')) {
    fs.copyFileSync('./src/theme/data/images/favicon.png', './public/favicon.png')
  }

  let seed = await loadJSON('../src/theme/data/seed.json', { with: { type: 'json' } })
  const data = seed

  let portfolio = null

  imageModel = new mongoose.model(
    'images',
    new mongoose.Schema({
      filename: { type: String },
      url: { type: String },
      thumbnailURL: { type: String },
      mimeType: { type: String },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    }),
  )

  for (let collection_data of data.collections) {
    console.log('\x1b[34mCollection: ' + collection_data.name + '\x1b[0m')
    if (collection_data.name == 'themes') {
      await createModel(collection_data, { portfolio: portfolio })
    } else {
      let model = await createModel(collection_data)

      if (collection_data.name == 'portfolios') {
        portfolio = model._id.toString()
      }
    }
  }
}

function deconstructSchema(data, schema) {
  if (typeof data == 'string') {
    return { type: String }
  }

  if (typeof data == 'boolean') {
    return { type: Boolean }
  }

  if (typeof data == 'number') {
    return { type: Number }
  }

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      let r = []
      for (let value of data) {
        r.push(deconstructSchema(value))
      }
      return r
    }
  }

  let result = schema ?? {}

  for (let key of Object.keys(data)) {
    if (key.endsWith(':html')) {
      let parsedKey = key.split(':html')[0]
      result[parsedKey] = new mongoose.Schema(
        {
          root: new mongoose.Schema(
            {
              type: { type: String },
              format: { type: String },
              direction: { type: String },
              version: { type: Number },
              indent: { type: Number },
              children: [
                new mongoose.Schema(
                  {
                    children: [
                      new mongoose.Schema(
                        {
                          type: { type: String },
                          format: { type: String },
                          direction: { type: String },
                          version: { type: Number },
                          indent: { type: Number },
                          text: { type: String },
                        },
                        { _id: false },
                      ),
                    ],
                    tag: { type: String },
                    type: { type: String },
                    format: { type: String },
                    direction: { type: String },
                    version: { type: Number },
                    indent: { type: Number },
                  },
                  { _id: false },
                ),
              ],
            },
            { _id: false },
          ),
        },
        { _id: false },
      )

      continue
    }

    if (key.endsWith(':image')) {
      let parsedKey = key.split(':image')[0]
      result[parsedKey] = { type: String }

      continue
    }

    if (typeof data[key] == 'string') {
      result[key] = { type: String }
    }

    if (typeof data[key] == 'boolean') {
      result[key] = { type: Boolean }
    }

    if (typeof data[key] == 'number') {
      result[key] = { type: Number }
    }

    if (typeof data[key] == 'object') {
      if (Array.isArray(data[key])) {
        let desconstructedObject = [
          new mongoose.Schema(deconstructSchema(data[key]), { _id: false }),
        ]
        result[key] = desconstructedObject
      } else {
        let desconstructedObject = deconstructSchema(data[key])
        result[key] = desconstructedObject
      }
    }
  }

  return result
}

async function deconstructData(data, schema) {
  if (typeof data == 'string') {
    return data
  }

  if (typeof data == 'boolean') {
    return data
  }

  if (typeof data == 'number') {
    return data
  }

  if (Array.isArray(data)) {
    let result = []

    for (let value of data) {
      result.push(await deconstructData(value))
    }

    return result
  }

  let result = schema ?? {}

  for (let key of Object.keys(data)) {
    if (key.endsWith(':html')) {
      let parsedKey = key.split(':html')[0]
      result[parsedKey] = parseRichText(data[key])

      continue
    }

    if (key.endsWith(':image')) {
      let parsedKey = key.split(':image')[0]
      result[parsedKey] = await parseImage(data[key])

      continue
    }

    if (typeof data[key] == 'string') {
      result[key] = data[key]
    }

    if (typeof data[key] == 'boolean') {
      result[key] = data[key]
    }

    if (typeof data[key] == 'number') {
      result[key] = data[key]
    }

    if (typeof data[key] == 'object') {
      if (Array.isArray(data[key])) {
        result[key] = await deconstructData(data[key])
      } else {
        result[key] = await deconstructData(data[key])
      }
    }
  }

  return result
}

async function createModel(collection_data, data) {
  let mongooseModelSchema = deconstructSchema(collection_data.data)

  if (data) {
    mongooseModelSchema = deconstructSchema(data, mongooseModelSchema)
  }

  let mongooseModel = mongoose.model(
    collection_data.name,
    new mongoose.Schema({
      ...mongooseModelSchema,
      createdAt: { type: Date },
      updatedAt: { type: Date },
    }),
  )

  let mongooseModelData = await deconstructData(collection_data.data)

  if (data) {
    mongooseModelData = await deconstructData(data, mongooseModelData)
  }

  let model = new mongooseModel({
    ...mongooseModelData,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  await model.save()

  return model
}

function parseRichText(value) {
  if (!value) {
    return null
  }

  let c = {
    root: {
      children: [],
      direction: null,
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }

  let fields = []

  for (let v of value) {
    if (v.type == 'h1') {
      fields.push({
        children: [
          {
            text: v.text,
            detail: 0,
            format: v.format ?? '',
            mode: 'normal',
            style: '',
            type: 'text',
            version: 1,
          },
        ],
        direction: null,
        format: v.format ?? '',
        indent: 0,
        tag: v.type,
        type: 'heading',
        version: 1,
      })
    }

    if (v.type == 'p') {
      fields.push({
        children: [
          {
            text: v.text,
            detail: 0,
            format: v.format ?? '',
            mode: 'normal',
            style: '',
            type: 'text',
            version: 1,
          },
        ],
        direction: null,
        format: v.format ?? '',
        indent: 0,
        tag: v.type,
        type: 'paragraph',
        version: 1,
      })
    }
  }

  c.root.children = fields

  let result = JSON.parse(JSON.stringify(c))

  return result
}

async function parseImage(value) {
  if (!fs.existsSync('./images')) {
    fs.mkdirSync('./images', { recursive: true })
  }

  if (!fs.existsSync('./images/' + value)) {
    fs.copyFileSync('./src/theme/data/images/' + value, './images/' + value)
  }

  let imageModelData = new imageModel({
    filename: value,
    url: '/api/images/file/' + value,
    thumbnailURL: '/api/images/file/' + value,
    mimeType: 'image/jpeg',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  await imageModelData.save()

  return imageModelData._id.toString()
}

const main = async () => {
  dotenv.config()
  console.log('Seeding...')

  await mongoose.connect(process.env.DATABASE_URI)

  await seeder()

  console.log('\x1b[42m\x1b[37mDone.\x1b[0m')

  process.exit(0)
}

main()
