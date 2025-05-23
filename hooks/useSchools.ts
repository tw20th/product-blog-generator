// hooks/useSchools.ts
import { useEffect, useState } from 'react'

export type School = {
  id: string
  name: string
  description: string
  targetAge: string
  price: number
  rating: number
  link: string
}

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch('/api/schools')
        const data = await res.json()
        setSchools(data)
      } catch (error) {
        console.error('学校データ取得エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSchools()
  }, [])

  return { schools, loading }
}
