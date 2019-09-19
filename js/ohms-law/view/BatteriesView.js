// Copyright 2013-2019, University of Colorado Boulder

/**
 * View of the battery pack at the top of the wire
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const BatteryView = require( 'OHMS_LAW/ohms-law/view/BatteryView' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // a11y strings
  var batteriesSupplyPatternString = OhmsLawA11yStrings.batteriesSupplyPattern.value;

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function BatteriesView( voltageProperty, tandem, options ) {
    Node.call( this, {
      tandem: tandem,

      // a11y
      tagName: 'li' // this assumes that it is a child of a 'ul'
    } );
    var self = this;

    // Store battery nodes in an array
    var batteries = [];

    var batteriesGroupTandem = tandem.createGroupTandem( 'battery' );

    // Create an array of batteries; enough to fill the entire wire.
    for ( var i = 0; i < OhmsLawConstants.MAX_NUMBER_OF_BATTERIES; i++ ) {
      var leftPosition = i * OhmsLawConstants.BATTERY_WIDTH;
      var battery = new BatteryView( batteriesGroupTandem.createNextTandem(), { x: leftPosition, y: 0 } );

      // Add them as children to this node, and to the array for manipulation
      this.addChild( battery );
      batteries.push( battery );
    }

    // Present for the lifetime of the simulation; no need to unlink.
    voltageProperty.link( function( voltage ) {

      batteries.forEach( function( battery, index ) {

        // Determine associated with a particular battery
        var voltageBattery = Math.min( OhmsLawConstants.AA_VOLTAGE, voltage - index * OhmsLawConstants.AA_VOLTAGE );
        voltageBattery = Util.roundToInterval( voltageBattery, Math.pow( 10, -OhmsLawConstants.VOLTAGE_SIG_FIGS ) );

        // Battery is only visible if it has a voltage.
        battery.visible = ( voltageBattery > 0 );

        if ( battery.visible ) {
          battery.setVoltage( voltageBattery );
        }
      } );

      // a11y - update the description for the number of batteries
      self.innerContent = StringUtils.fillIn( batteriesSupplyPatternString, {
        voltage: Util.toFixed( voltage, OhmsLawConstants.VOLTAGE_SIG_FIGS )
      } );
    } );
    this.mutate( options );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );