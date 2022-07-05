export const wordpressUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/xorl.wordpress.com/posts/'
export const postperpage = 2
export const loadPosts = async () => {
    return new Promise(async (resolve, reject) => {
        if (document._allposts != undefined) {
            resolve(window._allposts)
            return
        }
        if (!document.firstLock) {
            document.firstLock = true
            let loadpage = 1
            let allposts = []
            while(true) {
                console.log('\nload page = '+loadpage)
                let response = await fetch(wordpressUrl + '?number=100&page=' + loadpage)
                if (!response.ok) break;
                let jsonPosts = await response.json()
                console.log("length = "+jsonPosts.posts.length)

                if (jsonPosts.posts.length == 0 ) break
                allposts = allposts.concat(jsonPosts.posts)
                loadpage +=  1
            }
            document._allposts = allposts
            console.log('loaded all posts length= '+allposts.length)
            resolve(allposts)
        } else {
            let c = setInterval(() => {
                if (document._allposts != null) {
                    console.log('Clear interval.')
                    clearInterval(c)
                    resolve(document._allposts)
                } else {
                    console.log('Wait on locked c='+c)
                }
            }, 3000);
        }

    });


}