import { test, expect } from '@playwright/test'
import { describe } from 'node:test'

test.use({
  permissions: ['geolocation']
})
describe('weather app', () => {
  test('fetch weather data for a current location', async ({ page, context }) => {
    await context.setGeolocation({ longitude: 48.858455, latitude: 2.294474 })

    await page.goto('/')
    const locator = page.locator('h1')
    await expect(locator).toContainText('Your Location')
  })
  test('fetch weather data for a searched location', async ({ page }) => {
    await page.goto('/')

    const searched = 'london'
    const expected = 'London'
    const textField = await page.getByPlaceholder('Search for a city...')
    await textField.fill(searched)
    await textField.press('Enter')

    const locator = await page.locator('h1')
    await expect(locator).toContainText(searched.at(0)?.toUpperCase() + searched.slice(1))

    // save location
    const buttonSave = await page.getByRole('button', { name: 'save location' })
    await buttonSave.click()
    // go home page and check if it's added to cities list
    const homelink = await page.getByLabel('back to home page')
    await homelink.click()

    const cityButton = await page.getByRole('button', { name: expected })
    await expect(cityButton).toBeAttached()

    // navigate to city page
    await page.goto(`location?q=${expected}`)

    // delete location
    const buttonDelete = await page.getByRole('button', { name: 'delete location' })
    await buttonDelete.click()

    // back to home page and check if it's deleted
    await page.goto('/')
    await expect(cityButton).not.toBeAttached()
  })
})
