const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    const genAI = new GoogleGenerativeAI("AIzaSyBLjLJG9tuACWBAqK7tQehRt1RnjzCVSeo");

    const models = ["gemini-1.5-flash", "gemini-flash-latest", "gemini-2.0-flash-exp"];

    for (const m of models) {
        console.log(`Testing ${m}...`);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hello");
            const response = await result.response;
            console.log(`SUCCESS: ${m} responded: ${response.text()}`);
            break;
        } catch (e) {
            console.log(`FAILED: ${m} - ${e.message.split('\n')[0]}`);
        }
    }
}

test();
