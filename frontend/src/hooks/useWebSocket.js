import { useEffect, useRef } from 'react'

export default function useWebSocket(onEvent) {
  const wsRef = useRef(null)

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_GATEWAY_URL || 'http://localhost:3000/api'
    // derive websocket url from API url
    let base = apiUrl.replace(/\/api\/?$/, '')
    if (base.startsWith('https://')) base = base.replace('https://', 'wss://')
    else if (base.startsWith('http://')) base = base.replace('http://', 'ws://')

    try {
      const ws = new WebSocket(base)
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WS connected to', base)
      }

      ws.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data)
          if (onEvent && typeof onEvent === 'function') onEvent(data)
        } catch (e) {
          console.warn('Invalid WS message', e)
        }
      }

      ws.onclose = () => {
        console.log('WS disconnected')
      }

      ws.onerror = (err) => console.warn('WS error', err)

      return () => {
        try { ws.close() } catch (_) {}
      }
    } catch (e) {
      console.warn('WebSocket init failed', e)
    }
  }, [onEvent])
}
