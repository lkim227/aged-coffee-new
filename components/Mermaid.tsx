'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

const Mermaid = ({ chart }: { chart: string }) => {
  const [diagram, setDiagram] = useState('')
  const graphIdRef = useRef(`graphDiv_${Math.floor(Math.random() * 10000)}`)

  useEffect(() => {
    const renderChart = async () => {
      mermaid.initialize({ startOnLoad: true })
      const { svg } = await mermaid.render(graphIdRef.current, chart)
      setDiagram(svg)
    }
    renderChart()
  }, [chart])

  return <div dangerouslySetInnerHTML={{ __html: diagram }} id={graphIdRef.current} />
}
export default Mermaid
