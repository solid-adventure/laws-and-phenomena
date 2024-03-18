import 'dotenv/config'
import fs from 'fs'

const baseUrl = 'https://api.netlify.com/api/v1'
const netlifyToken = process.env.NETLIFY_TOKEN
const formId = process.env.POSTS_FORM_ID
const filePath = './src/assets/posts.json'

class PostSync {
  constructor() {
    this.logStart()
  }

  logStart() {
    console.log('<<<<<<<<<<<<  PostSync Start >>>>>>>>>>>>>')
    const length = (netlifyToken || '').length
    console.log(`NETLIFY_TOKEN length: ${length}`)
    console.log(`POSTS_FORM_ID: ${formId}`)
  }

  logFinish() {
    console.log('Posts before: ', this.postCountBefore)
    console.log('Posts after: ', this.postCountAfter)
    console.log('<<<<<<<<<<<<  PostSync Finish >>>>>>>>>>>>>')
  }

  async fetchFromNetlify() {
    const data = await fetch(`${baseUrl}/forms/${formId}/submissions`,
      {
        headers: {
          'User-Agent': 'Build Script',
          'Authorization': `Bearer ${netlifyToken}`,
        }
      })
    .then(response => response.json())
    .then(data => this.format(data))
    .then(formatted => this.writeLocally(formatted))
    .then(na => this.logFinish())
    .catch(e => { console.error('Could not fetch posts from Netlify: ', e) })
  }

  format(data) {
    let out = []
    data = data.filter(post => post.data?.title !== "")
    for (let post of data) {
      out.push({
        id: post.number,
        title: post.data?.title,
        description: post.data?.description,
        reference_link: post.data?.reference_link,
        created_at: post.created_at,
        updated_at: post.created_at
      })
    }
    return out
  }

  writeLocally(formatted) {
    // Read the file saved to disk
    let posts = JSON.parse(fs.readFileSync(filePath))
    this.postCountBefore = posts.length

    // Add posts to existing
    posts.push(...formatted)

    // Remove duplicates
    posts = posts.reduce((current,next) => {
    if(!current.some(a=> a.id === next.id)){
        current.push(next);
      }
      return current;
    },[])

    // Write the new list to disk
    this.postCountAfter = posts.length
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  }
}

new PostSync().fetchFromNetlify()
