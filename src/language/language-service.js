const LinkedList = require('../utils/LinkedList');

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },

  getLanguageHeadWord(db, language_head) {
    console.log(language_head)
    return db
      .from('word')
      .select(
        'original',
        'correct_count',
        'incorrect_count'
      )
      .where('word.id', language_head )
      .then( ([ word ]) => {
        return {
          nextWord: word.original,
          wordCorrectCount: word.correct_count,
          wordIncorrectCount: word.incorrect_count
        };
      });
  },

  createLinkedList(arr) {
    const sll = new LinkedList();
    for (let i = 0; i < arr.length; i++) {
      sll.insertLast(arr[i]);
    }
    return sll;
  },

  findCurrNode(sll, name) {
    return sll.findNode(name).value;
  },

  updatedHead(db, user_id, curr_head) {
    let newHead = Number(curr_head) + 1;
    return db
      .from('language')
      .where('language.user_id', user_id)
      .update({ head: newHead });
  },

  handleCorrectAnswer(sll, item) {
    //pull the correct item
    //set memory_value to *2 of current
    //save item to a variable
    //loop through current list with counter, check where memory_value >= then stop
    //insert item at the new index
    //update database with LL

  },

  handleIncorrectAnswer(sll, item) {
    //pull incorrect item
    //set memory_value to 1
    //save item to variable, then remove from the lL
    //insertFirst on item
    //update database with LL
  }
};

module.exports = LanguageService;
