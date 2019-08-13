<script>
  let input
  export let value
  export let showDescription = false
  export let label = ''
  let error = false
  export let required = false
  export let pattern = '^.+$'
  export let minlength = 1
  export let maxlength = null
  export let type = 'text'
  export let description = ''
  export let width = '40rem'
  export let min = null
  export let max = null
  export let rightIcon = null
  export let leftIcon = null
  export let placeholder = ''

  $: name = label.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  $: descriptionId = `description${name}`

  function checkValidity () {
    error = !input.validity.valid && input.validationMessage ? input.validationMessage : ''
  }
</script>

<div class="field">
  <label class="label">{label}
    {#if description}
          <p class="help is-info" id="{descriptionId}">{description}</p>
          {/if}
        </label>
        <div class="field-body">
          <div class="control" class:has-icons-left={leftIcon} class:has-icons-right={rightIcon}>
            {#if type === 'text'}
            <input bind:this={input} {name} class="input" bind:value class:error={error} type="text" {pattern} {minlength} {maxlength}
             {required} aria-describedby="{descriptionId}" on:input={checkValidity} on:invalid|preventDefault={checkValidity} {placeholder}/>
            {/if}
            {#if type === 'password'}
            <input bind:this={input} {name} class="input" bind:value class:error={error} type="password" {pattern} {minlength} {maxlength}
             {required} aria-describedby="{descriptionId}" on:input={checkValidity} on:invalid|preventDefault={checkValidity} {placeholder} />
            {/if}
            {#if type === 'date'}
            <input bind:this={input} {name} class="input" bind:value class:error={error} type="date" pattern="^[0-9]{4}-(1[0-2]|0[1-9])-([1-3][0-9]|0[1-9])$"
             {required} {max} aria-describedby="{descriptionId}" on:input={checkValidity} on:invalid|preventDefault={checkValidity} />
            {/if}
            {#if type === 'datetime-local'}
            <input bind:this={input} {name} class="input" bind:value class:error={error} type="datetime-local"
             {required} {max} aria-describedby="{descriptionId}" on:input={checkValidity} on:invalid|preventDefault={checkValidity} />
            {/if}
            {#if leftIcon}
            <span class="icon is-small is-left">
              <i class="fas fa-{leftIcon}"></i>
            </span>
            {/if} {#if rightIcon}
            <span class="icon is-small is-right">
              <i class="fas fa-{rightIcon}"></i>
            </span>
            {/if}
            {#if error}
            <p class="help is-danger">{error}</p>
            {/if}
          </div>
        </div>
</div>

  
  <style>
  input {
    max-width: 40rem;
  }
  </style>