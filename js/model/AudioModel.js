// Copyright 2002-2013, University of Colorado
/**
 * Model container for the "OhmsLaw" module.
 */
define(
    [
      'util/Sound',
      '../../common/phetcommon/js/model/property/BooleanProperty'
    ],
    function ( Sound, BooleanProperty ) {
      'use strict';
      function AudioModel( model ) {
        var self = this;

        self.active = new BooleanProperty( true );
        self.sounds = {
          'clink': new Sound( 'clink' ),
          'clonk': new Sound( 'clonk' )
        };

        var oldVal = Math.floor( model.voltage.get() / 1.5 );
        model.voltage.addObserver( function ( value ) {
          var newVal = Math.floor( (value - 0.1) / 1.5 );
          if ( self.active.get() ) {
            if ( newVal > oldVal ) {
              self.sounds.clink.play();
            }
            else if ( newVal < oldVal ) {
              self.sounds.clonk.play();
            }
          }
          oldVal = newVal;
        } );

        return self;

      }

      return AudioModel;
    } );