import UploadBlog from '@/components/ui/admin/upload-blog'
import { fetchCategories } from '@/services/apiService'
import React from 'react'

export default async function page() {
    const categories = await fetchCategories()
  return (
    <div>
        <UploadBlog cat={categories} />
    </div>
  )
}
