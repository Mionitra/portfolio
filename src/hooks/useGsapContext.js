import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export function useGsapContext(deps = []) {
  const scopeRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {}, scopeRef)
    return () => ctx.revert()
  }, deps)

  return scopeRef
}
