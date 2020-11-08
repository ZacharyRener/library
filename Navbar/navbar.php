<section id="header">
  <section id="utility-menu" class="">
    <div class="container d-flex flex-row">
      <nav id="socials" class="">
        <ul class="d-flex flex-row">
          {#each socialIcons as { icon_name, link }}
            <li>
              <a target="_blank" href={link}>{@html icon_name}</a>
            </li>
          {/each}
        </ul>
      </nav>
      <section
        id="right-side"
        class="d-flex flex-row w-100 justify-content-end">
        <nav id="utility">
          <ul class="d-flex flex-row">
            {#each utilityMenu as { title, url, child_items }}
              <li><a href={url}>{title}</a></li>
              {#if child_items}
                <ul class="sub-menu hidden">
                  {#each child_items as { title, url }}
                    <li><a href={url}>{title}</a></li>
                  {/each}
                </ul>
              {/if}
            {/each}
          </ul>
        </nav>
        <form action="/">
          <input id="s" name="s" placeholder="Search..." />
        </form>
      </section>
    </div>
  </section>
  <section id="primary-nav" class="">
    <div class="container d-flex flex-row">
      <a href="/"><img src={logo} class="site-logo" alt="" /></a>
      <nav id="primary">
        <ul
          class="d-flex flex-row w-100 justify-content-end align-items-center">
          {#each primaryMenu as { title, url, child_items }}
            <li>
              <a
                on:mouseenter|self={navEnter}
                on:mouseleave|self={navLeave}
                href={url}
                class={2}>{title}</a>
              {#if child_items}
                <ul on:mouseleave|self={toggleMenu} class="sub-menu hidden">
                  {#each child_items as { title, url }}
                    <li><a href={url}>{title}</a></li>
                  {/each}
                </ul>
              {/if}
            </li>
          {/each}
        </ul>
      </nav>
    </div>
    <section id="mobile-nav">
      <button
        on:click={handleHamburgerClick}
        class="hamburger hamburger--slider"
        type="button">
        <span class="hamburger-box"> <span class="hamburger-inner" /> </span>
      </button>
    </section>
    <section id="mobile-menu" class="hidden">
      <ul>
        {#each primaryMenu as { title, url, child_items }}
          <li>
            <a href={url}>{title}</a>{#if child_items}
              <ul class="sub-menu hidden">
                {#each child_items as { title, url }}
                  <li><a href={url}>{title}</a></li>
                {/each}
              </ul>
            {/if}
          </li>
        {/each}
      </ul>
    </section>
  </section>
</section>