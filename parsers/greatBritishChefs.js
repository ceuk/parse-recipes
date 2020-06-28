const { parse } = require('recipe-ingredient-parser')

module.exports = $ => {
  const title = $('.Header__Title h1').text().trim()
  const time = $('.gbcicon-clock').next().text().trim()
  const serves = parseInt($('.gbcicon-serves').next().text().trim())
  const author = $('.Author__Name a').eq(0).text().trim()
  const imageUrl = $('#head-media').attr('src')
  const description = $('.RecipeAbstract__Abstract').text().trim()
  const method = $('.MethodList__StepText').toArray().map(step => $(step).text().trim())
  const groups = $('.IngredientsList__GroupTitleItem').toArray()
  const ingredients = groups.length ? groups.map(section => ({
    title: $(section).find('h4').text().trim(),
    items: $(section).next('ul').children('li').toArray().map(ingredient => parse($(ingredient).text().replace(/\s\s+/g, ' ').trim()))
  })) : [{
    title: '',
    items: $('.IngredientsList__IngredientItem').toArray().map(ingredient => parse($(ingredient).text().replace(/\s\s+/g, ' ').trim()))
  }]

  return {
    title,
    time,
    serves,
    author,
    imageUrl,
    description,
    method,
    ingredients
  }
}
