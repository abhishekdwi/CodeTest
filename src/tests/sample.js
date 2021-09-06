const chromeDriver = require("../drivers/chrome");

const getElementById = async (driver, id, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 2000) => {
  const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};


describe("Aura Code Challenge - Create User Account Tests", () => {
  let driver;
  beforeAll(() => {
    driver = chromeDriver();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("it loads authentication page", async () => {
    await driver.get(
      "http://automationpractice.com/index.php?controller=authentication&back=my-account"
    );
    const title = await driver.getTitle();
    expect(title).toBe("Login - My Store");
  });

  test("it verify the error messgae for empty emailaddress on authentication page", async () => {
    const btnCreateAnAccount = await getElementById(driver,'SubmitCreate')
    await btnCreateAnAccount.click();
    const errorMessgae = await getElementById(driver,'create_account_error')
    expect(errorMessgae).toBe("Invalid email address.");
  });

  
});
