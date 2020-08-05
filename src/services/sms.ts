import { get } from "https";

const login = 'z1584254860424';
const pass = '545735';

export const sendSMS = (phone: string, text: string) => {
  const url = 'https://api.iqsms.ru/messages/v2/send/?login=' + login + '&password=' + pass + '&phone=%2B79153868840&text=' + text;
  //const url = 'https://api.iqsms.ru/messages/v2/send/?login=' + login + '&password=' + pass + '&phone=%2B' + phone + '&text=' + text + '&sender=PFStore';

  console.log(url);
  try {
    get(url, res => {
      console.log(1, res)
    });
  } catch (e) {
    console.log(2, e)
  }
}