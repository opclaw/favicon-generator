'use client'

import { useState, useRef } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const sizes = [16, 32, 48, 64, 128, 256]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const generateFavicon = (size: number) => {
    if (!image || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = size
    canvas.height = size

    const img = new Image()
    img.onload = () => {
      // Draw image covering the entire canvas
      ctx.drawImage(img, 0, 0, size, size)
    }
    img.src = image
  }

  const downloadFavicon = (size: number) => {
    generateFavicon(size)
    setTimeout(() => {
      if (!canvasRef.current) return
      const link = document.createElement('a')
      link.download = `favicon-${size}x${size}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }, 100)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Favicon Generator</h1>

      <div className={styles.upload}>
        <input type="file" accept="image/*" onChange={handleFileUpload} id="upload" />
        <label htmlFor="upload">📁 {image ? 'Change Image' : 'Upload Image'}</label>
      </div>

      {image && (
        <>
          <div className={styles.preview}>
            <img src={image} alt="Preview" />
          </div>

          <h3 className={styles.heading}>Choose size to download:</h3>
          <div className={styles.sizes}>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => downloadFavicon(size)}
                className={styles.sizeBtn}
              >
                {size}x{size}
              </button>
            ))}
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
      )}
    </div>
  )
}