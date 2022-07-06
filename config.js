export const wordpressUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/n0rt3l.wordpress.com/posts/'
export const postperpage = 5
var firstLock = false
var _allposts = null
export const loadPosts = async () => {
    return new Promise(async (resolve, reject) => {
        if (_allposts != undefined) {
            resolve(_allposts)
            return
        }
        if (!firstLock) {
            console.log("Enter in LOCK")
            firstLock = true
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
            _allposts = allposts
            console.log('loaded all posts length= '+allposts.length)
            resolve(allposts)
        } else {
            let c = setInterval(() => {
                if (_allposts != null) {
                    console.log('Clear interval.')
                    clearInterval(c)
                    resolve(_allposts)
                } else {
                    console.log('Wait on locked c='+c)
                }
            }, 3000);
        }

    });


}