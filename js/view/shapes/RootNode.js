// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Main container for all part of scene
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var WireBox = require( 'view/shapes/WireBox' );
  var SlidersBox = require( 'view/shapes/SlidersBox' );
  var FormulaView = require( 'view/shapes/FormulaView' );

  function RootNode( model ) {
    Node.call( this );
    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    this.addChild( new SlidersBox( model ) );
  }

  inherit( Node, RootNode );

  return RootNode;
} );
