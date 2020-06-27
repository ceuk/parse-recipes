const request = require('request')
const cheerio = require('cheerio')

const parsers = {
  greatbritishchefs: require('../parsers/greatBritishChefs'),
  bbcgoodfood: require('../parsers/bbcGoodFood')
}

class Parser {
  constructor (url) {
    this.url = url
    this.hostname = new URL(url).hostname
    const site = this.hostname.replace('www.', '').match(/(.*)(\.)/)[1]
    this.parser = parsers[site]
    // TODO add a generic 'best effort' parser
    if (!this.parser) {
      throw new Error('That site is not yet supported')
    }
  }

  async parse () {
    try {
      const body = await this.__fetchPage()
      const recipe = this.parser(body)
      recipe.site = this.hostname
      return recipe
    } catch (err) {
      console.error(err)
    }
  }

  __fetchPage () {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        url: this.url
      }, (err, res, body) => {
        if (err) reject(err)
        const $ = cheerio.load(body)
        resolve($)
      })
    })
  }
}

module.exports = Parser
