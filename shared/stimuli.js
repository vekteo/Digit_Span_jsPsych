// const treatments = ["control", "red-numbers", "even-odd", "colored-numbers"];
const treatments = ["control", "colored-numbers", "colored-keys"];

function selectTreatment() {
  return jsPsych.randomization.sampleWithoutReplacement(treatments)[0];
}

function createStimuli(numbers, numberWithinLevel, level, treatment) {
  return numbers.map((number, index) => {
    return {
      stimulus: `<h1 id='stimulus' class='treatment-${treatment} digit-${number}'>${number}</h1>`,
      data: {
        level: level,
        correct_answer: numbers.join(""),
        number_within_level: numberWithinLevel,
        number_within_run: index + 1,
        is_mistake: 0,
      },
    };
  });
}


let answerInput = { stimulus: "answer", data: {} };

function digitSpanStimuliForTreatment(treatment) {
  return {
    practice: {
      level1: createStimuli(["3", "6"], 1, 2, treatment),
      level2: createStimuli(["4", "7"], 2, 2, treatment),
    },
    digit3: {
      level1: createStimuli(["5", "8", "2"], 1, 3, treatment),
      level2: createStimuli(["6", "9", "4"], 2, 3, treatment),
      level3: createStimuli(["1", "4", "8"], 3, 3, treatment),
      level4: createStimuli(["2", "7", "6"], 4, 3, treatment),
    },
    digit4: {
      level1: createStimuli(["6", "4", "3", "9"], 1, 4, treatment),
      level2: createStimuli(["7", "2", "8", "6"], 2, 4, treatment),
      level3: createStimuli(["9", "6", "2", "5"], 3, 4, treatment),
      level4: createStimuli(["7", "2", "9", "1"], 4, 4, treatment),
    },
    digit5: {
      level1: createStimuli(["4", "2", "8", "3", "1"], 1, 5, treatment),
      level2: createStimuli(["7", "5", "2", "3", "6"], 2, 5, treatment),
      level3: createStimuli(["6", "3", "7", "8", "1"], 3, 5, treatment),
      level4: createStimuli(["9", "6", "2", "7", "5"], 4, 5, treatment),
    },
    digit6: {
      level1: createStimuli(["6", "1", "9", "5", "8", "3"], 1, 6, treatment),
      level2: createStimuli(["3", "9", "2", "4", "8", "7"], 2, 6, treatment),
      level3: createStimuli(["7", "1", "8", "2", "9", "5"], 3, 6, treatment),
      level4: createStimuli(["1", "5", "3", "7", "2", "9"], 4, 6, treatment),
    },
    digit7: {
      level1: createStimuli(
        ["5", "9", "1", "7", "3", "8", "2"],
        1,
        7,
        treatment,
      ),
      level2: createStimuli(
        ["4", "1", "5", "9", "3", "8", "6"],
        2,
        7,
        treatment,
      ),
      level3: createStimuli(
        ["6", "5", "1", "4", "3", "9", "2"],
        3,
        7,
        treatment,
      ),
      level4: createStimuli(
        ["1", "4", "2", "5", "3", "8", "6"],
        4,
        7,
        treatment,
      ),
    },
    digit8: {
      level1: createStimuli(
        ["5", "8", "1", "9", "2", "6", "4", "3"],
        1,
        8,
        treatment,
      ),
      level2: createStimuli(
        ["3", "7", "2", "9", "5", "1", "8", "6"],
        2,
        8,
        treatment,
      ),
      level3: createStimuli(
        ["5", "9", "1", "6", "8", "3", "4", "2"],
        3,
        8,
        treatment,
      ),
      level4: createStimuli(
        ["3", "2", "5", "7", "6", "9", "1", "8"],
        4,
        8,
        treatment,
      ),
    },
    digit9: {
      level1: createStimuli(
        ["2", "7", "5", "8", "6", "3", "9", "1", "4"],
        1,
        9,
        treatment,
      ),
      level2: createStimuli(
        ["7", "1", "3", "9", "4", "2", "5", "6", "8"],
        2,
        9,
        treatment,
      ),
      level3: createStimuli(
        ["8", "1", "4", "9", "6", "2", "5", "7", "3"],
        3,
        9,
        treatment,
      ),
      level4: createStimuli(
        ["2", "9", "5", "1", "7", "3", "4", "6", "8"],
        4,
        9,
        treatment,
      ),
    },
  };
}
