import { test, expect } from '@playwright/test'
import { describe } from 'node:test'

test.use({
  geolocation: { longitude: 12.492507, latitude: 41.889938 },
  permissions: ['geolocation']
})
describe('weather app', () => {
  test('fetch weather data for a current location', async ({ page, context }) => {
    await page.goto('/')
    await page.getByTestId('current-location').click()

    const locator = page.locator('h1')
    await expect(locator).toContainText('Your Location')
  })
  test('fetch weather data for a searched location', async ({ page }) => {
    await page.goto('/')

    const searched = 'london'
    const textField = await page.getByPlaceholder('Search for a city...')
    await textField.fill(searched)
    // await textField.press('Enter')
    const firstSuggestedLocation = await page.getByTestId('search-list').locator('> li > button')
    const expectedLocation = await firstSuggestedLocation.first().textContent()
    await firstSuggestedLocation.first().click()

    const locator = await page.locator('h1')
    await expect(locator).toContainText(expectedLocation!)

    // save location
    const buttonSave = await page.getByRole('button', { name: 'save location' })
    await buttonSave.click()
    // go home page and check if it's added to cities list
    const homelink = await page.getByLabel('back to home page')
    await homelink.click()

    const cityButton = await page.getByRole('button', { name: expectedLocation! })
    await expect(cityButton).toBeAttached()

    // navigate to city page
    await page.goto(`location?q=${expectedLocation}`)

    // delete location
    const buttonDelete = await page.getByRole('button', { name: 'delete location' })
    await buttonDelete.click()

    // back to home page and check if it's deleted
    await page.goto('/')
    await expect(cityButton).not.toBeAttached()
  })
})
