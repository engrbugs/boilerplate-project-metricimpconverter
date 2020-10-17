/*
*
*
*       Complete the handler logic below
*       
*       
*/
const units = {
  gal : [ 'gallons'   , 'l'   , 3.78541  ],
  l   : [ 'liters'    , 'gal' , 0.26417  ],
  kg  : [ 'kilograms' , 'lbs' , 2.20462  ],
  lbs : [ 'pounds'    , 'kg'  , 0.453592 ],
  mi  : [ 'miles'     , 'km'  , 1.60934  ],
  km  : [ 'kilometers', 'mi'  , 0.621371 ]
}



function ConvertHandler() {
  
  this.divideFraction = function (input) {
    input = input.join( '' ).split( '/' );
    return input.length <= 2
            ? input.reduce( ( a,b ) => a / b )
            : null;
  }

  this.getNum = function(input) {
    input = input.toLowerCase( ).match( /[^a-z]/gi ) || 1;
    return input !== 1 ? this.divideFraction( input ) : 1;
  };
  
  this.getUnit = function(input) {
    input = input.toLowerCase().match( /[a-z]/gi );
    return input
          ? Object.keys( units ).includes( input.join( '' ) )
            ? input.join( '' )
            : null
          : null;
  };
  
  this.getReturnUnit = function(initUnit) {
    initUnit = initUnit.toLowerCase( );
    return this.units[ initUnit ][ 1 ];
  };

  this.spellOutUnit = function(unit) {
    return this.units[ unit ][ 0 ];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const LToGal =  1 /galToL;
    const kgToLbs = 1 /lbsToKg;
    const kmToMi = 1 /miToKm;
    
    initUnit = initUnit.toLowerCase( );
    return initNum * this.units[ initUnit ][ 2 ];
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return { initNum, initUnit, returnNum, returnUnit,
      string: initNum + ' ' + this.spellOutUnit( initUnit )
        + ' converts to ' + returnNum.toFixed( 5 ) + ' '
        + this.spellOutUnit( returnUnit )
    }; 
  };
  
}

module.exports = ConvertHandler;
