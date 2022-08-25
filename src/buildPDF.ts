import fs from 'fs-extra'
import puppeteer from 'puppeteer'

const URL = 'http://127.0.0.1:5173'

export async function buildPDF(url: string) {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })
  const pdf = await page.pdf({
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: '0.4in',
      bottom: '0.4in',
      left: '0.4in',
      right: '0.4in',
    },
  })
  await browser.close()
  fs.writeFileSync('./dist/resume.pdf', pdf)
  return pdf
}

buildPDF(URL).catch((e) => {
  console.error(e)
  process.exit(1)
})
