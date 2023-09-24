import { Injectable, Logger } from '@nestjs/common';
import { Builder,By} from "selenium-webdriver";
import {Options} from 'selenium-webdriver/chrome.js';
import { pino } from 'pino';

// const fileTransport = pino.transport({
//     target: 'pino/file',
//     options: { destination: `${__dirname}/app.log` },
//   });

// const logger = pino({
//     timestamp: pino.stdTimeFunctions.isoTime,
//     formatters: {
//         level: (label) => {
//           return { level: label.toUpperCase() };
//         }
//     },
    
// },fileTransport)

@Injectable()
export class PriceMoneroToMirService {
    price: { amount: number; time: number; };

      private readonly logger = new Logger(PriceMoneroToMirService.name);

    constructor(){
        
        this.price={
            amount:14000,
            time:+new Date
        }
    }
    async getPrice(){

        // logger.info('getPrice')

        if((+new Date) - this.price.time < 30000){
            return this.price.amount
        }
        
        let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions((new Options).addArguments('--headless=new'))
        .build();

        await driver.get('https://www.bestchange.ru/monero-to-mir.html');
        
        let priceXmr = await driver.findElement(By.xpath("//span[@title='Средний арифметический взвешенный курс']/span")).getText()

        await driver.quit()

        this.price.amount=priceXmr.replace(' ','');
        this.price.time= +new Date;
        this.logger.log('new price '+priceXmr.replace(' ',''));
        return priceXmr.replace(' ','');
    }
}
