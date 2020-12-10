<?php

$seo_image = get_field('seo_image');
$seo_copy = get_field('seo_copy');

echo "

<section id='seo-section'>

    <div class='container'>
        <div class='left image'>
            <img src='$seo_image'>
        </div>
        <div class='right seo-copy'>
            $seo_copy
        </div>
    </div>

</section>

";