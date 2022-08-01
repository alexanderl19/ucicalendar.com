<script>
  export let pathname;
</script>

<nav>
  <a href="https://ucicalendar.com">ucicalendar.com↗</a>
  <a class:active={pathname === "/about"} href="/about">about</a>
  <a class:active={pathname === "/format"} href="/format">format</a>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  nav a {
    padding: 4px 8px;
    border-radius: 4px;
    text-decoration: none;
    background-color: var(--gray3);
  }

  nav a:hover {
    background-color: var(--gray4);
  }

  nav a.active {
    color: var(--blue12);
    background-color: var(--gray4);
  }
</style>
