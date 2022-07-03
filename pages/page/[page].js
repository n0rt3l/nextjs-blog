import React from 'react'
import Link from 'next/link'

const postperpage = 2

function Page({posts,allpages,curpage }) {
  let pagesElements = []
  for (let i=1; i < allpages+1; i++) {
    pagesElements.push((<React.Fragment><Link href={'/page/'+i}>{curpage == i ? '['+i+']' : i }</Link>&nbsp;</React.Fragment>))
  }

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
        Страницы: {pagesElements}
      </div>
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/n0rtel.wordpress.com/posts');
  if (!response.ok) {
    // oups! something went wrong
    return;
  }
  const jsonPosts = await response.json();

  let allpages = Math.round(jsonPosts.posts.length / postperpage)
  console.log("PAGES = ",allpages)

  let paths = []
  for (let i=1; i < allpages+1; i++) {
    paths.push({
      params: {page: "" + i},
    })
  }

  console.log('Path= ', paths)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {paths, fallback: false}

}


export async function getStaticProps(context) {
  const { page } = context.params;
  const corpage = page-1
  const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/n0rtel.wordpress.com/posts/');
  if (!response.ok) {
    // oups! something went wrong
    return;
  }

  const rjson = await response.json();
  let allpages = rjson.posts.length / postperpage

  return {
    props: {
      allpages: allpages,
      curpage: page,
      posts: rjson.posts.slice(corpage*postperpage,(corpage*postperpage)+postperpage),
    },
  }
}

export default Page
