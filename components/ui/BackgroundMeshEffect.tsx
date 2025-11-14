'use client'

import { MeshGradient } from "@paper-design/shaders-react"

export default function BackgroundMeshEffect() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20">
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0f172a", "#1e293b", "#334155", "#475569"]}
        speed={0.5}
      />
    </div>
  )
}

