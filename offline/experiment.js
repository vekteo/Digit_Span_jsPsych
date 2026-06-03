/* 
Created by Teodora Vekony (vekteo@gmail.com)
MEMO Team (PI: Dezso Nemeth)
Lyon Neuroscience Research Center
Universite Claude Bernard Lyon 1

Github:https://github.com/vekteo/Digit_Span_JSPsych
*/

/*************** VARIABLES ***************/

function expStart(subject, session) {
  let mistake = 0;
  let quit = 0;
  let response;
  let result;
  const images = [
    "../static/images/instruction_en.gif",
    "../static/images/instruction_hu.gif",
  ];
  const subjectId = subject;
  const sessionNumber = session;

  /* create trials */

  let timeline = [];
  const trialStructure = {
    type: "html-keyboard-response",
  };

  const instructions = {
    type: "instructions",
    pages: [
      `<h1>${language.welcomePage.welcome}</h1><br><p>${language.welcomePage.clickNext}</p>`,
      `<p>${language.instruction.numbers}</p><p>${language.instruction.oneSecond}</p><p>${language.instruction.yourTask}</p><p>${language.instruction.submit}</p>${language.instruction.image}<p>${language.instruction.clickNext}</p>`,
    ],
    data: { test_part: "instruction" },
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous,
  };

  const welcome = {
    ...trialStructure,
    stimulus: `<h2>${language.welcomePage.welcome}</h2><h2>${language.welcomePage.clickNext}</h2>`,
  };
  const afterPractice = {
    ...trialStructure,
    stimulus: `<p>${language.practice.afterPractice}</p><br><p>${language.practice.startTask}</p>`,
    data: { test_part: "start_task" },
  };
  const startOfPractice = {
    ...trialStructure,
    stimulus: `<p>${language.practice.practice}</p><p>${language.practice.startPractice}</p>`,
    data: { test_part: "start_practice" },
  };

  const feedback1 = {
    ...trialStructure,
    stimulus: `<p>${language.feedback.answerIs}<strong>36</strong></p>`,
    data: { test_part: "feedback" },
    on_start: function (trial) {
      let answer = jsPsych.data
        .get()
        .last(1)
        .values()[0]
        .responses.replace(/\D/g, "");
      answer === jsPsych.data.get().last(2).values()[0].correct_answer
        ? (trial.stimulus = `<p>${language.feedback.correctIs}<strong>36</strong></p><h2 class='correct'>${language.feedback.correct}</h2><p>${language.feedback.nextPractice}</p>`)
        : (trial.stimulus = `<p>${language.feedback.correctIs}<strong>36</strong></p><h2 class='wrong'>${language.feedback.wrong}</h2><p>${language.feedback.yourAnswer}${answer}</p><p>${language.feedback.nextPractice}</p>`);
    },
  };

  const feedback2 = {
    ...trialStructure,
    stimulus: `<p>${language.feedback.answerIs}<strong>47</strong></p>`,
    data: { test_part: "feedback" },
    on_start: function (trial) {
      let answer = jsPsych.data
        .get()
        .last(1)
        .values()[0]
        .responses.replace(/\D/g, "");
      answer === jsPsych.data.get().last(2).values()[0].correct_answer
        ? (trial.stimulus = `<p>${language.feedback.correctIs}<strong>47</strong></p><h2 class='correct'>${language.feedback.correct}</h2><p>${language.feedback.toContinue}</p>`)
        : (trial.stimulus = `<p>${language.feedback.correctIs}<strong>47</strong></p><h2 class='wrong'>${language.feedback.wrong}</h2><p>${language.feedback.yourAnswer}${answer}</p><p>${language.feedback.toContinue}</p>`);
    },
  };

  const endOfTask = {
    ...trialStructure,
    stimulus: `<h2>${language.end.end}</h2><br><p>${language.feedback.longestStream2}</p><br><p>${language.end.thankYou}</p>`,
    data: { test_part: "debrief" },
    on_start: function (trial) {
      if (
        jsPsych.data.get().last(2).values()[0].correct_answer != "295173468"
      ) {
        result = jsPsych.data.get().last(2).values()[0].level - 1;
      } else {
        result = 9;
      }
      trial.stimulus = `<h2>${language.end.end}</h2><p>${language.feedback.longestStream}<strong>${result}</strong>${language.feedback.numbers}</p><p>${language.end.thankYou}</p>`;
    },
    on_finish: function (data) {
      data.digit_span = result;
    },
  };

  const startNow = {
    ...trialStructure,
    stimulus: `<h2>${language.practice.end}</h2><p>${language.task.start}</p><p>${language.task.press}</p>`,
    data: { test_part: "start_task" },
  };

  let levels = [
    digitSpanStimuli.digit3.level1,
    digitSpanStimuli.digit3.level2,
    digitSpanStimuli.digit3.level3,
    digitSpanStimuli.digit3.level4,
    digitSpanStimuli.digit4.level1,
    digitSpanStimuli.digit4.level2,
    digitSpanStimuli.digit4.level3,
    digitSpanStimuli.digit4.level4,
    digitSpanStimuli.digit5.level1,
    digitSpanStimuli.digit5.level2,
    digitSpanStimuli.digit5.level3,
    digitSpanStimuli.digit5.level4,
    digitSpanStimuli.digit6.level1,
    digitSpanStimuli.digit6.level2,
    digitSpanStimuli.digit6.level3,
    digitSpanStimuli.digit6.level4,
    digitSpanStimuli.digit7.level1,
    digitSpanStimuli.digit7.level2,
    digitSpanStimuli.digit7.level3,
    digitSpanStimuli.digit7.level4,
    digitSpanStimuli.digit8.level1,
    digitSpanStimuli.digit8.level2,
    digitSpanStimuli.digit8.level3,
    digitSpanStimuli.digit8.level4,
    digitSpanStimuli.digit9.level1,
    digitSpanStimuli.digit9.level2,
    digitSpanStimuli.digit9.level3,
    digitSpanStimuli.digit9.level4,
  ];

  const answer = {
    type: "survey-html-form",
    preamble: `<p>${language.task.whatNumbers}</p><p>${language.task.enter}</p>`,
    html: '<p><input name="answer" type="text" id="input" required/></p>',
    button_label: `${language.button.submit}`,
    data: { test_part: "answer" },
    on_load: function () {
      document.getElementById("input").focus();
    },
  };

  const test = {
    ...trialStructure,
    stimulus: jsPsych.timelineVariable("stimulus"),
    choices: jsPsych.NO_KEYS,
    data: jsPsych.timelineVariable("data"),
    trial_duration: stimulusDuration,
    stimulus_duration: stimulusDuration,
    on_finish: function (data) {
      data.test_part = "stimulus";
    },
  };

  /* function for adding trials to timeline */

  function pushElement(stimulus, testOrAnswer) {
    let element = {
      ...timelineElementStructure,
      timeline_variables: stimulus,
      timeline: [testOrAnswer],
      conditional_function: function () {
        if (quit == 1) {
          return false;
        } else {
          return true;
        }
      },
    };
    timeline.push(element);
  }

  /*************** TIMELINE ***************/

  const timelineElementStructure = {
    repetitions: 1,
    randomize_order: false,
  };

  const practiceBlock1 = {
    ...timelineElementStructure,
    timeline_variables: digitSpanStimuli.practice.level1,
    timeline: [test],
  };
  const practiceBlock2 = {
    ...timelineElementStructure,
    timeline_variables: digitSpanStimuli.practice.level2,
    timeline: [test],
  };
  const practiceAnswer = {
    ...timelineElementStructure,
    timeline_variables: answerInput,
    timeline: [answer],
  };

  jsPsych.data.addProperties({ subject: subject });
  jsPsych.data.addProperties({ session: session });
  timeline.push(
    { type: "fullscreen", fullscreen_mode: true },
    instructions,
    startOfPractice,
    practiceBlock1,
    practiceAnswer,
    feedback1,
    practiceBlock2,
    practiceAnswer,
    feedback2,
    startNow,
  );

  for (i = 0; i < levels.length; i++) {
    pushElement(levels[i], test);
    pushElement(answerInput, answer);
  }

  timeline.push(endOfTask, { type: "fullscreen", fullscreen_mode: false });

  /*************** EXPERIMENT START AND DATA UPDATE ***************/

  jsPsych.init({
    timeline: timeline,
    preload_images: images,
    on_close: function () {
      jsPsych.data
        .get()
        .localSave("csv", `DS_subject_${subjectId}_quitted_output.csv`);
    },
    on_data_update: function () {
      if (jsPsych.data.get().last(2).values()[0]) {
        if (jsPsych.data.get().last(2).values()[0].number_within_level === 1) {
          mistake = 0;
        }

        if (jsPsych.data.get().last(2).values()[0].level > 2) {
          if (
            jsPsych.data.get().last(1).values()[0].trial_type ===
            "survey-html-form"
          ) {
            let lastAnswer = jsPsych.data
              .get()
              .last(1)
              .values()[0]
              .responses.replace(/\D/g, "");
            if (
              lastAnswer !==
              jsPsych.data.get().last(2).values()[0].correct_answer
            ) {
              mistake++;
              jsPsych.data.get().last(1).values()[0].is_mistake = 1;
            }
            if (mistake == 2) {
              quit = 1;
            }
          }
        }
      }

      let interactionData = jsPsych.data.getInteractionData();
      const interactionDataOfLastTrial = interactionData
        .filter({ trial: jsPsych.data.get().last(1).values()[0].trial_index })
        .values();
      if (interactionDataOfLastTrial) {
        jsPsych.data.get().last(1).values()[0].browser_events = JSON.stringify(
          interactionDataOfLastTrial,
        );
      }
    },
    on_finish: function () {
      jsPsych.data.get().localSave("csv", `DS_subject_${subjectId}_output.csv`);
    },
  });
}
