// pages/api/square.js
import { Client } from 'square'

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
})

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { result } = await client.catalogApi.listCatalog(undefined, 'ITEM')
      
      const products = result.objects
        .filter(item => item.type === 'ITEM')
        .map(item => ({
          id: item.id,
          name: item.itemData.name,
          price: item.itemData.variations[0].itemVariationData.priceMoney.amount / 100,
          imageUrl: item.itemData.imageIds 
            ? `https://items-images-production.s3.us-west-2.amazonaws.com/${item.itemData.imageIds[0]}` 
            : '/placeholder.png'
        }))

      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch products' })
    }
  }
}