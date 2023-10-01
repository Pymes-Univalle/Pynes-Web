'use client'

import {Provider} from 'react-redux'
import {NextUIProvider} from '@nextui-org/react'
import {store} from './redux/store'

interface Props { children: React.ReactNode }

export function Providers({children}: Props) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}