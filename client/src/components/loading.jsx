import React from 'react'

export default function loading() {
  return (
    <div style={{
        margin: '0 auto',
        marginTop:'5px',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        height: '100vh', // Adjusts to fill the viewport height
        textAlign: 'center', // Centers the text within the div
      }}>
      <span>Data not available right now...</span>
    </div>
  )
}
