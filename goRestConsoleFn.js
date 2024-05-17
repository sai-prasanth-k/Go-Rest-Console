let consoleFormEl = document.getElementById("consoleForm");
let requestUrlEl = document.getElementById("requestUrl");
let responseStatusEl = document.getElementById("responseStatus");
let responseBodyEl = document.getElementById("responseBody");
let requestUrlErrMsgEl = document.getElementById("requestUrlErrMsg");
let requestMethodEl =  document.getElementById("requestMethod");
let requestBodyEl = document.getElementById("requestBody");

let formData = {
    requestUrl: "https://gorest.co.in/public-api/users",
    requestMethod: "POST",
    requestBody: ""
};

requestUrlEl.addEventListener("change", function(event){
    formData.requestUrl = event.target.value;
});

requestMethodEl.addEventListener("change",function(event){
    formData.requestMethod = event.target.value;
});

requestBodyEl.addEventListener("change", function(event){
    formData.requestBody = event.target.value;
});

function validateRequestUrl(formData){
    let {requestUrl} = formData;
    if (requestUrl === ""){
        requestUrlErrMsgEl.textContent = "Required*";
    }else {
        requestUrlErrMsgEl.textContent = "";
    }
}

function sendRequest(formData){
    let {requestUrl, requestMethod, requestBody} = formData;
    let options = {
        method: requestMethod,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer 785c41f5e1793fa127af128e561d8e24f62d18c66ee486599cf1c2c50b920534"
        },
        body: requestBody
    };
    fetch(requestUrl, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let responseCode = jsonData.code;
            let responseBody = JSON.stringify(jsonData);
            responseStatusEl.value = responseCode;
            responseBodyEl.value = responseBody;
        });
    
}

consoleFormEl.addEventListener("submit", function(event){
    event.preventDefault();
    validateRequestUrl(formData);
    sendRequest(formData);
});