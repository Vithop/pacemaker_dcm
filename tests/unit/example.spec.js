import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  const wrapper = mount(Home)
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<h2>Login</h2>')
  })
})
