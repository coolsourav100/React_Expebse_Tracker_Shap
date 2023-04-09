import { Button } from 'bootstrap'
import React from 'react'
import Premium from '../Component/UI/Premium'

const UnLockIn = () => {
  return (
    <button className='btn btn-info me-2'>Premium<i class="bi bi-unlock" onClick={()=>console.log('good')}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="currentColor" class="bi bi-unlock ms-2" viewBox="0 0 16 16">
    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
  </svg></i></button>
  )
}

export default UnLockIn