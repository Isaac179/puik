import { buildProps } from '@puik/utils'
import type { ExtractPropTypes } from 'vue'
import type ProgressStepperStep from './progress-stepper-step.vue'

export const progressStepperStepProps = buildProps({
  step: {
    type: [String, Number],
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
} as const)

export type ProgressStepperStepProps = ExtractPropTypes<
  typeof progressStepperStepProps
>

export type ProgressStepperStepInstance = InstanceType<
  typeof ProgressStepperStep
>
