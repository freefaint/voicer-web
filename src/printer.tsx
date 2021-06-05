import escpos from 'escpos';
// install escpos-usb adapter module manually
import USB from 'escpos-usb';

import * as OrderService from './rest/order';
import { Order } from './types/order';
// Select the adapter based on your printer type
const device  = new USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = { encoding: "cp866" /* default */ }
// const options = { encoding: "windows1251" /* default */ }
// encoding is optional

const printer = new escpos.Printer(device, options);

let latest: Order | null = null;

const getLatest = () => {
  OrderService.getLatest().then(item => {
    if (item._id === latest?._id) {
      return;
    }

    device.open(function(error: any) {
      printer
        .font('B')
        .align('CT')
        .style('NORMAL')
        .size(1, 1)
        .barcode(item.orderNumber.toString(), 'EAN8')
        .text('')
        .text('Заказ № ' + item.orderNumber + (item.export ? ' с собой' : ''))
        .text('Дата ' + new Date(item.date).toLocaleString())
        .text('');

      item.products.forEach(i => {
        printer
          .text(item.products.map(i => i.name.concat('...x', i.count.toString(), '...', i.cost.toString(), 'руб.')).join("\r\n"))
          .tableCustom({ text: i.name, align:"LEFT", width: 0.33 })
          .tableCustom({ text: 'x' + i.count, align:"RIGHT", width: 0.33 })
          .tableCustom({ text: i.cost.toString(), align:"RIGHT", width: 0.33 })
      });
      
      printer
        .text('')
        .text('Итого: ' + item.total + ' руб.')
        .text('')
        .text('Терминалы самообслуживания с голосовым модулем voice-shop.ru тел. +7 (929) 632 5522')
        .qrimage('https://freefaint.ru', err => {
          printer.cut();
          printer.close();
        })
    });

    latest = item;
  });
}

getLatest();

setInterval(getLatest, 5000);

device.open(function(error: any) {
  printer
  .font('B')
  .align('CT')
  .style('BU')
  .size(1, 1)
  .style('NORMAL')
  // .encode("cp866")
  .text("Привет")
  .text('')
  .text('')
  .text('')
  // .encode('cp866')
  .cut()
  .close()
  // .barcode('1234567', 'EAN8')
  // .table(["One", "Two", "Three"])
  // .tableCustom([
  //   { text:"Left", align:"LEFT", width:0.33 },
  //   { text:"Center", align:"CENTER", width:0.33},
  //   { text:"Right", align:"RIGHT", width:0.33 }
  // ])
  // .qrimage('https://github.com/song940/node-escpos', function(err){
  //   printer.cut();
  //   printer.close();
  // });
});
