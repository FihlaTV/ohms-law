/**
 * Copyright 2002-2013, University of Colorado
 * Container for sliders and circumjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'OhmsLawStrings' );
  var WhiteBox = require( 'view/shapes/WhiteBox' );
  var Slider = require( 'view/shapes/SliderBox/Slider' );
  var imageLoader = require( 'imageLoader' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  var VOLTAGEMAX = 9,
    VOLTAGEMIN = 0.1,
    RESISTANCEMAX = 1000,
    RESISTANCEMIN = 10;

  function SlidersBox( model ) {
    Node.call( this );
    var rectW = 270,
      rectH = 400,
      rectX = 720,
      rectY = 80,
      textVoltage, textResistance;

    //xy Grid
    var yCoords = [5, 60, 340 , 340],
      xCoords = [70, 190];
    this.x = rectX;
    this.y = rectY;
    this.addChild( new WhiteBox( 0, 0, rectW, rectH ) );

    this.addChild( new Text( Strings.voltageSymbol, { font: new PhetFont( { family: "Times New Roman", size: 60, weight: "bold" } ), fill: "#0f0ffb", centerX: xCoords[0], top: yCoords[0] } ) );
    this.addChild( new Text( Strings.voltage, { font: new PhetFont( 16 ), textAlign: "center", textAnchor: "middle", fill: "#0f0ffb", centerX: xCoords[0], top: yCoords[1] } ) );
    this.addChild( textVoltage = new Text( model.voltage.toFixed( 1 ), { font: new PhetFont( 30 ), textAlign: "end", textAnchor: "end", fill: "#000", right: xCoords[0] + 15, top: yCoords[2] } ) );
    this.addChild( new Text( Strings.voltageSymbol, { font: new PhetFont( 30 ), textAlign: "start", textAnchor: "start", fill: "#0f0ffb", centerX: xCoords[0] + 30, top: yCoords[3] } ) );

    this.addChild( new Text( Strings.resistanceSymbol, { font: new PhetFont( { family: "Times New Roman", size: 60, weight: "bold" } ), fill: "#0f0ffb", centerX: xCoords[1], top: yCoords[0] } ) );
    this.addChild( new Text( Strings.resistance, { font: new PhetFont( 16 ), textAlign: "center", textAnchor: "middle", fill: "#0f0ffb", centerX: xCoords[1], top: yCoords[1] } ) );
    this.addChild( textResistance = new Text( model.resistance.toFixed( 0 ), { font: new PhetFont( 30 ), textAlign: "end", textAnchor: "end", fill: "#000", right: xCoords[1] + 20, top: yCoords[2] } ) );
    this.addChild( new Text( "Ω", { font: new PhetFont( 30 ), textAlign: "start", textAnchor: "start", fill: "#0f0ffb", centerX: xCoords[1] + 40, top: yCoords[3] } ) );

    // make all of the text and background unpickable, to speed up mouse/touch hit computation
    _.each( this.children, function( child ) { child.pickable = false; } );

    this.addChild( new Slider( xCoords[0], 90, 240, model.voltageProperty, imageLoader.getImage( 'slider.png' ), {min: VOLTAGEMIN, max: VOLTAGEMAX} ) );
    this.addChild( new Slider( xCoords[1], 90, 240, model.resistanceProperty, imageLoader.getImage( 'slider.png' ), {min: RESISTANCEMIN, max: RESISTANCEMAX} ) );

    model.voltageProperty.link( function updateTextVoltage( value ) {
      textVoltage.text = value.toFixed( 1 );
      textVoltage.right = xCoords[0] + 15;
    } );
    model.resistanceProperty.link( function updateTextResistance( value ) {
      textResistance.text = value.toFixed( 0 );
      textResistance.right = xCoords[1] + 15;
    } );
  }

  inherit( Node, SlidersBox );

  return SlidersBox;
} );
