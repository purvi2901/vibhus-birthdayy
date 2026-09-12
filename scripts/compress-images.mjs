// One-off script: shrinks every photo actually used by the site down to a
// sane web size, in place (same filename, same folder, so no code changes
// are needed). Run with: node scripts/compress-images.mjs
import sharp from 'sharp'
import { readdir, rename, copyFile, unlink, stat } from 'node:fs/promises'
import path from 'node:path'

async function replaceFile(tmp, dest) {
  try {
    await rename(tmp, dest)
  } catch {
    // Windows sometimes holds a lock on dest (e.g. a dev server watching it) —
    // fall back to copy + delete, retrying briefly since the lock is often brief.
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        await copyFile(tmp, dest)
        await unlink(tmp)
        return
      } catch (err) {
        if (attempt === 4) throw err
        await new Promise(r => setTimeout(r, 300))
      }
    }
  }
}

const MAX_DIMENSION = 1600
const JPEG_QUALITY = 78

const TARGETS = [
  'src/assets/vibhu-photo',
  'src/assets/images',
]

const TOP_LEVEL_FILES = [
  'src/assets/MMF_4978.jpg.jpeg',
  'src/assets/MMF_5007.jpg.jpeg',
  'src/assets/MMF_5010.jpg.jpeg',
]

const IMAGE_RE = /\.(jpe?g|png)$/i

async function compressFile(filePath) {
  const before = (await stat(filePath)).size
  const tmp = filePath + '.tmp'

  const image = sharp(filePath).rotate() // rotate() applies EXIF orientation, then strips it
  const isPng = /\.png$/i.test(filePath)

  await image
    .resize({ width: MAX_DIMENSION, height: MAX_DIMENSION, fit: 'inside', withoutEnlargement: true })
    [isPng ? 'png' : 'jpeg'](isPng ? { compressionLevel: 9 } : { quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(tmp)

  const after = (await stat(tmp)).size
  if (after < before) {
    await replaceFile(tmp, filePath)
    return { before, after }
  }
  // Already small enough — keep the original, drop the temp file
  await unlink(tmp)
  return { before, after: before }
}

async function run() {
  const files = [...TOP_LEVEL_FILES]

  for (const dir of TARGETS) {
    const entries = await readdir(dir)
    for (const entry of entries) {
      if (IMAGE_RE.test(entry)) files.push(path.join(dir, entry))
    }
  }

  let totalBefore = 0
  let totalAfter = 0

  for (const file of files) {
    try {
      const { before, after } = await compressFile(file)
      totalBefore += before
      totalAfter += after
      const pct = (100 * (1 - after / before)).toFixed(0)
      console.log(`${file}  ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB (-${pct}%)`)
    } catch (err) {
      console.error(`FAILED  ${file}:`, err.message)
    }
  }

  console.log('---')
  console.log(`Total: ${(totalBefore / 1e6).toFixed(1)}MB -> ${(totalAfter / 1e6).toFixed(1)}MB`)
}

run()
