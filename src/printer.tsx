import escpos from 'escpos';
// install escpos-usb adapter module manually
import USB from 'escpos-usb';
import * as OrderService from './rest/order';
import { Order } from './types/order';
// Select the adapter based on your printer type
const device  = new USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = { encoding: "GB18030" /* default */ }
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
      .font('A')
      .align('CT')
      .style('BU')
      .size(1, 1)
      .text('Заказ № ' + item.orderNumber + (item.export ? ' с собой' : ''))
      .text('Дата заказа ' + new Date(item.date).toLocaleString())
      .text('')
      .text(item.products.map(i => i.name.concat('...x', i.count.toString(), '...', i.cost.toString(), 'руб.')).join("\r\n"))
      .text('')
      .text('Итого: ' + item.total + ' руб.')
      .text('')
      .text('Терминалы самообслуживания с голосовым модулем voice-shop.ru тел. +7 (929) 632 5522')
      // .barcode('1234567', 'EAN8')
      // .table(["One", "Two", "Three"])
      // .tableCustom([
      //   { text:"Left", align:"LEFT", width:0.33 },
      //   { text:"Center", align:"CENTER", width:0.33},
      //   { text:"Right", align:"RIGHT", width:0.33 }
      // ])
      .qrimage('https://freefaint.ru', function(err){
        printer.cut();
        printer.close();
      });
    });

    latest = item;
  });
}

getLatest();

setInterval(getLatest, 5000);



// device.open(function(error: any) {
//   printer
//   .font('A')
//   .align('CT')
//   .style('BU')
//   .size(1, 1)
//   .text('The quick brown fox jumps over the lazy dog')
//   .text('hello')
//   .barcode('1234567', 'EAN8')
//   .table(["One", "Two", "Three"])
//   // .tableCustom([
//   //   { text:"Left", align:"LEFT", width:0.33 },
//   //   { text:"Center", align:"CENTER", width:0.33},
//   //   { text:"Right", align:"RIGHT", width:0.33 }
//   // ])
//   .qrimage('https://github.com/song940/node-escpos', function(err){
//     printer.cut();
//     printer.close();
//   });
// });



