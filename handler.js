const Parser = require('./lib/Parser')

export const parse = async (event) => {
  try {
    const parser = new Parser(event.body.url)
    const recipe = await parser.parse()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: err.toString() }
    }
  }
}
