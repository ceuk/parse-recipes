const { parse } = require('recipe-ingredient-parser')

function getTime ($, type) {
  const $hrs = $(`.recipe-details__cooking-time-${type} .hrs`).text().trim()
  const $mins = $(`.recipe-details__cooking-time-${type} .mins`).text().trim()
  const hrs = $hrs ? parseInt($hrs.split(' ')[0]) : 0
  const mins = $mins ? parseInt($mins.split(' ')[0]) : 0
  return (hrs * 60) + mins
}

module.exports = $ => {
  const title = $('.recipe-header__title').text().trim()
  const time = getTime($, 'prep') + getTime($, 'cook')
  const serves = parseInt($('[itemprop="recipeYield"]').text().trim().split(' ')[1])
  const author = $('.recipe-header__chef a').eq(0).text().trim()
  const imageUrl = $('.recipe-header__media img').attr('src')
  const description = $('.recipe-header__description p').text().trim()
  const method = $('.method__item').toArray().map(step => $(step).text().trim())
  const ingredients = $('.ingredients-list__group').toArray().map(section => ({
    title: $(section).prev('h3.ingredients-list__group-title').text().trim(),
    items: $(section).find('.ingredients-list__item').toArray().map(ingredient => parse($(ingredient).contents().find('article').remove().end().text()))
  }))

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
