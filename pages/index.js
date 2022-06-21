import React from 'react'
import Link from 'next/link'
import Header from "./header";

function Index({ posts }) {
  return (
    <React.Fragment>
      <Header />
      <br/>
      {/* @ts-ignore */}
      {posts.map((post, index) => (

        <div>
          {/* @ts-ignore */}
          <Link href={'/post/[id]'} as={'/post/'+post.ID}><h3>{post.title}</h3></Link>
          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
          <br/>
        </div>

      ))}
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
