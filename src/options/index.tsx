import '~style.css'

import { MemoryRouter } from 'react-router-dom'

import { Routing } from '~routes'
import Navbar from '~components/navbar'

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
