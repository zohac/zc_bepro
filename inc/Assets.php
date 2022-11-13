<?php

namespace ZcBepro\Includes;

class Assets {
	public static function register(): void {
		add_action( 'wp_enqueue_scripts', [self::class, 'addStyle'] );
		add_action( 'wp_enqueue_scripts', [self::class, 'addScript'] );
	}

	public static function addStyle(): void {
		wp_enqueue_style( 'zc_bepro-style', get_stylesheet_uri(), [], _S_VERSION );
		wp_style_add_data( 'zc_bepro-style', 'rtl', 'replace' );

		wp_enqueue_style('zc_bepro-main-style', get_stylesheet_directory_uri() . '/asset/css/main.css');
	}

	public static function addScript(): void {
		wp_enqueue_script(
			'zc_bepro-navigation',
			get_template_directory_uri() .
			'/js/navigation.js',
			[],
			_S_VERSION,
			true
		);

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
}