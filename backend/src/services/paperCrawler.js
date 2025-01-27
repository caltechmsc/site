/**
 * @fileoverview Paper Crawler
 * @description Service for crawling papers from the web.
 */

const schedule = require('node-schedule');
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * @class PaperCrawler - A class for crawling papers from the web.
 * @property {string} publicationsUrl - The URL of the publications.
 * @property {Object} publicationService - The publication service.
 */
class PaperCrawler {
  /**
   * @constructor
   * @param {string} publicationsUrl - The URL of the publications.
   * @param {Object} publicationService - The publication service.
   */
  constructor(publicationsUrl, publicationService) {
    this.url = publicationsUrl;
    this.getPublications = publicationService.getPublications;
    this.updatePublications = publicationService.updatePublications;
    this.getCrawlStatus = publicationService.getCrawlStatus;
    this.updateCrawlStatus = publicationService.updateCrawlStatus;

    this.init();
  }

  /**
   * @method init - Initialize the paper crawler.
   */
  async init() {
    // Schedule the publication crawler to run every hour (except at midnight)
    schedule.scheduleJob('0 0-23/1 * * *', this.crawlPublications.bind(this));

    // Schedule the publication thumbnail crawler to run at 1 AM and 1 PM
    schedule.scheduleJob(
      '0 1,13 * * *',
      this.crawlPublicationThumbnails.bind(this),
    );

    // Start the publication crawler
    await this.crawlPublications();
    await this.crawlPublicationThumbnails();
  }

  /**
   * @method getAuthors - Get the authors from the publication.
   * @param {Array<Object>} authors - The authors of the publication.
   * @returns {Array<string>} The authors of the publication.
   */
  combineAuthors(authors) {
    if (!Array.isArray(authors)) {
      throw new Error('Input must be an array');
    }

    // Map through the array, combining given_name and family_name
    return authors
      .map((author) => {
        const { given_name, family_name, clpid } = author;
        if (!given_name || !family_name) {
          throw new Error(
            'Author object must contain both given_name and family_name',
          );
        }
        // Include "III" or other suffixes if present in clpid
        const suffix = clpid ? ` ${clpid.split('-').pop()}` : '';
        return `${given_name} ${family_name}${suffix}`;
      })
      .join(', '); // Combine all names into a single string, separated by commas
  }

  /**
   * @method isCrawling - Check if the publication crawler is currently crawling.
   * @returns {boolean} True if the publication crawler is currently crawling, false otherwise.
   */
  async isCrawling() {
    const crawlStatus = await this.getCrawlStatus();
    return (
      crawlStatus.publications.status === 'crawling' ||
      crawlStatus.thumbnails.status === 'crawling'
    );
  }

  /**
   * @method crawlPublications - Crawl the publications from the web.
   */
  async crawlPublications() {
    try {
      const isCrawling = await this.isCrawling();
      if (isCrawling) {
        return;
      }

      await this.updateCrawlStatus('publications', {
        status: 'crawling',
        progress: 0,
        crawled: 0,
        lastCrawled: Date.now(),
        error: null,
        message: 'Crawling publications...',
      });

      const originalPublications = await this.getPublications();

      const response = await axios.get(this.url);
      const publicationsJson = response.data;
      const cleanedPublications = [];

      const HUNDRED_PERCENT = 100;
      const publicationsPerPercent = Math.ceil(
        publicationsJson.length / HUNDRED_PERCENT,
      );
      for (const publication of publicationsJson) {
        cleanedPublications.push({
          id: publication.id.replace('authors:', ''),
          url: publication.cite_using_url,
          title: publication.title,
          authors: this.combineAuthors(publication.author),
          abstract: publication.abstract,
          doi: publication.doi,
          publisher: publication.publisher,
          publicationDate: publication.publication_date,
          thumbnails:
            originalPublications.find(
              (p) => p.id === publication.id.replace('authors:', ''),
            )?.thumbnails || [],
        });
        if (cleanedPublications.length % publicationsPerPercent === 0) {
          const progress = Math.floor(
            (cleanedPublications.length / publicationsJson.length) *
              HUNDRED_PERCENT,
          );
          await this.updateCrawlStatus('publications', {
            progress,
            crawled: cleanedPublications.length,
          });
        }
      }

      await this.updatePublications(cleanedPublications);

      await this.updateCrawlStatus('publications', {
        status: 'completed',
        progress: 100,
        crawled: cleanedPublications.length,
        lastUpdated: Date.now(),
        message: 'Publications crawled successfully.',
      });
    } catch (error) {
      console.error('Error crawling publications: ', error);
      await this.updateCrawlStatus('publications', {
        status: 'failed',
        error: error.message,
        message: 'Error crawling publications.',
      });
    }
  }

  /**
   * @method crawlPublicationThumbnails - Crawl the thumbnails for the publications.
   */
  async crawlPublicationThumbnails() {
    try {
      const isCrawling = await this.isCrawling();
      if (isCrawling) {
        return;
      }

      await this.updateCrawlStatus('thumbnails', {
        status: 'crawling',
        progress: 0,
        crawled: 0,
        lastCrawled: Date.now(),
        error: null,
        message: 'Crawling publication thumbnails...',
      });

      // TODO: Implement thumbnail crawling logic here
      /**
       * Currently, the thumbnail crawling logic is not implemented.
       * The problem is that a lot of websites block this crawling activity or using cloudflare protection.
       * Maybe we can use a headless browser like puppeteer to crawl the thumbnails.
       */

      throw new Error('Thumbnail crawling not implemented.');

      /**await this.updatePublications(publications);

      await this.updateCrawlStatus('thumbnails', {
        status: 'completed',
        progress: 100,
        crawled: publications.length,
        lastUpdated: Date.now(),
        message: 'Publication thumbnails crawled successfully.',
      });**/
    } catch (error) {
      // console.error('Error crawling publication thumbnails: ', error);
      await this.updateCrawlStatus('thumbnails', {
        status: 'failed',
        error: error.message,
        message: 'Error crawling publication thumbnails.',
      });
    }
  }
}

module.exports = PaperCrawler;
