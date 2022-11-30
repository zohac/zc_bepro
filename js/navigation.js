/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation doesn't exist.
	if ( ! siteNavigation ) {
		return;
	}

	function toggleMenu( event, submenu ) {
		event.preventDefault();
		const menu = submenu.getElementsByClassName( 'sub-menu' )[ 0 ];
		menu.classList.toggle( 'toggled' );
	}

	const submenus = siteNavigation.getElementsByClassName( 'menu-item-has-children' );

	function getSpanElement() {
		const span = document.createElement( 'span' );
		span.classList.add( 'icon-after' );
		const textElement = document.createTextNode( 'ᐅ' );
		span.append( textElement );
		return span;
	}

	function getReturnSubMenu() {
		const liElement = document.createElement( 'li' );
		const divElement = document.createElement( 'div' );
		const textElement = document.createTextNode( 'ᐊ' );
		divElement.append( textElement );
		divElement.classList.add( 'return' );
		liElement.append( divElement );

		return liElement;
	}

	for ( const submenu of submenus ) {
		const ulElement = submenu.getElementsByTagName( 'ul' )[ 0 ];
		ulElement.insertBefore( getReturnSubMenu(), ulElement.firstChild );
		const returnElement = ulElement.getElementsByClassName( 'return' )[ 0 ];

		returnElement.addEventListener( 'click', function( event ) {
			ulElement.addEventListener( 'animationend', ( event ) => {
				ulElement.classList.remove( 'close-sub-menu' );
			} );
			ulElement.classList.add( 'close-sub-menu' );
			toggleMenu( event, submenu );
		} );

		const link = submenu.getElementsByTagName( 'a' )[ 0 ];
		link.append( getSpanElement() );

		link.addEventListener( 'click', function( event ) {
			toggleMenu( event, submenu );
			link.classList.toggle( 'rotate' );
		} );

		link.addEventListener( 'touchend', function( event ) {
			toggleMenu( event, submenu );
		} );
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];
	const menuOverlay = siteNavigation.getElementsByClassName( 'overlay' )[ 0 ];

	// Return early if the button doesn't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	function toggledMenu() {
		siteNavigation.classList.toggle( 'toggled' );

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
		}
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function() {
		toggledMenu();
	} );

	menuOverlay.addEventListener( 'click', function() {
		toggledMenu();

		for ( const submenu of submenus ) {
			const menuItem = submenu.getElementsByClassName( 'sub-menu' )[ 0 ];
			menuItem.classList.remove( 'toggled' );

			const span = submenu.getElementsByTagName( 'span' )[ 0 ];
			span.remove();
			const link = submenu.getElementsByTagName( 'a' )[ 0 ];
			link.append( getSpanElement() );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );

			for ( const submenu of submenus ) {
				const menuItem = submenu.getElementsByClassName( 'sub-menu' )[ 0 ];
				menuItem.classList.remove( 'toggled' );
			}
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		let self = this;
		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( ! self.classList.contains( 'nav-menu' ) ) {
			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				self.classList.toggle( 'focus' );
			}
			self = self.parentNode;
		}
	}

	function touchstartToggleFocus( event ) {
		const menuItem = this.parentNode;
		event.preventDefault();
		for ( const link of menuItem.parentNode.children ) {
			if ( menuItem !== link ) {
				link.classList.remove( 'focus' );
			}
		}
		menuItem.classList.toggle( 'focus' );
	}
}() );
