/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      var input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test("Fractional Input", function (done) {
      var input = "1/2L";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      const input = "5.5/2mi";
      assert.equal(convertHandler.getNum(input), 2.75);
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      const input = "5.5/2/2l";
      assert.equal(convertHandler.getNum(input), null);
      done();
    });

    test("No Numerical Input", function (done) {
      const input = "lbs";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      var input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach(function (ele) {
        assert.equal(convertHandler.getUnit(el), el.toLowerCase());
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      const input = "whatever";
      assert.equal(convertHandler.getUnit(input), null);
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg"];
      var expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      const input = ["gal", "l", "mi", "km", "lbs", "kg"];
      const expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach((el, i) => {
        assert.strictEqual(convertHandler.spellOutUnit(el), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      var input = [6, "L"];
      var expected = 1.58503;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      );
      done();
    });

    test("Mi to Km", function (done) {
      var input = [10, "Mi"];
      var expected = 16.0934;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      );
      done();
    });

    test("Km to Mi", function (done) {
      var input = [2.5, "Km"];
      var expected = 1.55343;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      );
      done();
    });

    test("Lbs to Kg", function (done) {
      var input = [3 / 3, "Lbs"];
      var expected = 0.453592;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      );
      done();
    });

    test("Kg to Lbs", function (done) {
      var input = [6.3 / 2, "Kg"];
      var expected = 6.944561;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1 // Tolerance
      );
      done();
    });
  });
});
