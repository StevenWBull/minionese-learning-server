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

    res.status(200).send('OK');
  });

module.exports = languageRouter;
