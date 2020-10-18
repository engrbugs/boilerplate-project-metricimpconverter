/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
const units = {
  gal: ["gallons", "l"],
  l: ["liters", "gal"],
  kg: ["kilograms", "lbs"],
  lbs: ["pounds", "kg"],
  mi: ["miles", "km"],
  km: ["kilometers", "mi"],
};

function ConvertHandler() {
  this.divideFraction = function (input) {
    input = input.join("").split("/");
    return input.length <= 2 ? parseFloat((input.reduce((a, b) => a / b)).trim()) : null;
  };

  this.getNum = function (input) {
    input = input.toLowerCase().match(/[^a-z]/gi) || 1;
    return input !== 1 ? this.divideFraction(input) : 1;
  };

  this.getUnit = function (input) {
    input = input.toLowerCase().match(/[a-z]/gi);
    return input
      ? Object.keys(units).includes(input.join(""))
        ? input.join("")
        : null
      : null;
  };

  this.getReturnUnit = function (initUnit) {
    initUnit = initUnit.toLowerCase();
    return units[initUnit][1];
  };

  this.spellOutUnit = function (unit) {
    return units[unit][0];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const LToGal = 1 / galToL;
    const kgToLbs = 1 / lbsToKg;
    const kmToMi = 1 / miToKm;

    if (initUnit === null) {
      return null;
    }

    switch(initUnit) {
      case 'gal': {
        return initNum * galToL;
      };
      case 'l': {
        return initNum * LToGal;
      };
      case 'lbs': {
        return initNum * lbsToKg;
      };
      case 'kg': {
        return initNum * kgToLbs;
      };
      case 'mi': {
        return initNum * miToKm;
      };
      case 'km': {
        return initNum * kmToMi;
      };
      default: {
        return null;
      }
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string:
        initNum +
        " " +
        this.spellOutUnit(initUnit) +
        " converts to " +
        returnNum.toFixed(5) +
        " " +
        this.spellOutUnit(returnUnit),
    };
  };
}

module.exports = ConvertHandler;
