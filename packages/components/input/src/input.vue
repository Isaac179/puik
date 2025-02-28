<template>
  <div class="puik-input">
    <div class="puik-input__wrapper" :class="inputClasses">
      <div v-if="$slots.prepend" class="puik-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :id="id"
        v-model="value"
        class="puik-input__field"
        :placeholder="placeholder"
        :disabled="disabled"
        :type="passwordIsVisible ? 'text' : type"
        :required="required"
        :autocomplete="autocomplete"
        :name="name"
        :min="type === 'number' ? min : undefined"
        :max="type === 'number' ? max : undefined"
        :step="type === 'number' ? step : undefined"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span
        v-if="type === 'password'"
        class="puik-input__reveal-password"
        @click="togglePasswordVisibility"
        >{{ passwordIsVisible ? 'visibility' : 'visibility_off' }}</span
      >
      <div v-else-if="$slots.append" class="puik-input__append">
        <slot name="append"></slot>
      </div>
      <puik-input-controls
        v-if="type === 'number'"
        :disabled="disabled"
        @increase="increase"
        @decrease="decrease"
      ></puik-input-controls>
    </div>
    <div v-if="$slots.hint || hasError" class="puik-input__hint">
      <span
        v-show="!hideHint"
        v-if="$slots.hint && !hasError"
        class="puik-input__hint__text"
        ><slot name="hint"></slot
      ></span>
      <div v-if="hasError" class="puik-input__hint__error">
        <puik-icon
          icon="error"
          class="puik-input__hint__error__icon"
          font-size="1.25rem"
        ></puik-icon>
        <span class="puik-input__hint__error__text">
          <slot name="error">{{ error }}</slot>
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { isNumber } from '@vueuse/core'
import { PuikIcon } from '@puik/components/icon'
import { slotIsEmpty } from '@puik/utils'
import PuikInputControls from './controls/controls.vue'
import { inputEmits, inputProps } from './input'
defineOptions({
  name: 'PuikInput',
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const slots = useSlots()
const isFocus = ref(false)
const passwordIsVisible = ref(false)

const inputClasses = computed(() => ({
  'puik-input__wrapper--focus': isFocus.value,
  'puik-input__wrapper--disabled': props.disabled,
  'puik-input__wrapper--success': props.success,
  'puik-input__wrapper--error': hasError.value,
}))

const handleFocus = () => (isFocus.value = true)
const handleBlur = () => (isFocus.value = false)

const togglePasswordVisibility = () =>
  (passwordIsVisible.value = !passwordIsVisible.value)

const increase = () => {
  if (isNumber(value.value) && value.value < props.max) {
    value.value += props.step
  }
}
const decrease = () => {
  if (isNumber(value.value) && value.value > props.min) {
    value.value -= props.step
  }
}

const hasError = computed(() => props.error || slotIsEmpty(slots.error))

const value = computed<string | number>({
  get() {
    if (isNumber(props.modelValue)) {
      return parseFloat(props.modelValue.toFixed(props.precision))
    }
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>
