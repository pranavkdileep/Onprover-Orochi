import puppeteer from "puppeteer";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
let proofNumber = 0;
let onearnedg = 0;
let running = false;

app.get('/', (req, res) => {
    res.send(`Proof Number: ${proofNumber}, On Earned: ${onearnedg}`);
});


const startBrowser = async (accessToken) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-web-security',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });
    try {
        const page = await browser.newPage();
        await browser.setCookie({
            name: 'accessToken',
            value: accessToken,
            domain: 'onprover.orochi.network',
        })
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.goto('https://onprover.orochi.network/', { waitUntil: 'networkidle2' });
        console.log("page loaded button clicking")
        await new Promise(resolve => setTimeout(resolve, 3000));
        const buttonselector = 'xpath=//*[@id="root"]/div/div/div/main/div/div/div[1]/div[1]/div[2]/button'
        await page.waitForSelector(buttonselector);
        await page.click(buttonselector);
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log("button clicked, waiting for 5 seconds")
        const proofnumbertext = 'xpath=//*[@id="root"]/div/div/div/main/div/div/div[1]/div[1]/div[2]/div/div[3]/p[1]'
        
        let round = 0;
        const maxRounds = 300;
        let startTime = Date.now();
        while (round < maxRounds) {
            //await page.waitForSelector(proofnumbertext);
            const proofNumberText = await page.$eval(proofnumbertext, el => el.textContent);
            const onearned = await page.$eval('xpath=//*[@id="root"]/div/div/div/main/div/div/div[1]/div[1]/div[2]/div/div[1]/p[1]/span[1]', el => el.textContent);
            onearnedg = onearned;
            const loggingTimeutc = new Date().toISOString();
            console.log(`Proof Number: ${proofNumberText}, On Earned: ${onearned}, Logging Time (UTC): ${loggingTimeutc}`);
            proofNumber = parseInt(proofNumberText);
            if (proofNumber === 14) {
                let temp = 14;
                while (true) {
                    const ttt = await page.$eval(proofnumbertext, el => el.textContent);
                    console.log("waiting poofnumber to be zero")
                    temp = parseInt(ttt);
                    if (temp === 0) {
                        console.log("Proof number is zero, breaking the loop");
                        break;
                    }
                }
                round++;
                const elapsedTime = Date.now() - startTime;
                console.log(`Round ${round} completed in ${elapsedTime / 1000} seconds`);
                startTime = Date.now();
            }
            //await new Promise(resolve => setTimeout(resolve, 150));
        }
    } catch (error) {
        console.error('Error during Puppeteer operations:', error);
    }
    finally {
        await browser.close();
    }
    console.log("Browser closed");

}

const main = async () => {
    while(true){
        try {
            const accessToken = process.env.ON_PROVER_ACCESS_TOKEN;
            if (!accessToken) {
                console.error('Access token is not set in environment variables.');
                process.exit(1);
            }
            await startBrowser(accessToken);
            await new Promise(resolve => setTimeout(resolve, 60000));
        } catch (error) {
            console.error('Error starting browser:', error);
        }
    }
}

app.get('/start', async (req, res) => {
    if (running) {
        return res.status(400).send('Browser is already running');
    }
    running = true;
    console.log("Starting browser...");
    main().catch(error => {
        console.error('Error in main function:', error);
        running = false;
    });
    res.send('Browser started and running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});