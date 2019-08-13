<!-- Most of this is adapted from svelte-flatpickr, modified to work with svelte3 -->
<script>
  import flatpickr from 'flatpickr'
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import 'flatpickr/dist/flatpickr.css'
  import '../../public/calendar-theme.css'

  const dispatch = createEventDispatcher()

  let dateInput
  let fp
  export let value
  export let placeholder = ''
  export let className = ''
  export let options = {}

  const hooks = new Set([
    'onChange',
    'onOpen',
    'onClose',
    'onMonthChange',
    'onYearChange',
    'onReady',
    'onValueUpdate',
    'onDayCreate'
  ])

  onMount(() => {
    fp = flatpickr(dateInput, addHooks(options))
  })

  $: if (fp && value) {
    fp.setDate(value)
  }

  onDestroy(() => { if (fp && 'destroy' in fp) fp.destroy() })

  const addHooks = (options) => {
    options = Object.assign({}, options)
    for (let hook of hooks) {
      let dispatcher = (selectedDates, dateString, instance) => {
        dispatch(stripOn(hook), [selectedDates, dateString, instance])
      }
      if (hook in options) {
        // Hooks must be arrays
        if (!Array.isArray(options[hook])) {
          options[hook] = [options[hook]]
        }
        options[hook].push(dispatcher)
      } else {
        options[hook] = [dispatcher]
      }
    }
    if (options.onChange && !options.onChange.includes(updateValue)) {
      options.onChange.push(updateValue)
    }
    return options
  }
  const updateValue = (newValue) => {
    if (Array.isArray(newValue) && newValue.length === 1) {
      newValue = newValue[0]
    }
    value = newValue
  }
  const stripOn = (hook) => {
    return hook.charAt(2).toLowerCase() + hook.substring(3)
  }
</script>

<style>
  input {
    width: 308px;
  }
</style>

<input bind:this={dateInput} bind:value type="date" class={className} placeholder={placeholder} />