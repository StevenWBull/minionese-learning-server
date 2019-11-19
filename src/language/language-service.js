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

  createLinkedList(arr) {
    const sll = new LinkedList();
    for (let i = 0; i < arr.length; i++) {
      sll.insertLast(arr[i]);
    }
    return sll.head;
  },

  getLanguageHeadWord(db, language_head) {
    return db
      .from('word')
      .select(
        'original',
        'correct_count',
        'incorrect_count'
      )
      .where('word.id', language_head )
      .then( word => {
        return {
          nextWord: word[0].original,
          wordCorrectCount: word[0].correct_count,
          wordIncorrectCount: word[0].incorrect_count
        };
      });
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
