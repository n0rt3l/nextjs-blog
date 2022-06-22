import React, {useEffect} from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import plaintext from 'highlight.js/lib/languages/plaintext';

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
        <div>
          <br/>
          {/* @ts-ignore */}
          <h2>{post.title}</h2>
          <br/>
          {/* @ts-ignore */}
          <div dangerouslySetInnerHTML={{__html: post.content}}></div>
        </div>
        }
      </div>
    </React.Fragment>
  );
}

export async function getStaticPaths() {
  const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/n0rtel.wordpress.com/posts');
  if (!response.ok) {
    // oups! something went wrong
    return;
  }
  const jsonPosts = await response.json();

  const paths = jsonPosts.posts.map((post) => ({
    params: {id: "" + post.ID},
  }))

  console.log('Pathhhh= ', paths)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {paths, fallback: false}

}

export async function getStaticProps(context) {
  console.log(context)
  const response = await fetch('https://public-api.wordpress.com/rest/v1.1/sites/n0rtel.wordpress.com/posts/' + context.params.id);
  if (!response.ok) {
    // oups! something went wrong
    return;
  }

  const jsonPost = await response.json();

  return {
    props: {
      post: jsonPost
    },
  }
}


export default Id