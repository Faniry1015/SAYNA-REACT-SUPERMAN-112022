import  { App } from './components/App'
import { render } from '@testing-library/react'
import React from 'react'

test('scénario d\'exemple', function () {
    render(<App />)
    expect(1). toBe(1)
})