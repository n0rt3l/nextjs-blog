import React from 'react'
import Page from './page/[page]'
import { postperpage, loadPosts} from "../config";

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
  let allposts = await loadPosts()
  let allpages = allposts.length / postperpage

  return {
    props: {
      allpages: allpages,
      curpage: page,
      posts: allposts.slice(corpage*postperpage,(corpage*postperpage)+postperpage),
    },
  }
}

export default Page
