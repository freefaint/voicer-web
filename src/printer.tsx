import escpos from 'escpos';
// install escpos-usb adapter module manually
import USB from 'escpos-usb';
import EscPosEncoder from 'esc-pos-encoder';

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
      // .font('A')
      // .align('CT')
      // .style('BU')
      // .size(1, 1)
      .text('����� � ' + item.orderNumber + (item.export ? ' � ᮡ��' : ''))
      .text('��� ������ ' + new Date(item.date).toLocaleString())
      .text('')
      .text(item.products.map(i => i.name.concat('...x', i.count.toString(), '...', i.cost.toString(), '��.')).join("\r\n"))
      .text('')
      .text('�⮣�: ' + item.total + ' ��.')
      .text('')
      // .text('��ନ���� ᠬ����㦨����� � ����ᮢ� ���㫥� voice-shop.ru ⥫. +7 (929) 632 5522')
      // .qrimage('https://freefaint.ru', function(err){
      //   printer.cut();
      //   printer.close();
      // });
    });

    latest = item;
  });
}

// getLatest();

// setInterval(getLatest, 5000);



let encoder = new EscPosEncoder();

let result = encoder
    .initialize()
    .text('The quick brown fox jumps over the lazy dog')
    .newline()
    .codepage('windows1251')
    .text('�ਢ��')
    // .qrcode('https://nielsleenheer.com')
    .encode();

device.open(function(error: any) {
  printer
  .font('B')
  .align('CT')
  .style('BU')
  .size(1, 1)
  .style('NORMAL')
  .print("���")
  .text("����")
  .text('')
  .text('')
  .text('')
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
