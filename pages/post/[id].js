import React, {useEffect} from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import plaintext from 'highlight.js/lib/languages/plaintext';
import {loadPosts, wordpressUrl} from "../../config";

const Id = ({post}) => {

  useEffect(() => {

    console.log('mount')
    hljs.registerLanguage('plain', plaintext);
    hljs.configure({
      languageDetectRe: /brush: ([\w-]+);/, // for `grammar-swift` style CSS naming
      cssSelector: 'div.wp-block-syntaxhighlighter-code > pre'
    });

    console.log('update')
    hljs.highlightAll()
  })
  // @ts-ignore
  //if (post) console.log(hljs.highlightAuto(post.content))

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <div style={{margin: '0 auto', width: '800px'}}>
        {post &&
        <div class="post">
          <br/>
          {/* @ts-ignore */}
          <h2 class="title">{post.title}</h2>
          <br/>
          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{__html: post.content}}></div>
        </div>
        }
      </div>
      <br/>
      <br/>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  let allposts = await loadPosts()

  let allpath = allposts.map((post) => ({
    params: {id: "" + post.ID},
  }))

  console.log('[id] Paths= ', allpath)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {paths: allpath, fallback: false}

}

export async function getStaticProps(context) {
  console.log(context)
  const response = await fetch(wordpressUrl + context.params.id);
  if (!response.ok) return;

  const jsonPost = await response.json();

  return {
    props: {
      post: jsonPost
    },
  }
}


export default Id