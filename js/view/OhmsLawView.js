/**
 * Copyright 2002-2013, University of Colorado
 * View for OhmsLaw simulations.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var OhmsLawStage = require( 'view/OhmsLawStage' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );

  function OhmsLawView( model ) {
    ScreenView.call( this, { renderer: 'svg' } );
    //main stage
    this.addChild( new OhmsLawStage( model ) );
  }

  inherit( ScreenView, OhmsLawView );
  return OhmsLawView;

} )
;
