<script>
  import { auth } from '../data/auth'
  import NavbarLink from './NavbarLink.svelte'
  import { notifications } from './notifications'

  let showMenu = false

  const logout = async () => {
    const username = await auth.logout()
    notifications.add({ text: `Logged out user '${username}'`, type: 'success' })
  }
</script>

<style>
  i {
    margin-right: 0.3rem;
  }

  .appname {
    margin: 0;
  }

  .logo {
    margin-right: 0.8rem;
  }

  .navbar {
    background: transparent;
    margin: 0;
  }

  @media only screen and (max-width: 1024px) {
    #navmenu {
      padding: 1rem;
      position: fixed;
      right: -15rem;
      width: 15rem;
      display: inherit;
      top: 0;
      bottom: 0;
      transition: 200ms ease-in-out;
      height: 100%;
      background: black;
    }

    .navbar-burger {
      z-index: 10;
    }

    #navmenu.is-active {
      transform: translate(-15rem);
    }
  }
</style>

<nav class="navbar is-black" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#/">
      <img class="logo" src="kumu-logo.png" height="28" alt="levitation logo" />
      <span class="title is-4 appname">Kumu</span>
    </a>

    {#if $auth.username}
      <div
        role="button"
        class="navbar-burger burger"
        class:is-active={showMenu}
        aria-label="menu"
        aria-expanded="false"
        data-target="navmenu"
        on:click={() => { showMenu = !showMenu }}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    {/if}
    </div>
  
  
    <div
      id="navmenu"
      class="navbar-menu"
      on:click={() => { showMenu = !showMenu }}
      class:is-active={showMenu}
    >
      <div class="navbar-start">
        {#if $auth.username}
        <NavbarLink url="/" text="Dashboard" icon="chalkboard-teacher" />
        <NavbarLink url="/sessions" text="Schedule" icon="calendar-alt" />
        <NavbarLink url="/groups" text="Groups" icon="users"  />
        <NavbarLink url="/students" text="Students" icon="address-card" />
        <NavbarLink url="/semesters" text="Semesters" icon="school" />
        <div class="navbar-item has-dropdown is-hoverable">
          <span class="navbar-link">
            <i class="fas fa-book"></i>Contents
          </span>
          <div class="navbar-dropdown">
            <NavbarLink url="/lessons" text="Lessons" />
            <NavbarLink url="/materials" text="Materials" />
            <NavbarLink url="/words" text="Words" />
            
            <hr class="navbar-divider">

            <NavbarLink url="/tags" text="Tags" />
          </div>
        </div>
        {/if}
      </div>
  
      <div class="navbar-end">
        {#if $auth.username}
        
          <NavbarLink url="/me" icon="user-circle" text={$auth.username}/>
         
          <div class="buttons">
            <button class="button is-text" on:click={logout}>
                  <strong>Log out</strong>
              </button>
          </div>

        {/if}
      </div>
    </div>
  </nav>