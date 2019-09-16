// Copyright 2019, University of Colorado Boulder

/**
 * uery parameters used in sim-specific code
 *
 * @author John Blanco (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  var OhmsLawQueryParameters = QueryStringMachine.getAll( {

    // controls whether the slider click sounds are enabled
    sliderClicksEnabled: {
      type: 'boolean',
      defaultValue: true
    },

    // controls whether the current sound fades out after the user stops changing the value
    currentSoundFades: {
      type: 'boolean',
      defaultValue: true
    }
  } );

  ohmsLaw.register( 'OhmsLawQueryParameters', OhmsLawQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( OhmsLawQueryParameters, null, 2 ) );

  return OhmsLawQueryParameters;
} );
