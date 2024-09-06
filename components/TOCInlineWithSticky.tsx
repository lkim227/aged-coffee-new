'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Toc } from 'pliny/mdx-plugins/remark-toc-headings'

export interface TOCInlineProps {
  toc: Toc
  indentDepth?: number
  fromHeading?: number
  toHeading?: number
  asDisclosure?: boolean
  exclude?: string | string[]
  collapse?: boolean
  noSticky?: boolean
  hiddenToc?: boolean
}

const TOCInlineWithSticky = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  noSticky = false,
  hiddenToc = false,
}: TOCInlineProps) => {
  const tocRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)
  const [innerNoSticky, setInnerNoSticky] = useState(noSticky)

  // Build regex for exclusions
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  // Filter out unwanted headings
  const filteredToc = toc.filter(
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  useEffect(() => {
    if (noSticky) return
    const checkScreenWidth = () => {
      setInnerNoSticky(window.innerWidth <= 1280)
    }
    window.addEventListener('resize', checkScreenWidth)
    checkScreenWidth()
    return () => window.removeEventListener('resize', checkScreenWidth)
  }, [noSticky])

  useEffect(() => {
    if (innerNoSticky) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    )

    if (tocRef.current) {
      observer.observe(tocRef.current)
    }

    return () => {
      observer?.disconnect()
    }
  }, [innerNoSticky])

  const tocList = (
    <ul>
      {filteredToc.map((heading, index) => (
        <li key={index} className={`${heading.depth >= indentDepth ? 'ml-6' : ''}`}>
          <a href={heading.url}>{heading.value}</a>
        </li>
      ))}
    </ul>
  )

  const tocMarkup = asDisclosure ? (
    <details open={!collapse}>
      <summary className="ml-6 pb-2 pt-2 text-xl font-bold">Table of Contents</summary>
      <div className="ml-6">{tocList}</div>
    </details>
  ) : (
    tocList
  )

  return (
    <>
      <div
        style={{
          display: hiddenToc ? 'none' : 'block',
        }}
        ref={tocRef}
      >
        {tocMarkup}
      </div>
      {!innerNoSticky && (
        <div
          style={{
            position: 'fixed',
            top: '4px',
            right: '16px',
            visibility: isSticky ? 'visible' : 'hidden',
            maxWidth: `calc((100vw - 64rem) / 2 - 16px) `,
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          {tocMarkup}
        </div>
      )}
    </>
  )
}

export default TOCInlineWithSticky
