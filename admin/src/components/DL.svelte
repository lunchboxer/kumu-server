<style>
  dl {
    display: grid;
    grid-column-gap: 0.5rem;
    grid-template-columns: [key] auto [value] auto;
    grid-template-rows: auto;
    justify-content: start;
  }

  dl :global(dt) {
    grid-column: key;
    justify-self: end;
    font-weight: bold;
  }

  dl :global(dd) {
    grid-column: value;
    justify-self: start;
  }
</style>

<dl>
  <slot></slot>
</dl>