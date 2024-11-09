import path from 'path'
import sharp from 'sharp'

export const generateBlurDataURL = async (src: string) => {
  const imagePath = path.join(process.cwd(), 'public', src.replace(/^\/+/, ''))
  const imageBuffer = await sharp(imagePath).toBuffer()
  const base64Image = imageBuffer.toString('base64')
  const blurDataURL = `data:image/jpg;base64,${base64Image}`
  return blurDataURL
}
