<?php

echo "<div class='home-carousel'>";

if(have_rows('homepage_carousel')){
    while(have_rows('homepage_carousel')) {
        the_row();
        
        $headline = get_sub_field('headline');
        $button_text = get_sub_field('button_text');
        $button_link = get_sub_field('button_link');
        $background_image = get_sub_field('background_image');

        echo "

        <div class='home-slide' style='background-image: url($background_image);' >
            <div class='text-container'>
                <div class='container'>
                    <p class='headline'>$headline</p>
                    <a href='$button_link' class='button arrow blue'>$button_text</a>
                </div>
            </div>
        </div>

        ";

    }
}

echo "</div>";

?>