import React, { ReactElement, ReactNode } from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import {store} from '../store'


const AllTheProviders = ({children}: {children: ReactNode}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

const customRender = (ui: any, options?: any) =>
    render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}