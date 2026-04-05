import { useEffect, useState } from 'react'

function getInitialPage(validPages) {
  if (typeof window === 'undefined') {
    return validPages[0]
  }

  const raw = window.location.hash.replace('#', '')
  return validPages.includes(raw) ? raw : validPages[0]
}

export function usePageNavigation(validPages) {
  const [page, setPage] = useState(() => getInitialPage(validPages))

  useEffect(() => {
    function onHashChange() {
      setPage(getInitialPage(validPages))
    }

    window.addEventListener('hashchange', onHashChange)

    if (!window.location.hash) {
      window.location.hash = `#${validPages[0]}`
    }

    return () => {
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [validPages])

  function navigate(nextPage) {
    if (nextPage === page) {
      return
    }

    window.location.hash = `#${nextPage}`
    setPage(nextPage)
  }

  return [page, navigate]
}
