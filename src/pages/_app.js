// pages/_app.js
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import '@/styles/globals.css'
import SparklyMouseTrail from '@/components/SparklyMouseTrail'

export default function App({ Component, pageProps }) {
  // Prevent background image from loading flash
  useEffect(() => {
    const preloadImage = new Image()
    preloadImage.src = '/string-theory-bg.jpg'
  }, [])

  return (
    <>
      {/* SparklyMouseTrail is outside Layout to ensure it's always on top */}
      <SparklyMouseTrail />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

// Add this to next.config.js if you haven't already
/*
/** @type {import('next').NextConfig} */
