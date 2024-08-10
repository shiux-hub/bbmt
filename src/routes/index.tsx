import { Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const LazyTabs = lazy(() => import('~views/tabs'))
const LazyCheck = lazy(() => import('~views/check'))

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
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}
