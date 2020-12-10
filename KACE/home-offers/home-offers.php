<?php

$featured_large_offer = get_field('featured_large_offer');
$title = get_field('title', $featured_large_offer);
$excerpt = get_field('excerpt', $featured_large_offer);
$button_text = get_field('button_text', $featured_large_offer);
$button_link = get_field('button_link', $featured_large_offer);
$image = get_field('image', $featured_large_offer);

echo "

<section id='home-offers'>

    <div class='container'>

        <div class='featured-offer'>
            <div class='left image'>
                <img src='$image'>
            </div>
            <div class='right content'>
                <div class='with-bg'>
                    <p class='headline'>$title</p>
                    $excerpt
                </div>
                <a href='$button_link' class='offer-btn'>$button_text</a>
            </div>
        </div>

        <div class='small-offers'>";
            
            if(have_rows('small_offers')){
                while(have_rows('small_offers')){
                    the_row();

                    $offer = get_sub_field('offer');
                    $title = get_field('title', $offer);
                    $excerpt = get_field('excerpt', $offer);
                    $button_text = get_field('button_text', $offer);
                    $button_link = get_field('button_link', $offer);
                    $image = get_field('image', $offer);

                    echo "
                    <div class='offer-container'>
                        <div class='with-bg'>
                            <p class='headline'>$title</p>
                            $excerpt
                        </div>
                        <a href='$button_link' class='offer-btn'>$button_text</a>
                    </div>
                    ";

                }
            }

        echo "</div>

    </div>

</section>

";

?>