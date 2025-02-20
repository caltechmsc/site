/**
 * @fileoverview Publication Controllers
 * @description Controllers for papers list management.
 */

const publicationService = require('../services/publicationService');

const PaperCrawler = require('../services/paperCrawler');
const paperCrawler = new PaperCrawler(
  process.env.PUBLICATIONS_URL,
  process.env.PUBLICATIONS_HTML_URL,
  publicationService,
);

/**
 * @function getPublications - Get the papers list.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getPublications = async (req, res) => {
  try {
    const publications = await publicationService.getPublications();
    return res.success(publications, 'Publications retrieved successfully.');
  } catch (error) {
    console.error('Error getting publications: ', error);
    return res.internalServerError(
      'Error getting publications.',
      'GET_PUBLICATIONS_ERROR',
    );
  }
};

/**
 * @function getCrawlStatus - Get the status of the publication crawler.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getCrawlStatus = async (req, res) => {
  try {
    const crawlStatus = await publicationService.getCrawlStatus();
    return res.success(crawlStatus, 'Crawl status retrieved successfully.');
  } catch (error) {
    console.error('Error getting crawl status: ', error);
    return res.internalServerError(
      'Error getting crawl status.',
      'GET_CRAWL_STATUS_ERROR',
    );
  }
};

/**
 * @function reCrawl - Re-crawl the publications.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const reCrawl = async (req, res) => {
  try {
    // Check if the crawl is already in progress
    const isCrawling = await paperCrawler.isCrawling();
    if (isCrawling) {
      return res.badRequest(
        'Crawl is already in progress.',
        'CRAWL_IN_PROGRESS',
      );
    }

    // Crawl the publications
    await paperCrawler.crawlPublications();
    return res.success(null, 'Crawling publications...');
  } catch (error) {
    console.error('Error re-crawling publications: ', error);
    return res.internalServerError(
      'Error re-crawling publications.',
      'RE_CRAWL_ERROR',
    );
  }
};

module.exports = {
  getPublications,
  getCrawlStatus,
  reCrawl,
};
