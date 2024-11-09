import sharp from 'sharp'

export const generateBlurDataURL = async (src: string) => {
  const imageBuffer = await sharp(`public/${src}`).toBuffer()
  const base64Image = imageBuffer.toString('base64')
  const blurDataURL = `data:image/jpg;base64,${base64Image}`
  return blurDataURL
}
