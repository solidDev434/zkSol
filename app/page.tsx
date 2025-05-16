import React from 'react'
import MintForm from '@/components/forms/MintForm'

const Mint = () => {
  return (
    <section className="wrapper">
      <div className="wrapper-content-container">
        <h1 className="heading-title">ZKCompressed Minter</h1>

        {/* Mint Form */}
        <MintForm />
      </div>
    </section>
  )
}

export default Mint