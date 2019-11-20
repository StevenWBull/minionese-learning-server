/* eslint-disable quotes */
const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const headWord = await LanguageService.getLanguageHeadWord(
        req.app.get('db'),
        req.language.head
      );
      res.send({
        totalScore: req.language.total_score,
        ...headWord
      });
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .post('/guess', async (req, res, next) => {
    const { guess } = req.body;

    if (!guess) {
      return res.status(400).send({
        error: `Missing 'guess' in request body`
      });
    }
    //get users words
    const words = await LanguageService.getLanguageWords(
      req.app.get('db'),
      req.language.id
    );

    let head = await LanguageService.getLanguageHeadWord(
      req.app.get('db'),
      req.language.head
    );
    //create linkedlist from current words
    let sll = LanguageService.createLinkedList(words);
    //find current and next word based on head number in LinkedList Data structure
    let currWord = LanguageService.findCurrNode(sll, head.nextWord);
    let nextWord = currWord.next;
      console.log(currWord.value.memory_value, nextWord)

    if (guess.toLowerCase() === currWord.value.translation) {
      await LanguageService.incrementCorrect(
        req.app.get('db'),
        currWord.value.id,
        head.wordCorrectCount,
        currWord.value.memory_value
      );
      await LanguageService.handleCorrectAnswer(
        req.app.get('db'),
        sll,
        currWord.value,
        nextWord.value.id,
        req.language.id
      );
      head = await LanguageService.getLanguageHeadWord(
        req.app.get('db'),
        req.language.head
      );
      return res.json({
        nextWord: nextWord.value.original,
        totalScore: req.language.total_score,
        wordCorrectCount: head.wordCorrectCount,
        wordIncorrectCount: head.wordIncorrectCount,
        answer: currWord.value.translation,
        isCorrect: true
      });
    } else {      
      await LanguageService.incrementIncorrect(
        req.app.get('db'),
        currWord.value.id,
        head.wordIncorrectCount
      );
      await LanguageService.handleIncorrectAnswer(
        req.app.get('db'),
        sll,
        currWord.value,
        nextWord.value.id,
        req.language.id
      );
      // reset head values with new values
      head = await LanguageService.getLanguageHeadWord(
        req.app.get('db'),
        req.language.head
      );
      return res.json({
        nextWord: nextWord.value.original,
        totalScore: req.language.total_score,
        wordCorrectCount: head.wordCorrectCount,
        wordIncorrectCount: head.wordIncorrectCount,
        answer: currWord.value.translation,
        isCorrect: false
      });
    }
  });

module.exports = languageRouter;
