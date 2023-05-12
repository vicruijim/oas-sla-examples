import { run } from "apipecker";
import jwt from "jsonwebtoken";

function myUrlBuilder(){
    return "http://localhost:8080/api/v1/phones";
}

function myRequestBuilder(user){
    const token = jwt.sign({plan: "base", apikey: user}, process.env.JWT_SECRET, {issuer: process.env.JWT_ISSUER});
    
    return {
        options : {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        }
    }
}

function myResultsHandler(results){
    console.log("Test result:");
    console.log(JSON.stringify(results.summary, null, 2));
    console.log(JSON.stringify(results.lotStats?.flatMap(o => o.result.stats.map(s => `Iteration: ${o.id} - User: ${s.id} => Response Status: ${s.statusCode}`)), null, 2));

}

run({
    concurrentUsers : 1,
    iterations : 21,
    delay : 20,
    verbose : true,
    urlBuilder: myUrlBuilder,
    requestBuilder : myRequestBuilder,
    resultsHandler : myResultsHandler
});