import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

async function testLogin() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://localhost:5173/login');

    await driver.wait(until.elementLocated(By.css('input[type="text"]')), 5000);

    // Usuario (type="text")
    await driver.findElement(By.css('input[type="text"]')).sendKeys('admin');
    
    // Contraseña
    await driver.findElement(By.css('input[type="password"]')).sendKeys('123456');

    // Botón submit
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log('✅ Test de login exitoso');
  } catch (error) {
    console.error('❌ Test falló:', error);
  } finally {
    await driver.quit();
  }
}

testLogin();