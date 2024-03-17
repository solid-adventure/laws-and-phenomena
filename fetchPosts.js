import 'dotenv/config'

class PostSync {
  constructor() {

  }

  static test() {
    console.log('<<<<<<<<<<<<  PostSync Test >>>>>>>>>>>>>')
    const length = (process.env.NETLIFY_TOKEN || '').length
    console.log(`NETLIFY_TOKEN length: ${length}`)
  }

  fetchFromNetlify() {

  }

  format() {

  }

  writeLocally() {

  }
}

PostSync.test()