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
 * @property {string} publicationHtmlUrl - The URL of the publication HTML.
 * @property {Object} publicationService - The publication service.
 */
class PaperCrawler {
  /**
   * @constructor
   * @param {string} publicationsUrl - The URL of the publications.
   * @param {string} publicationHtmlUrl - The URL of the publication HTML.
   * @param {Object} publicationService - The publication service.
   */
  constructor(publicationsUrl, publicationHtmlUrl, publicationService) {
    this.url = publicationsUrl;
    this.htmlUrl = publicationHtmlUrl;
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

    // Clear the crawl status if status is not completed
    const isCrawling = await this.isCrawling();
    if (isCrawling) {
      await this.updateCrawlStatus('publications', {
        status: 'failed',
        message: 'Crawl status cleared due to unexpected termination.',
        error: 'Unexpected termination.',
      });
      await this.updateCrawlStatus('thumbnails', {
        status: 'failed',
        message: 'Crawl status cleared due to unexpected termination.',
        error: 'Unexpected termination.',
      });
    }

    // Start the publication crawler
    await this.crawlPublications();
    await this.crawlPublicationThumbnails();
  }

  /**
   * @method combineAuthors - Get the authors from the publication.
   * @param {Array<Object>} authors - The authors of the publication.
   * @returns {string} The authors of the publication as a comma-separated string.
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
   * @method parseHtmlPublications - Parse the HTML content to extract publication entries.
   * @param {string} html - The raw HTML content.
   * @returns {Array<Object>} Array of publication objects.
   */
  parseHtmlPublications(html) {
    const $ = cheerio.load(html);
    const publications = [];

    // Each publication is contained within a div with class "csl-entry"
    $('div.csl-entry').each((i, elem) => {
      const entry = $(elem);
      const blocks = entry.find('div.csl-block');
      let title = '';
      let authors = '';
      let doi = '';

      // Extract title from the first csl-block, removing the leading number and period
      if (blocks.length >= 1) {
        const rawTitle = $(blocks[0]).text().trim();
        title = rawTitle.replace(/^\d+\.\s*/, '');
      }

      // Extract authors from the second csl-block
      const BLOCKS_LENGTH = 2;
      if (blocks.length >= BLOCKS_LENGTH) {
        authors = $(blocks[1]).text().trim();
      }

      // Extract DOI from anchor tag with an href that contains "doi.org"
      const doiAnchor = entry.find('a[href*="doi.org"]');
      if (doiAnchor.length > 0) {
        doi = doiAnchor.text().trim();
      }

      // Best effort to extract publisher and publicationDate from the entry text
      let publisher = '';
      let publicationDate = '';
      const entryText = entry.text();
      const pubMatch = entryText.match(/^\s*(.+?)\s*\((\d{4})\)/im);
      if (pubMatch) {
        publisher = pubMatch[1].trim().replace(/\s+\d+.*$/, '');
        const PUBLICATION_DATE_MATCH_SECOND_GROUP = 2;
        publicationDate = pubMatch[PUBLICATION_DATE_MATCH_SECOND_GROUP].trim();
      }

      publications.push({
        id: doi || '',
        url: '',
        title: title || '',
        authors: authors || '',
        abstract: '', // Abstract not provided in HTML data
        doi: doi || '',
        publisher: publisher || '',
        publicationDate: publicationDate || '',
        thumbnails: [], // Thumbnail processing left as a placeholder
      });
    });
    return publications;
  }

  /**
   * @method mergePublications - Merge publications from JSON and HTML sources using DOI as the primary key. (Use HTML data as base)
   * @param {Array<Object>} jsonPubs - Publications extracted from the JSON source.
   * @param {Array<Object>} htmlPubs - Publications extracted from the HTML source.
   * @returns {Array<Object>} Merged array of publications.
   */
  mergePublications(jsonPubs, htmlPubs) {
    // First, create a mapping of JSON data based on doi or id
    const jsonMapping = {};
    jsonPubs.forEach((pub) => {
      const key = pub.doi || pub.id;
      if (key) {
        jsonMapping[key] = pub;
      }
    });

    // Use HTML data as the base, only merge publications that exist in HTML
    const merged = htmlPubs.map((pub) => {
      // Use doi as the key in HTML, if not present use title
      const key = pub.doi || pub.title;
      // If the corresponding publication exists in JSON, supplement the missing fields in HTML
      if (jsonMapping[key]) {
        const jsonPub = jsonMapping[key];
        return {
          ...pub,
          // When the corresponding field in HTML is an empty string, use the data from JSON
          title: pub.title !== '' ? pub.title : jsonPub.title,
          authors: pub.authors !== '' ? pub.authors : jsonPub.authors,
          publisher:
            jsonPub.publisher !== '' ? jsonPub.publisher : pub.publisher,
          publicationDate:
            jsonPub.publicationDate !== ''
              ? jsonPub.publicationDate
              : pub.publicationDate,
          url: jsonPub.url !== '' ? jsonPub.url : pub.url,
          abstract: jsonPub.abstract !== '' ? jsonPub.abstract : pub.abstract,
        };
      } else {
        // If the publication does not exist in JSON, return the data from HTML directly
        return pub;
      }
    });

    return merged;
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

      // Retrieve any existing publications
      const originalPublications = await this.getPublications();

      // Fetch and process JSON data
      const jsonResponse = await axios.get(this.url);
      const publicationsJson = jsonResponse.data;
      const cleanedJsonPublications = [];
      const HUNDRED_PERCENT = 100;
      const publicationsPerPercent = Math.ceil(
        publicationsJson.length / HUNDRED_PERCENT,
      );
      for (const publication of publicationsJson) {
        cleanedJsonPublications.push({
          id: publication.id.replace('authors:', ''),
          url: publication.cite_using_url,
          title: publication.title,
          authors: this.combineAuthors(publication.author),
          abstract: publication.abstract || '',
          doi: publication.doi || '',
          publisher: publication.publisher || '',
          publicationDate: publication.publication_date || '',
          thumbnails:
            originalPublications.find(
              (p) => p.id === publication.id.replace('authors:', ''),
            )?.thumbnails || [], // Thumbnail field remains as is
        });
        if (cleanedJsonPublications.length % publicationsPerPercent === 0) {
          const progress = Math.floor(
            (cleanedJsonPublications.length / publicationsJson.length) *
              HUNDRED_PERCENT,
          );
          await this.updateCrawlStatus('publications', {
            progress,
            crawled: cleanedJsonPublications.length,
          });
        }
      }

      // Fetch and process HTML data
      const htmlResponse = await axios.get(this.htmlUrl);
      const htmlContent = htmlResponse.data;
      const cleanedHtmlPublications = this.parseHtmlPublications(htmlContent);

      // Merge the JSON and HTML publications using DOI as the key
      const mergedPublications = this.mergePublications(
        cleanedJsonPublications,
        cleanedHtmlPublications,
      );

      await this.updatePublications(mergedPublications);

      await this.updateCrawlStatus('publications', {
        status: 'completed',
        progress: 100,
        crawled: mergedPublications.length,
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

      // TODO: Implement thumbnail crawling logic here.
      /**
       * Currently, the thumbnail crawling logic is not implemented.
       * The problem is that a lot of websites block this crawling activity or use cloudflare protection.
       * Maybe we can use a headless browser like puppeteer to crawl the thumbnails.
       */

      throw new Error('Thumbnail crawling not implemented.');

      /** Example placeholder:
      await this.updatePublications(publications);
      await this.updateCrawlStatus('thumbnails', {
        status: 'completed',
        progress: 100,
        crawled: publications.length,
        lastUpdated: Date.now(),
        message: 'Publication thumbnails crawled successfully.',
      });
      **/
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
