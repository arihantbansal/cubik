"use client"
import CodeComponent from '@/app/home-page-components/code-component'
import PageHOC from '@/app/home-page-components/components/pageHOC'
import { Divider } from '@cubik/ui'
import React from 'react'

const DividerPage = () => {
  return (
   <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Divider', href: '/component/divider', current: true },
      ]}
      heading={'Divider'}
      description={
        'To visually divide material in a list or group, use dividers.'
      }
    >
      <div>
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent codeString='import { Divider } from "@cubik/ui"' />
        </div>
        <div className='mt-10 h-20 text-black'>
            <Divider orientation='horizontal' />
        </div>
      </div>
    </PageHOC>
  )
}

export default DividerPage
