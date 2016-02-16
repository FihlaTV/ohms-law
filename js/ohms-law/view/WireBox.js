// Copyright 2016, University of Colorado Boulder

/**
 * view scheme ohms law
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var CurrentValueBox = require( 'OHMS_LAW/ohms-law/view/CurrentValueBox' );
  var BatteriesView = require( 'OHMS_LAW/ohms-law/view/BatteriesView' );
  var ResistorView = require( 'OHMS_LAW/ohms-law/view/ResistorView' );
  var RightAngleArrow = require( 'OHMS_LAW/ohms-law/view/RightAngleArrow' );

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function WireBox( model ) {

    Node.call( this );

    var x = 70;
    var y = 400;
    var w = 550;
    var h = 180;

    this.addChild( new RightAngleArrow( model, x - 10, y + h + 10, 90 ) );
    this.addChild( new RightAngleArrow( model, x + w + 10, y + h + 10, 0 ) );

    this.addChild( new Rectangle( x, y, w, h, 4, 4, { stroke: '#000', lineWidth: 10 } ) );
    this.addChild( new CurrentValueBox( model, w * 0.7, h * 0.3 ).mutate( { centerX: x + w / 2, centerY: y + h / 2 } ) );
    this.addChild( new BatteriesView( model, x + 30, y ) );
    this.addChild( new ResistorView( model, x, y, w, h ) );
  }

  return inherit( Node, WireBox );
} );