const express=require('express')
const request=require('request-promise')
const app=express();

const PORT=process.env.PORT || 5000


// const api_key='6e0508d74c4a4c512d99c540fd249fb4'
const generateScrapeUrl=(apikey)=> `http://api.scraperapi.com?api_key=${apikey}&autoparse=true`
app.use(express.json())

app.get('/',function(req,res){
    res.send('server is up to date and running');
})


app.get('/products/:productId', async(req,res)=>{
    const {productId}= req.params;
    const {api_key}=req.query;
    try{
            const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
            res.json(JSON.parse(response))
    } catch (error){
            res.json(error)
    }
})


app.get('/products/:productId/reviews', async(req,res)=>{
        const {productId}= req.params;
        const {api_key}=req.query;
        try{
                const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
                res.json(JSON.parse(response))
        } catch (error){
                res.json(error)
        }
})


app.get('/products/:productId/offer', async(req,res)=>{
    const {productId}= req.params;
    const {api_key}=req.query;
    try{
            const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
            res.json(JSON.parse(response))
    } catch (error){
            res.json(error)
    }
})

app.get('/search/:searchQuery', async(req,res)=>{
    const {searchQuery}= req.params;
    const {api_key}=req.query;
    try{
            const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
            res.json(JSON.parse(response))
    } catch (error){
            res.json(error)
    }
})


app.listen(PORT,function(){
    console.log(`server is running on ${PORT}`)
})