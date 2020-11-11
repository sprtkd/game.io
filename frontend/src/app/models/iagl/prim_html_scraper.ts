import axios from 'axios';

axios.defaults.headers.get['User-Agent']
    = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36";
axios.defaults.headers.get['Origin'] = "*";

const CORS_PRE_URL = "https://cors-anywhere.herokuapp.com/";

export async function getItemFromUrl(url: string, tokens: string[]) {
    let html = await axios.get(CORS_PRE_URL + url);
    let body = html?.data
    return splitAndJoin(body, tokens);
}

function splitAndJoin(html: string, tokens: string[]) {
    let list1: string[];
    for (let token of tokens) {
        list1 = html.split(token)
        if (token != tokens[tokens.length - 1]) {
            list1.shift();
            html = list1.join();
        }
    }
    return list1.shift();
}