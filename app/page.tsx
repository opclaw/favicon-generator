'use client'

import { useState, useEffect, useCallback } from 'react'

export default function Home() {
  const [text, setText] = useState('A')
  const [bgColor, setBgColor] = useState('#6366f1')
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(80)
  const [radius, setRadius] = useState(24)
  const [copied, setCopied] = useState(false)

  // Validate hex color
  const isValidHex = (hex: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)

  // Preset colors
  const bgPresets = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#0ea5e9', '#1e293b', '#ef4444']
  const textPresets = ['#ffffff', '#f1f5f9', '#1e293b', '#6366f1', '#8b5cf6', '#ec4899']

  // Download favicon
  const downloadFavicon = useCallback(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="${bgColor}" rx="${radius}"/>
        <text x="128" y="145" font-family="system-ui, sans-serif" font-size="${fontSize}" font-weight="700" 
              fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
      </svg>
    `
    
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'favicon.svg'
    link.href = url
    link.click()
    URL.revokeObjectURL(url)
  }, [text, bgColor, textColor, fontSize, radius])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl shadow-lg">🔶</div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Favicon Generator</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Preview */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Live Preview</div>
            
            {/* Main Preview */}
            <div 
              className="w-48 h-48 rounded-3xl shadow-2xl flex items-center justify-center mb-6 transition-all duration-300"
              style={{ 
                backgroundColor: isValidHex(bgColor) ? bgColor : '#6366f1',
                borderRadius: `${radius}px`
              }}
            >
              <span 
                className="font-bold"
                style={{ 
                  color: isValidHex(textColor) ? textColor : '#ffffff',
                  fontSize: `${fontSize * 1.5}px`
                }}
              >
                {text || 'A'}
              </span>
            </div>

            {/* Size Variants */}
            <div className="flex items-end gap-4">
              {[
                { size: 32, label: '32×32' },
                { size: 64, label: '64×64' },
                { size: 128, label: '128×128' }
              ].map(({ size, label }) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div 
                    className="flex items-center justify-center shadow-lg transition-all duration-300"
                    style={{ 
                      width: size,
                      height: size,
                      backgroundColor: isValidHex(bgColor) ? bgColor : '#6366f1',
                      borderRadius: `${radius / 4}px`
                    }}
                  >
                    <span 
                      className="font-bold"
                      style={{ 
                        color: isValidHex(textColor) ? textColor : '#ffffff',
                        fontSize: `${fontSize * (size / 256)}px`
                      }}
                    >
                      {text || 'A'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            
            {/* Text Input */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Text (1-2 characters)</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 2).toUpperCase())}
                className="w-full h-16 px-6 rounded-2xl border-2 border-slate-200 text-center text-3xl font-bold uppercase focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
                maxLength={2}
                placeholder="A"
              />
            </div>

            {/* Background Color */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Background Color</label>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className={`flex-1 h-14 px-4 rounded-xl border-2 font-mono text-lg uppercase transition-all ${
                    isValidHex(bgColor) 
                      ? 'border-slate-200 focus:border-purple-500' 
                      : 'border-red-300 focus:border-red-500'
                  }`}
                  placeholder="#6366f1"
                />
                <div 
                  className="w-14 h-14 rounded-xl border-2 border-slate-200 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: isValidHex(bgColor) ? bgColor : '#6366f1' }}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {bgPresets.map((color) => (
                  <button
                    key={color}
                    onClick={() => setBgColor(color)}
                    className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${
                      bgColor === color ? 'border-slate-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Text Color</label>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className={`flex-1 h-14 px-4 rounded-xl border-2 font-mono text-lg uppercase transition-all ${
                    isValidHex(textColor) 
                      ? 'border-slate-200 focus:border-purple-500' 
                      : 'border-red-300 focus:border-red-500'
                  }`}
                  placeholder="#ffffff"
                />
                <div 
                  className="w-14 h-14 rounded-xl border-2 border-slate-200 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: isValidHex(textColor) ? textColor : '#ffffff' }}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {textPresets.map((color) => (
                  <button
                    key={color}
                    onClick={() => setTextColor(color)}
                    className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${
                      textColor === color ? 'border-slate-900 scale-110' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Font Size: {fontSize}px</label>
                <input
                  type="range"
                  min="40"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Corner Radius: {radius}px</label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadFavicon}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download SVG Favicon
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}