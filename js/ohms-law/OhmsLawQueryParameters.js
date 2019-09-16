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

    // checks all Check Boxes, to make development easier
    sliderClicksEnabled: {
      type: 'boolean',
      defaultValue: true
    }
  } );

  ohmsLaw.register( 'OhmsLawQueryParameters', OhmsLawQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( OhmsLawQueryParameters, null, 2 ) );

  return OhmsLawQueryParameters;
} );
