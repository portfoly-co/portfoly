import mongoose from 'mongoose'
import dotenv from 'dotenv'

const main = async () => {
  dotenv.config()
  console.log('Clearing...')

  await mongoose.connect(process.env.DATABASE_URI)

  console.log('Clearing Database...')
  await mongoose.connection.db.dropDatabase()

  console.log('\x1b[42m\x1b[37mDone.\x1b[0m')

  process.exit(0)
}

main()
