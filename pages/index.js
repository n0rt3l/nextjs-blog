import React from 'react'
import Link from 'next/link'

function Index({posts}) {
  return (
    <React.Fragment>
      <br/>
      <div style={{margin: '0 auto', width: '800px'}}>
      {/* @ts-ignore */}
      {posts.map((post, index) => (

        <div>
          {/* @ts-ignore */}
          <Link href={'/post/[id]'} as={'/post/' + post.ID}><a><h2>{post.title}</h2></a></Link>
          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
          <br/>
        </div>

      ))}
      </div>
    </React.Fragment>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/n0rtel.wordpress.com/posts/');
  if (!response.ok) {
    // oups! something went wrong
    return;
  }

  const rjson = await response.json();

  return {
    props: {
      posts: rjson.posts,
    },
  }
}

export default Index
