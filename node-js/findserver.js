const { resolveSoa } = require('dns')
const http = require('http')
const { timeout } = require('nodemon/lib/config')

//example url
const active_urls = []
let findserver = async function (urls) {
    let promise = new Promise((success, fail) => {
        //checking active urls with status code ranges(201-299)
        for (const x in urls) {
            const url = urls[x].url;
            setTimeout(() => {
                try {
                    http.get(`${url}`, res => {
                        const code = res.statusCode

                        if (code > 200 && code < 299) {
                            active_urls.push(urls[x])
                            success(active_urls)
                        } else {
                            console.log('no active servers');
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            }, 5000);
        }
    })
    let least_priority = await promise.then((result) => {
        //if there are multiple active urls
        if (result.length > 1) {
            const sorted = result.sort((a, b) => {
                return a.priority - b.priority //sorting 
            })
            console.log(sorted[0]);
        }
        else {
            console.log(result);  //if there is single active url
        }

    }).catch((err) => {
        console.log(err); //no active urls
    });

    return least_priority;
}

module.exports = {
    findserver
}