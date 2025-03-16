import { MemoryRouter } from 'react-router-dom'

import Navbar from '~components/navbar'

import { Routing } from '~routes'
import '~style.css'

function IndexPopup() {
  return (
    <MemoryRouter initialEntries={['/check']}>
      <div className="flex h-screen">
        <Navbar />
        <div className="flex w-full">
          <Routing />
        </div>
      </div>
    </MemoryRouter>
  )
}

export default IndexPopup
