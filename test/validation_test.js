const expect = require("chai").expect
const {replaceTime, repeatValue} = require("../helpers/validation")
const {validationHelper} = require('../mock/mock')

describe("Validation Helper", function() {
    let{timeDurationAM, timeDurationPM, expectedDurationPM, expectedDurationAM} = validationHelper
    describe("string to array time conversion", function() {
      it("converts the string time", function() {
        let timePm = replaceTime(timeDurationPM)
        let timeAm = replaceTime(timeDurationAM)

        expect(timePm).to.eql(expectedDurationPM);
        expect(timeAm).to.eql(expectedDurationAM);
        });
    });
    let {everyday, everyweek, expectedDay, expectedWeek} = validationHelper
    describe("string to integer value conversion", function() {
        it("converts the repeat value", function() {
          let day = repeatValue(everyday)
          let week = repeatValue(everyweek)
  
          expect(day).to.equal(expectedDay);
          expect(week).to.equal(expectedWeek);
          });
      });
  });