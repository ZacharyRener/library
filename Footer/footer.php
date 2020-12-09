<section id="footer">
  <div class="container">
    <div class="left copyright">{copyright}</div>
    <div class="right">
      <ul class="footer-menu">
        {#each menu as { text, link }}
          <li><a href={link}>{text}</a></li>
        {/each}
      </ul>
    </div>
  </div>
</section>