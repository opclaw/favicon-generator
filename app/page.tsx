'use client'

import { useState, useRef, useCallback } from 'react'

export default function Home() {
  const [text, setText] = useState('A')
  const [bgColor, setBgColor] = useState('#6366f1')
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(64)
  const [faviconUrl, setFaviconUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateFavicon = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 256
    canvas.height = 256

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, 256, 256)

    // Text
    ctx.fillStyle = textColor
    ctx.font = `bold ${fontSize}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, 128, 140)

    const url = canvas.toDataURL('image/png')
    setFaviconUrl(url)
  }, [text, bgColor, textColor, fontSize])

  const downloadFavicon = useCallback(() => {
    if (!faviconUrl) return
    const link = document.createElement('a')
    link.download = 'favicon.png'
    link.href = faviconUrl
    link.click()
  }, [faviconUrl])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg">🔶</div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Favicon Generator</h1>
                <p className="text-sm text-slate-500">Create favicons</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-3xl shadow-xl mb-6">🔶</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Favicon Generator</h2>
            <p className="text-lg md:text-xl text-slate-600">Create favicons from text for your website.</p>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Text (1-2 characters)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 2))}
                className="input text-center text-2xl font-bold uppercase"
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Font Size</label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min={32}
                max={128}
                className="input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-11 rounded-lg border border-slate-300"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="input flex-1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-11 rounded-lg border border-slate-300"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="input flex-1"
                />
              </div>
            </div>
          </div>

          <button onClick={generateFavicon} className="w-full btn-primary bg-purple-600 hover:bg-purple-700 mb-6">
            ✨ Generate Favicon
          </button>

          {faviconUrl && (
            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-xl border border-slate-200 shadow-lg mb-4">
                <img src={faviconUrl} alt="Favicon" className="w-32 h-32" />
              </div>
              <button onClick={downloadFavicon} className="btn-primary bg-purple-600 hover:bg-purple-700">
                💾 Download Favicon
              </button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 SmartOK Tools. Free online tools.</p>
        </div>
      </footer>
    </div>
  )
}
