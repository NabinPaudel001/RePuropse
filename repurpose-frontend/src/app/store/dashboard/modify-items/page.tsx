import Layout from '@/components/ui/layout'
import ModifyItems from '@/components/ui/Modifyitem'
import React from 'react'
import Layout_store from '@/components/ui/layout_store'

export default function modify() {
  return (
    <div>
      <Layout_store>
        <ModifyItems />
      </Layout_store>
    </div>
  )
}
