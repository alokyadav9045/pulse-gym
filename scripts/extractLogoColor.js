// Simple script to sample the average color of an image using Jimp
// Usage: node scripts/extractLogoColor.js

const JimpModule = require('jimp')
const Jimp = JimpModule && (JimpModule.default || JimpModule)
const path = require('path')

async function extractAverageHex(imagePath) {
  const image = await Jimp.read(imagePath)
  // Resize small for faster processing
  image.resize(20, 20)

  let rSum = 0, gSum = 0, bSum = 0
  let count = 0

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0]
    const g = this.bitmap.data[idx + 1]
    const b = this.bitmap.data[idx + 2]

    rSum += r
    gSum += g
    bSum += b
    count++
  })

  const rAvg = Math.round(rSum / count)
  const gAvg = Math.round(gSum / count)
  const bAvg = Math.round(bSum / count)

  const hex = ((1 << 24) + (rAvg << 16) + (gAvg << 8) + bAvg).toString(16).slice(1)
  return `#${hex}`
}

async function main() {
  try {
    const logoPath = path.join(__dirname, '..', 'public', 'vitalize-fitness.png')
    const hex = await extractAverageHex(logoPath)
    console.log(hex)
  } catch (err) {
    console.error('Error extracting color:', err.message)
    process.exit(1)
  }
}

main()
