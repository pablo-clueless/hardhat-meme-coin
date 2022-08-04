import React from 'react'

const Spinner = () => {
  return (
    <svg className='spinner' role='alert' aria-live='assertive'>
        <circle className='spinner__path' cx='15' cy='15' r='10' fill='none' strokeWidth='2' />
    </svg>
  )
}

export default Spinner