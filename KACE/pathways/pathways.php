<?php

$pathway_headline = get_field('pathway_headline');

echo "

<section id='pathways'>

    <div class='container'>
        <p class='headline'>$pathway_headline</p>
    </div>

    <div class='pathway-container'>
    ";

    if(have_rows('pathways')){
        while(have_rows('pathways')){
            the_row();

            $headline = get_sub_field('headline');
            $link = get_sub_field('link');

            echo "
            
                <div class='pathway'>
                    <a href='$link'>$headline</a>
                </div>

            ";

        }
    }

    echo "
    </div>
</section>
";

?>