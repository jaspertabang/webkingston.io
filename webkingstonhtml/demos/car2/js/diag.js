
			$(function() {

				var scrollDuration = 400;
				var scrollEasing = 'quadratic';

				//	small images carousel
				$('#carousel-small').carouFredSel({
					direction: 'up',
					width: 315,
					height: 220,
					items: {
						visible: 1,
						width: 315,
						height: 220
					},
					align: false,
					pagination: '#navi',
					scroll: {
						fx: 'directscroll',
						duration: scrollDuration,
						timeoutDuration: 1500,
						easing: scrollEasing,
						onBefore: function( data ) {
							data.items.old.animate({
								'margin-right': -100
							}, scrollDuration, scrollEasing);

							data.items.visible.css({
								'margin-right': 120
							}).animate({
								'margin-right': 10
							}, scrollDuration, scrollEasing);


							var index = $(this).triggerHandler( 'currentPosition' );
							if ( index == 0 ) {
								index = $(this).children().length;
							}

							//	trigger the titles carousel
							$('#carousel-title').trigger('slideTo', [ index, 'next' ]);

							//	trigger the large images carousel
							$('#carousel-large').trigger('slideTo', [ index, 'prev' ]);
						}
					}
				});

				//	large images carousel, controlled by the small images carousel
				$('#carousel-large').carouFredSel({
					direction: 'down',
					width: 615,
					height: 300,
					items: {
						visible: 1,
						width: 615,
						height: 300
					},
					align: false,
					auto: false,
					scroll: {
						fx: 'directscroll',
						duration: scrollDuration,
						easing: scrollEasing,
						onBefore: function( data ) {
							data.items.old.animate({
								'margin-left': -140
							}, scrollDuration, scrollEasing);

							data.items.visible.css({
								'margin-left': 160
							}).animate({
								'margin-left': 10
							}, scrollDuration, scrollEasing);
						}
					}
				});

				//	titles carousel, controlled by the small images carousel
				$('#carousel-title').carouFredSel({
					width: 350,
					height: 100,
					items: {
						visible: 1,
						width: 350,
						height: 100
					},
					align: false,
					auto: false,
					scroll: {
						fx: 'directscroll',
						duration: scrollDuration,
						easing: scrollEasing
					}
				});

				//	tweek the pagination to always scroll forward
				$('#navi a')
					.unbind( 'click' )
					.bind( 'click', function( event ) {
						event.preventDefault();
						$('#carousel-small').trigger( 'slideTo', [$(this).index(), true, 'next'] );
					}
				);
			});