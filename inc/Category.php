<?php

namespace ZcBepro\Includes;

class Category {
	public static function render():void {
		global $wp_rewrite;
		$rel = ( is_object( $wp_rewrite ) && $wp_rewrite->using_permalinks() ) ? 'category tag' : 'category';

		$categories = get_the_category();

		$list = '';
		foreach ($categories as $category) {
			$list .= sprintf(
				'<span class="cat-links badge"><a href="%1$s" rel="%2$s">%3$s</a></span>',
				esc_url( get_category_link( $category->term_id ) ),
				$rel,
				$category->name
			);
		}

		echo $list;
	}
}