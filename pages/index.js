import React from 'react'
import Link from 'next/link'
import Page from './page/[page]'
const postperpage = 2

function Index(context) {

  return (
      <React.Fragment>
        <Page {...context} />
      </React.Fragment>
  )
}

export async function getStaticProps(context) {
  const page  = 1
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
