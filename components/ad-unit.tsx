"use client"

import { useEffect, useRef } from "react"

interface AdUnitProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  responsive?: boolean
  className?: string
}

export default function AdUnit({ slot, format = "auto", responsive = true, className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (adRef.current && typeof window !== "undefined") {
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({})
      }
    } catch (error) {
      console.error("Error loading ad:", error)
    }
  }, [])

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        //@ts-ignore
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your actual ad client ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  )
}

