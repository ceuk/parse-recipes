const Parser = require('./lib/Parser')

export const parse = async (event, context, cb) => {
  try {
    const parser = new Parser(event.body)
    const recipe = await parser.parse()
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    }
  } catch (err) {
    console.error(err)
    cb(err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: { error: err.toString() }
    }
  }
}
