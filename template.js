const path = require('path')
const fs = require('fs')
const Handlebars = require('handlebars')

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
    FB_PIXEL_ID: process.env.FB_PIXEL_ID,
    JS_BUILDHASH: process.env.JS_BUILDHASH,
    CSS_BUILDHASH: process.env.CSS_BUILDHASH,
    GA_ID: process.env.GA_ID || '133303109-2',
    HOTJAR_ID: process.env.HOTJAR_ID,
  })
}

onWriteIndex = html => {
  fs.writeFile('dist/index.html', html, () =>
    console.log('Integration html written')
  )
}

fs.readFile('src/index.hbs', 'utf8', onReadFile)
