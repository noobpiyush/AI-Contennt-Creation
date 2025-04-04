"use client"

import { useEffect } from "react"

type AdBannerTypes = {
    dataAdSlot:string,
    dataAdFormat:string,
    dataFullWidthResponsive:boolean
}

function AdBanner({dataAdFormat, dataAdSlot, dataFullWidthResponsive}:AdBannerTypes) {

    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (error) {
            console.log(error);
        }
    },[])

  return (
    <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={
            `ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT_ID}`
        }
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()} 
    >

    </ins>
  )
}

export default AdBanner