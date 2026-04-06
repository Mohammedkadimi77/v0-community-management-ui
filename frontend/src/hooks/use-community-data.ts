import { useCallback, useEffect, useState } from "react"
import { communityApi } from "@/lib/api"
import { CalendarEntry, Platform, Publication } from "@/lib/types"

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await communityApi.getPlatforms()
      setPlatforms(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  return { platforms, loading, reload: load }
}

export function usePosts(query = "") {
  const [posts, setPosts] = useState<Publication[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const response = await communityApi.getPosts(query)
      setPosts(response.data)
      setTotal(response.total)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    void load()
  }, [load])

  return { posts, total, loading, reload: load }
}

export function useCalendar(query = "") {
  const [entries, setEntries] = useState<CalendarEntry[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const response = await communityApi.getCalendar(query)
      setEntries(response.data)
      setTotal(response.total)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    void load()
  }, [load])

  return { entries, total, loading, reload: load }
}
