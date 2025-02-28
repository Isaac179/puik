import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Checkbox from '../src/checkbox.vue'
import type { CheckboxProps } from '../src/checkbox'
import type { MountingOptions, VueWrapper } from '@vue/test-utils'

describe('Checkbox tests', () => {
  let wrapper: VueWrapper<any>
  const findInput = () => wrapper.find('.puik-checkbox__input')
  const findLabel = () => wrapper.find('.puik-checkbox__label')

  const factory = (
    props: Partial<CheckboxProps> = {
      disabled: false,
      label: 'Label',
      indeterminate: false,
      modelValue: false,
    },
    options: MountingOptions<any> = {}
  ) => {
    wrapper = mount(Checkbox, {
      props,
      ...options,
    })
  }
  it('should emit update:modelValue with true as payload when the input is clicked', async () => {
    factory()
    await findInput().setValue(true)
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[true]])
  })
  it('should emit update:modelValue with true as payload when the label is clicked', async () => {
    factory({ label: 'Label', modelValue: false }, { attachTo: document.body })
    await findLabel().trigger('click')
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([[true]])
  })
  it('should not emit update:modelValue when the input is clicked AND the checkbox is disabled', async () => {
    factory({ disabled: true, modelValue: false })
    await findInput().setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
  it('should not emit update:modelValue when the label is clicked AND the checkbox is disabled', async () => {
    factory({ label: 'Label', disabled: true, modelValue: false })
    await findLabel().trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
  it('should not emit update:modelValue when the custom label is clicked AND the checkbox is disabled', async () => {
    factory(
      { disabled: true, modelValue: false },
      { slots: { default: 'Custom label' } }
    )
    await findLabel().trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
  it('should display the label', () => {
    factory({ label: 'The label', modelValue: false })
    expect(findLabel().text()).toContain('The label')
  })
  it('should not render the label if there is no label prop or slot', () => {
    factory({ label: undefined, modelValue: false })
    expect(findLabel().exists()).toBeFalsy()
  })
  it('should fill the custom label slot when no label is provided', () => {
    factory(
      { modelValue: false },
      {
        slots: { default: 'Custom label' },
      }
    )

    expect(findLabel().text()).toContain('Custom label')
  })
  it('should dsiplay the custom label slot even if a props label is provided', () => {
    factory(
      { label: 'Label', modelValue: false },
      {
        slots: { default: 'Custom label' },
      }
    )

    expect(findLabel().text()).toContain('Custom label')
  })
  it('should set the indeterminate checkbox at checked if the label is clicked AND the checkbox was checked before being indeterminate', async () => {
    factory({ label: 'Label', indeterminate: false, modelValue: true })
    vi.spyOn(wrapper.vm.checkboxInputRef, 'click')
    await wrapper.setProps({ indeterminate: true })
    await findLabel().trigger('click')
    expect(wrapper.vm.checkboxInputRef.click).toHaveBeenCalled()
  })
  it('should NOT set the indeterminate checkbox at checked if the label is clicked AND the checkbox was NOT checked before being indeterminate', async () => {
    factory({ label: 'Label', indeterminate: false, modelValue: false })
    vi.spyOn(wrapper.vm.checkboxInputRef, 'click')
    await wrapper.setProps({ indeterminate: true })
    await findLabel().trigger('click')
    expect(wrapper.vm.checkboxInputRef.click).not.toHaveBeenCalled()
  })
})
