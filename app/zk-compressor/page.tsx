import React from 'react'
import CompressorForm from '@/components/forms/CompressorForm';

const ZkCompressor = () => {
  return (
    <section className="wrapper">
      <div className="wrapper-content-container">
        <h1 className="heading-title">ZKToken Compressor</h1>

        {/* Mint Form */}
        <CompressorForm />
      </div>
    </section>
  )
}

export default ZkCompressor