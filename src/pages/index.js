// pages/index.js
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Head>
        <title>String Theory Threads</title>
        <meta name="description" content="Where quantum fashion meets cosmic style" />
      </Head>
      <div className="min-h-screen relative z-10">
        <main className="container mx-auto px-4 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-7xl font-bold text-white mb-6">
              String Theory Threads
            </h1>
            <p className="text-xl text-blue-200 mb-12">
              Where quantum fashion meets cosmic style
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16"
          >
            {/* Featured content or products can go here */}
          </motion.div>
        </main>
      </div>
    </>
  )
}