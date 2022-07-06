import React from 'react'
import Link from 'next/link'
import {postperpage, loadPosts} from '../../config'


function Page({posts, allpages, curpage}) {
  let pagesElements = []
  for (let i = 1; i < allpages + 1; i++) {
    pagesElements.push((
      <React.Fragment><Link href={'/page/' + i}>{curpage == i ? '[' + i + ']' : i}</Link>&nbsp;</React.Fragment>))
  }

  let pagination = (<React.Fragment><span class="pages"><span>Страницы: </span>{pagesElements}</span></React.Fragment>)

  return (
    <React.Fragment>
      <br/>
      <div style={{margin: '0 auto', width: '800px'}}>
        {posts.map((post, index) => (

          <div class="post-cut">
            <Link href={'/post/[id]'} as={'/post/' + post.ID}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
            <div dangerouslySetInnerHTML={{__html: post.excerpt}}></div>
            <br/>
          </div>

        ))}
        {allpages > 1 && pagination}
      </div>
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  let allposts = await loadPosts()

  let allpath = allposts.map((post) => ({
    params: {id: "" + post.ID},
  }))

  let allpages = Math.round(allpath.length / postperpage)
  console.log("[page] pages = ", allpages)

  let paths = []
  for (let i = 1; i < allpages + 1; i++) {
    paths.push({
      params: {page: "" + i},
    })
  }

  console.log('[pages] Paths= ', paths)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {paths, fallback: false}

}


export async function getStaticProps(context) {
  const {page} = context.params;
  const corpage = page - 1

  let allposts = await loadPosts()

  let allpages = allposts.length / postperpage

  return {
    props: {
      allpages: allpages,
      curpage: page,
      posts: allposts.slice(corpage * postperpage, (corpage * postperpage) + postperpage).map(x => ({
        title: x.title,
        excerpt: x.excerpt,
        ID: x.ID
      })),
    },
  }
}

export default Page
