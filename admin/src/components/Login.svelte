<script>
  import { auth } from '../data/auth'
  import { notifications } from './notifications'
  import Input from './Input.svelte'
  import Error from './Error.svelte'

  let username = ''
  let password = ''
  let errors = ''
  let loading = false
  let show = false
  let submit
  let passInput
  let form

  const login = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    loading = true
    submit.disabled = true
    try {
      await auth.login(username, password)
      notifications.add({ text: `Logged in as '${username}'`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({ text: 'Login failed.', type: 'danger' })
      submit.disabled = false
    } finally {
      loading = false
    }
  }
  const showPassword = () => {
    passInput.type = !show ? 'text' : 'password'
    show = !show
  }
</script>

<style>
  .container-centered {
    margin-top: 10vh;
    display: flex;
    justify-content: center;
  }

  .button.showhide {
    width: 2.4rem;
    border: none;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="container-centered">
  <div class="login">
    <h1 class="title">Login</h1>
    <h3 class="subtitle">gotta log in to continue.</h3>

    <Error {errors} />
    <form bind:this={form} novalidate on:submit|preventDefault={login}>
      <Input name="usernameField" type="text" bind:value={username} label="Username" required leftIcon="user" />

      <label class="label" for="passwordField">Password</label>

      <div class="field has-addons">
        <div class="control has-icons-left">
          <input bind:this={passInput} class="input" bind:value={password} type="password" required />
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
        <div class="control">
          <span class="button is-white showhide" on:click={showPassword}>
            {#if show}
            <i class="fas fa-eye"></i>
            {:else}
            <i class="fas fa-eye-slash"></i>
            {/if}
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button type="submit"
            class="button is-primary is-loading"
            class:is-loading={loading}
            bind:this={submit}
          >
            Let me in!
          </button>
        </div>
      </div>
    </form>
    </div>
  </div>