import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PuikSidebar from '../src/sidebar.vue'
import PuikSidebarGroupItem from '../src/sidebar-group-item.vue'
import PuikSidebarItem from '../src/sidebar-item.vue'
import PuikSidebarTitle from '../src/sidebar-title.vue'
import type { MountingOptions, VueWrapper } from '@vue/test-utils'

let wrapper: VueWrapper<any>
const factory = (template: string, options: MountingOptions<any> = {}) => {
  wrapper = mount({
    components: {
      PuikSidebarTitle,
      PuikSidebarItem,
      PuikSidebarGroupItem,
      PuikSidebar,
    },
    template,
    ...options,
  })
}

export const getSidebar = (component) => component.find('.puik-sidebar')
export const getSidebarsGroupItem = (component) =>
  component.findAll('.puik-sidebar-group-item')
export const getSidebarsItem = (component) =>
  component.findAll('.puik-sidebar-item')
export const getExpandButton = (component) =>
  component.find('.puik-sidebar__header .puik-button')
export const getSidebarContent = (component) =>
  component.find('.puik-sidebar__content')
export const getSidebarBackdrop = (component) =>
  component.find('.puik-sidebar__backdrop')

describe('Sidebar tests', () => {
  it('should be a vue instance', () => {
    const template = `
      <puik-sidebar>
        <puik-sidebar-group-item title="group" icon="store">
          <puik-sidebar-item title="title" />
        </puik-sidebar-group-item>
      </puik-sidebar>
    `
    factory(template)
    expect(wrapper).toBeTruthy()
  })

  it('should display item', () => {
    const template = `
      <puik-sidebar>
        <puik-sidebar-item title="title" />
      </puik-sidebar>
    `
    factory(template)
    const items = getSidebarsItem(wrapper)[0]
    expect(items.exists()).toBeTruthy()
  })

  it('should display group-item', () => {
    const template = `
      <puik-sidebar>
        <puik-sidebar-group-item title="group" icon="store">
          <puik-sidebar-item title="title" />
        </puik-sidebar-group-item>
      </puik-sidebar>
    `
    factory(template)
    const items = getSidebarsGroupItem(wrapper)[0]
    expect(items.exists).toBeTruthy()
  })

  it('should expand', async () => {
    const template = `
      <puik-sidebar>
        <puik-sidebar-group-item title="group" icon="store">
          <puik-sidebar-item title="title" />
        </puik-sidebar-group-item>
      </puik-sidebar>
    `
    await factory(template)
    const expandButton = getExpandButton(wrapper)
    expect(getSidebar(wrapper).classes()).toContain('puik-sidebar--collapsed')
    await expandButton.trigger('click')
    expect(getSidebar(wrapper).classes()).not.toContain(
      'puik-sidebar--collapsed'
    )
  })

  it('should be mobile', async () => {
    const template = `
      <puik-sidebar mobile :expanded="true">
        <puik-sidebar-item title="title" />
      </puik-sidebar>
    `
    factory(template)
    const items = getSidebarsItem(wrapper)[0]
    expect(items.exists()).toBeTruthy()
    const backdrop = getSidebarBackdrop(wrapper)
    expect(backdrop).toBeTruthy()
  })

  it('should have group-1 open by default', async () => {
    const template = `
      <puik-sidebar open-accordion="group-1" :expanded="true">
        <puik-sidebar-group-item title="group" icon="store" name="group-1">
          <puik-sidebar-item title="title" />
        </puik-sidebar-group-item>
      </puik-sidebar>
    `

    await factory(template)
    const accordion = wrapper.find('.puik-accordion')
    expect(accordion.classes()).toContain('puik-accordion--expanded')
  })
})
