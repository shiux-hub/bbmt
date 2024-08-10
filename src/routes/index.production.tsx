import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const LazyCheck = lazy(() => import('~views/check'))
const LazyTabs = lazy(() => import('~views/tabs'))

export function Routing() {
  return (
    <Routes>
      <Route
        path="/check"
        element={(
          <Suspense>
            <LazyCheck />
          </Suspense>
        )}
      />
      <Route
        path="/tabs"
        element={(
          <Suspense>
            <LazyTabs />
          </Suspense>
        )}
      />
    </Routes>
  )
}
