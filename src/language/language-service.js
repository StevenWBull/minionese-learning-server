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
    return sll.findNode(name);
  },

/*   updatedHead(db, user_id, new_head) {
    new_head = Number(new_head);
    return db
      .from('language')
      .where('language.user_id', user_id)
      .update({ head: new_head });
  }, */

  incrementIncorrect(db, word_id, curr_count) {
    let new_count = Number(curr_count) + 1
    return db
      .from('word')
      .where({ id: word_id })
      .update({ 
        incorrect_count: new_count,
        memory_value: 1 
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

  handleIncorrectAnswer(db, sll, item, key, language_id) {
    //pull incorrect item
    //set memory_value to 1
    //save item to variable, then remove from the lL
    //insertAfter on item
    //update database with LL
    sll.remove(item);
    sll.insertAfter(item, key);
    
    let updateDb = [];
    let currNode = sll.head;

    while(currNode !== null) {
      updateDb.push(currNode.value);
      currNode = currNode.next;
    }

    return db.transaction(async trx =>{
      return Promise.all([
        trx('language')
          .where({id: language_id})
          .update({
            head: updateDb[0].id
          }),
        
        ...updateDb.map(word => {
          return trx('word')
            .where({id: word.id})
            .update({
              next: word.next ? word.next : null,
              memory_value: word.memory_value
            });
        })
      ]);
    });
  }
};

module.exports = LanguageService;
