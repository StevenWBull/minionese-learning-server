const { LinkedList } = require('../utils/LinkedList');

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

  createLinkedList(arr, language) {
    const sll = new LinkedList();
    let currNode = arr.find( e => e.id === language.head);
    sll.insertLast(currNode);

    while (!currNode.next) {
      currNode = arr.find( e => e.id === currNode.next);
      sll.insertLast(currNode);
    }
    return sll;
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
  }
};

module.exports = LanguageService;
