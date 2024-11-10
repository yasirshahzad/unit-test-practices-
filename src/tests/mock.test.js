import {
  vi,
  it,
  expect,
  describe,
  beforeAll,
  beforeEach,
  afterEach,
} from 'vitest'
import {
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from '../mocking'
import { getExchangeRate } from '../libs/currency'
import { getShippingQuote } from '../libs/shipping'
import { trackPageView } from '../libs/analytics'
import { charge } from '../libs/payment'
import { sendEmail } from '../libs/email'
import security from '../libs/security'

// mocking whole module
vi.mock('../libs/currency.js')
vi.mock('../libs/shipping.js')
vi.mock('../libs/analytics.js')
vi.mock('../libs/payment.js')

// partial module mocking
vi.mock('../libs/email.js', async (original) => {
  const originalModuleFuncs = await original()

  const mockedModule = {
    ...originalModuleFuncs,
    sendEmail: vi.fn(),
  }

  return mockedModule
})

describe('testing mocking', () => {
  it('should return ok', () => {
    // Create a mock for the following function
    const sendText = vi.fn()

    // sendText(message) { }
    sendText.mockReturnValue('ok')

    // Call the mock function
    const result = sendText('message')

    // Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith('message')

    // Assert that the result is ok
    expect(result).toBe('ok')
  })
})

describe('getPriceInCurrency', () => {
  it('should return the currency rate', () => {
    // Create a mock for the getExchangeRate function
    vi.mocked(getExchangeRate).mockReturnValue(2)

    const result = getPriceInCurrency(100, 'USD')

    expect(result).toBe(200)
  })
})

describe('getShippingInfo', () => {
  it('should return shipping unavailable when quote is null', () => {
    // Create a mock for the getShippingQuote function
    vi.mocked(getShippingQuote).mockReturnValue(null)

    const result = getShippingInfo('New York')

    expect(result).toMatch(/Shipping Unavailable/i)
  })

  it('should return shipping when quote is available', () => {
    // Create a mock for the getShippingQuote function
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 })

    const result = getShippingInfo('New York')

    // output: Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)
    expect(result).toMatch(/Shipping Cost: \$10 \(2 Days\)/i)
  })
})

// interaction testing, either function is called or not.
describe('renderPage', () => {
  it('should return the content', async () => {
    const results = await renderPage()

    expect(results).match(/content/i)
  })

  it('should call the analytics', async () => {
    await renderPage()

    expect(trackPageView).toHaveBeenCalledWith('/home')
  })
})

describe('submitOrder', () => {
  it('should return success', async () => {
    vi.mocked(charge).mockReturnValue({ status: 'success' })

    const results = await submitOrder(
      { totalAmount: 100 },
      { creditCardNumber: '1234' },
    )

    console.log('results', results)

    expect(results.success).toBe(true)
  })

  it('should return error', async () => {
    vi.mocked(charge).mockReturnValue({ status: 'failed' })

    const results = await submitOrder(
      { totalAmount: 100 },
      { creditCardNumber: '1234' },
    )

    expect(results).toEqual({ success: false, error: 'payment_error' })
  })

  it('should call charge function', async () => {
    await submitOrder({ totalAmount: 100 }, { creditCardNumber: '1234' })

    expect(charge).toHaveBeenCalledWith({ creditCardNumber: '1234' }, 100)
  })
})

describe('signup', () => {
  it('should return false when email is not valid.', async () => {
    const results = await signUp('a')
    expect(results).toBe(false)
  })

  it('should return true when email is valid.', async () => {
    const results = await signUp('a@b.com')
    expect(results).toBe(true)
  })

  it('should call sendEmail', async () => {
    await signUp('a@b.com')
    expect(sendEmail).toHaveBeenCalledWith('a@b.com', 'Welcome aboard!')
  })
})

describe('login', () => {
  it('send email with one time code', async () => {
    const email = 'a@b.com'

    const spy = vi.spyOn(security, 'generateCode')
    await login(email)

    console.log(spy.mock.results[0].value)

    expect(sendEmail).toHaveBeenCalledWith(
      email,
      spy.mock.results[0].value.toString(),
    )
  })
})

// * Remember
// Use mocks for mocking external dependencies, services, db etc
// Use spies for mocking internal functions

describe('isOnline', () => {
  it('should return true when online', () => {
    vi.setSystemTime('2024-11-10 08:00')
    expect(isOnline()).toBe(true)
  })

  it('should return false when time outside business hours', () => {
    vi.setSystemTime('2024-11-10 05:01')
    expect(isOnline()).toBe(false)
  })
})
