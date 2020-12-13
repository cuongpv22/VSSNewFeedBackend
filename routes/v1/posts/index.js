const { request } = require('http')

const router = require('koa-router')()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const uri = 'mongodb+srv://admin:p123456@cluster0.katqv.mongodb.net?retryWrites=true&w=majority'
const client = new MongoClient(uri)

router.get("/:postID", (ctx, next) => {
    return new Promise((resolve, reject) => {
        const postID = ctx.params.postID
        if (/[a-f0-9]{24}/.test(postID)) {
            client.connect(() => {
                const fbDatabase = client.db("facebook")
                const postCollection = fbDatabase.collection("posts")
                postCollection.findOne({
                    _id : ObjectId(postID)
                }, (err, post) => {
                    ctx.body = {
                        isSuccess: true,
                        "data": post
                    }
                    resolve()
                })
            })
        } else {
            ctx.body = {
                isSuccess: false,
                "data": {}
            }
            resolve()
        }
    })
})

router.get("/", (ctx, next) => {
    return new Promise((resolve, reject) => {
        client.connect(() => {
            const fbDatabase = client.db("facebook")
            const postCollection = fbDatabase.listCollections().toArray().then(cols => console.log("Collections", cols))
            
        })
    })
})

// router.get("/", (ctx, next) => {
//     return new Promise((resolve, reject) => {
//         client.connect(() => {
//             const fbDatabase = client.db("facebook")
//             const postCollection = fbDatabase.collection("posts")
//             postCollection.find({
//                 "createdBy.userID" : 1
//             }).toArray((err, postResults) => {
//                 var dataResults = []
//                 if (!err) {
//                     dataResults = postResults
//                 }
//                 ctx.body = {
//                     isSuccess: true,
//                     "data": dataResults
//                 }
//                 resolve()
//             })
//         })
//     })
// })

module.exports = router.routes()