<?php

namespace ZcBepro\Includes;

class Logo {
	public static function getCustomLogo(): string {
		return apply_filters( 'get_custom_logo', self::getHtml() );
	}

	public static function getHtml(): string {
		$custom_logo_id = get_theme_mod( 'custom_logo' );
		[ $src, $width, $height, $resized ] = wp_get_attachment_image_src( $custom_logo_id, 'full', false );

		if (null === $src) {
			return '<span></span>';
		}

		return sprintf(
			'<picture>
                        <img src="%1$s" alt="" width="%2$s" height="%3$s">
					</picture>',
			$src,
			$width,
			$height
		);
	}
}