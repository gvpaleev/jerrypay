import { Builder,By} from "selenium-webdriver";
import {Options} from 'selenium-webdriver/chrome.js';
// const options = chrome.Options

(async ()=>{
    
    let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions((new Options).addArguments('--headless=new'))
    .build();



    await driver.get('https://www.bestchange.ru/monero-to-mir.html');
    

    // let pricesXmr = await driver.findElements(By.xpath("//div[@id='rates_block']/table/tbody/tr/td[4]"));//.getAttribute('innerHTML');
    
    // pricesXmr = await Promise.all(
    //     pricesXmr.map(elem=>elem.getAttribute('innerHTML'))
    // )

    // pricesXmr =  pricesXmr.map(
    //     elem=>Number((elem.split(' <small')[0]).replace(' ',''))
    // )
 
    let priceXmr = await driver.findElement(By.xpath("//span[@title='Средний арифметический взвешенный курс']/span")).getText()

    priceXmr = priceXmr.replace(' ','');
    console.log(priceXmr)
    await driver.quit()
})()