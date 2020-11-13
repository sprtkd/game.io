import { getItemFromUrl } from "../api/prim_html_scraper";

var lastpush = 0;
export function randomSystemImageUrl() {
    let urls = ["https://images.unsplash.com/photo-1580327332925-a10e6cb11baa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=351&q=80",
        "https://images.unsplash.com/photo-1531390658120-e06b58d826ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80",
        "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.pexels.com/photos/4511372/pexels-photo-4511372.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        "https://images.unsplash.com/photo-1585424249632-f4d52f602ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
        "https://images.unsplash.com/photo-1554213352-5ffe6534af08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    ];
    let random: number;
    do {
        random = Math.floor(Math.random() * urls.length);
    } while (lastpush == random);
    lastpush = random;
    return urls[random];
}


const DEFAULT_URL_GAME = "https://cdn.pixabay.com/photo/2017/06/10/07/15/game-2389215_960_720.png";
async function getGiantBombArt(baseurl: string) {
    if (!baseurl) {
        return undefined;
    }
    let tokens = ["wiki-boxart imgboxart", 'img src="', '"/>'];
    try {
        return await getItemFromUrl(baseurl, tokens);
    } catch (error) {
        return undefined;
    }
}

export async function resolveGameBoxArt(giantBombUrl: string, thegamesdbId: string, mobygamesUrl: string) {
    return await getGiantBombArt(giantBombUrl);
}
