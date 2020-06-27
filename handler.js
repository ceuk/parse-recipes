const Parser = require('./lib/Parser')

export const parse = async event => {
  try {
    const parser = new Parser(event)
    const recipe = await parser.parse()
    return {
      statusCode: 200,
      body: recipe
    }
  } catch (err) {
    console.err(err)
    return {
      statusCode: 500,
      body: err.toString()
    }
  }
}
