const exams = [
  {
    id: 0,
    subject: "Math",
    title: "Algebra",
    desc: "Basic math operation",
    examLength: 5,
    questions: [
      {
        id: 1,
        question: "How old are you?",
        a: 14,
        b: 16,
        c: 17,
        d: 13,
        e: "answer_key",
      },
      {
        id: 2,
        question: "Where do you live?",
        a: "Bohol",
        b: "Cebu",
        c: "Samar",
        d: "Leyte",
        e: "answer_key",
      },
      {
        id: 3,
        question: "1 + 1",
        a: 11,
        b: 3,
        c: 7,
        d: 5,
        e: "answer_key",
      },
      {
        id: 4,
        question: "Favorite subject",
        a: "English",
        b: "Filipino",
        c: "Science",
        d: "Programming",
        e: "answer_key",
      },
      {
        id: 5,
        question: "What is orange?",
        a: "Color",
        b: "Fruit",
        c: "None of the above",
        d: "Both C and E",
        e: "answer_key",
      },
    ],
  },
];

module.exports = exams;
