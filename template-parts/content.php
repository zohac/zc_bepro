<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package zc_bepro
 */

use ZcBepro\Includes\Category;
use ZcBepro\Includes\Tag;

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <?= $headerWrapper = (has_post_thumbnail())? '<div class="header-wrapper">' : '' ?>

        <header class="entry-header">
			<?php
			if ( is_singular() ) :
				the_title( '<h1 class="entry-title">', '</h1>' );
			else :
				the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
			endif;

			if ( 'post' === get_post_type() ) :
				?>
                <div class="entry-meta">
					<?php
					zc_bepro_posted_on();
					zc_bepro_posted_by();

					// Hide category and tag text for pages.
					if ( 'post' === get_post_type() ) {
						Category::render();
						Tag::render();
					}

					?>
                </div><!-- .entry-meta -->
			<?php endif; ?>
        </header><!-- .entry-header -->

		<?php
            $counter = $args['counter'] ?? 0;
            zc_bepro_post_thumbnail($counter);
        ?>

	<?= $headerWrapper = (has_post_thumbnail())? '</div>' : '' ?>


    <hr>

	<div class="entry-content">

		<?php
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'zc_bepro' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			)
		);

		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'zc_bepro' ),
				'after'  => '</div>',
			)
		);
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php zc_bepro_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
