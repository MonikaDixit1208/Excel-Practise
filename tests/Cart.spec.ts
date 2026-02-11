import {test,expect} from '@playwright/test'
test('Items added to the cart', async({page})=>{
    test.step('Launching url',async()=>{
await page.goto('https://valentinos-magic-beans.click/')
    await page.getByRole('link',{name:'Shop',
        exact:true
    }).click()
    })

const firstElement=await page.locator('.p-6').first()
await firstElement.click()
const name=await firstElement.getByRole('heading').textContent()
const price=await firstElement.locator('.font-bold').textContent()
console.log(name)
console.log(price)
await firstElement.getByRole('button',{name:'Add to Cart'}).click()
await page.locator('[data-test-id="header-cart-button"]').getByRole('button').click()
const priceValidate=await page.locator('span:has-text("$22.99")').textContent()
const expectedPrice=Number(priceValidate?.substring(1))
const actualPrice=Number(price?.substring(1))
await expect(expectedPrice).toBe(actualPrice)
console.log(actualPrice)
console.log(expectedPrice)
await page.getByRole('button', { name: 'Proceed to Checkout' }).click()
await page.getByRole('textbox', { name: 'First Name' }).fill('Monika')
await page.getByRole('textbox', { name: 'Last Name' }).fill('Dixit')
await page.getByRole('textbox', { name: 'Email' }).fill('monika@gmail.com')
await page.getByRole('textbox', { name: 'Address' }).fill('Mayur Vihar')
await page.getByRole('textbox', { name: 'City' }).fill('Delhi')
await page.getByRole('textbox', { name: 'ZIP Code' }).fill('12345')

await page.getByRole('textbox', { name: 'Name on Card' }).fill('Monika')
await page.getByRole('textbox', { name: 'Card Number' }).fill('2323 2323 2321 2123')
await page.getByRole('textbox', { name: 'Expiry (MM/YY)' }).fill('12/32')
await page.getByRole('textbox', { name: 'CVC' }).fill('123')
await page.getByRole('button', { name: 'Place Order' }).click()
const orderID=await page.getByText('Your Order ID is:').locator('..').getByRole('paragraph').nth(1).textContent()
await page.getByRole('button',{name:'Track Your Order'}).click()
await page.locator('[data-test-id="contact-order-id-input"]').fill(orderID!)
await page.locator('[data-test-id="contact-email-input"]').fill('monika@gmail.com')
await page.locator('[data-test-id="contact-track-order-button"]').click()

})
