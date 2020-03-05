import React from 'react'
import { mount } from 'enzyme'
import QuoteForm from './QuoteForm'

it('Renders', () => {
    mount(<QuoteForm/>)
})

it('Updates state', () => {
    const wrapper = mount(<QuoteForm />)

    wrapper.find('#pickup_postcode').simulate('change', {
        target: {
           value: "test1" 
        }
    })
    
    wrapper.find('#delivery_postcode').simulate('change', {
        target: {
           value: "test2" 
        }
    })

    wrapper.find('#vehicle').simulate('change', {
        target: {
           value: "large_van" 
        }
    })

    expect(wrapper.find('#pickup_postcode').prop('value')).toEqual('test1')
    expect(wrapper.find('#delivery_postcode').prop('value')).toEqual('test2')
    expect(wrapper.find('#vehicle').prop('value')).toEqual('large_van')
})