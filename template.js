const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')

const META = {}

const onReadFile = (err, htmlText) => {
  if (err) {
    return console.error('Unable to read index.hbs')
  }
  const html = getHTML(htmlText)
  onWriteIndex(html)
}

const getHTML = htmlText => {
  const integrationTemplate = Handlebars.compile(htmlText)
  return integrationTemplate({
    JS_BUILDHASH: process.env.JS_BUILDHASH,
    CSS_BUILDHASH: process.env.CSS_BUILDHASH,
    META,
  })
}

onWriteIndex = html => {
  fs.writeFile('dist/index.html', html, () =>
    console.log('Integration html written')
  )
}



fs.readFile('src/index.hbs', 'utf8', onReadFile)
