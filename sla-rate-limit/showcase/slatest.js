import { run } from "apipecker";
import jwt from "jsonwebtoken";

function myUrlBuilder(){
    return "http://localhost:8080/api/v1/teams";
}

function myRequestBuilder(){
    const token = jwt.sign({plan: "base"}, process.env.JWT_SECRET, {issuer: process.env.JWT_ISSUER});
    
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
    console.log(JSON.stringify(results.lotStats?.flatMap(o => o.result.stats.map(s => `${o.id}-${s.id}-${s.statusCode}`)), null, 2));
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