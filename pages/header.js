import React from 'react'
import Head from 'next/script'
import fs from 'fs'


function Header() {
  console.log('Current == ',process.cwd())
  const data = fs.readFileSync('./pages/rawhead.txt', 'utf8');

  return (
    <Head
      dangerouslySetInnerHTML={{
        __html: data
      }}
    />

  )
}

export default Header