<?php

namespace ZcBepro\Includes;

class Tag {
	public static function render(): void {
		$taxonomy = 'post_tag';
		$terms = get_the_terms( 0, $taxonomy );

		if ( is_wp_error( $terms ) ) {
			return;
		}

		if ( empty( $terms ) ) {
			return;
		}

		$tags = '';
		foreach ( $terms as $term ) {
			$link = get_term_link( $term, $taxonomy );
			if ( is_wp_error( $link ) ) {
				return;
			}
			$tags .= sprintf (
				'<a href="%1$s" rel="tag" class="tag-links chip">%2$s</a>',
				esc_url( $link ),
				$term->name
			);
		}

		echo $tags;
	}
}