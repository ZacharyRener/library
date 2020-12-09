<section id="header">
  <section id="utility-menu" class="">
    <div class="container d-flex flex-row">
      <nav id="socials" class="">
        <ul class="d-flex flex-row">
          <?php 
          if(have_rows('social_media', 'options')):
            while(have_rows('social_media', 'options')): the_row(); ?>
              <li>
                <a target="_blank" href="<?php the_sub_field('link'); ?>"><?php the_sub_field('icon_name'); ?></a>
              </li>
            <?php endwhile;
          endif;
          ?>
        </ul>
      </nav>
      <section
        id="right-side"
        class="d-flex flex-row w-100 justify-content-end">
        <nav id="utility">
          <?php
            wp_nav_menu( array(
              'menu'              => 3,
              'menu_class'        => "d-flex flex-row",
              'container_class'   => "",
              'depth'             => 3,
          ) );
          ?>
        </nav>
        <form action="/">
          <input id="s" name="s" placeholder="Search..." />
        </form>
      </section>
    </div>
  </section>
  <section id="primary-nav" class="">
    <div class="container d-flex flex-row">
      <?php if(get_field('logo', 'options')): ?>
      <a href="/">
        <img src="<?php the_field('logo', 'options'); ?>" class="site-logo" alt="" />
      </a>
      <?php endif; ?>
      <nav id="primary">
        <?php
          wp_nav_menu( array(
            'menu'              => 2,
            'menu_class'        => "d-flex flex-row w-100 justify-content-end align-items-center",
            'container_class'   => "",
            'depth'             => 3,
        ) );
        ?>
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
      <?php
        wp_nav_menu( array(
          'menu'              => 2,
          'menu_class'        => "",
          'container_class'   => "",
          'depth'             => 3,
      ) );
      ?>
    </section>
  </section>
</section>