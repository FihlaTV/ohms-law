// Copyright 2017, University of Colorado Boulder

/**
 * The scene accessible summary content for Ohms Law.  This manages the strings available
 * to a screen reader, and generates the parallel DOM structure.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var JoistA11yStrings = require( 'JOIST/JoistA11yStrings' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var SceneSummaryNode = require( 'SCENERY_PHET/accessibility/nodes/SceneSummaryNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // a11y strings
  var summaryLookForSlidersString = OhmsLawA11yStrings.summaryLookForSliders.value;
  var summarySimString = OhmsLawA11yStrings.summarySim.value;
  var rightNowString = OhmsLawA11yStrings.rightNow.value;
  var voltageSummaryPatternString = OhmsLawA11yStrings.voltageSummaryPattern.value;
  var resistanceSummaryPatternString = OhmsLawA11yStrings.resistanceSummaryPattern.value;
  var currentSummaryPatternString = OhmsLawA11yStrings.currentSummaryPattern.value;
  var checkOutShortcutsString = JoistA11yStrings.checkOutShortcuts.value;

  function OhmsLawScreenSummaryNode( model ) {

    var content = new Node();

    // h2 and main summary for this sim
    var summaryNode = new Node( {
      tagName: 'p',
      innerContent: summarySimString
    } );

    var rightNowParagraphNode = new Node( { tagName: 'p', innerContent: rightNowString } );

    // list outlining the values for this sim
    var valueListNode = new Node( { tagName: 'ul' } );
    var valueVoltageItemNode = new Node( { tagName: 'li' } );
    var valueResistanceItemNode = new Node( { tagName: 'li' } );
    var valueCurrentItemNode = new Node( { tagName: 'li' } );
    valueListNode.children = [ valueVoltageItemNode, valueResistanceItemNode, valueCurrentItemNode ];

    var sliderParagraphNode = new Node( { tagName: 'p', innerContent: summaryLookForSlidersString } );
    var shortcutParagraphNode = new Node( { tagName: 'p', innerContent: checkOutShortcutsString } );

    // add all children to this node, ordering the accessible content
    content.addChild( summaryNode );
    content.addChild( rightNowParagraphNode );
    content.addChild( valueListNode );
    content.addChild( sliderParagraphNode );
    content.addChild( shortcutParagraphNode );

    SceneSummaryNode.call( this, '', { // don't add the scene summary as a string, but as the content instead
      content: content,
      multiscreen: false
    } );


    // add all values to a list so we can easily iterate and add listeners to update descriptions
    // with each property
    var valueItemList = [
      {
        property: model.voltageProperty,
        patternString: voltageSummaryPatternString,
        node: valueVoltageItemNode,
        precision: OhmsLawConstants.VOLTAGE_SIG_FIGS
      },
      {
        property: model.resistanceProperty,
        patternString: resistanceSummaryPatternString,
        node: valueResistanceItemNode,
        precision: OhmsLawConstants.RESISTANCE_SIG_FIGS
      },
      {
        property: model.currentProperty,
        patternString: currentSummaryPatternString,
        node: valueCurrentItemNode,
        precision: OhmsLawConstants.CURRENT_SIG_FIGS
      }
    ];

    // register listeners that update the labels in the scene summary - this summary exists for life of sim,
    // no need to dispose
    valueItemList.forEach( function( item ) {
      item.property.link( function( value ) {
        item.node.innerContent = StringUtils.fillIn( item.patternString, {
          value: Util.toFixed( value, item.precision )
        } );
      } );
    } );
  }

  ohmsLaw.register( 'OhmsLawScreenSummaryNode', OhmsLawScreenSummaryNode );

  return inherit( SceneSummaryNode, OhmsLawScreenSummaryNode );
} );