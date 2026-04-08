const responseArea = document.getElementById("responseArea");
const instanceId = document.getElementById("idInstance");
const apiToken = document.getElementById("apiToken");

const BASE_URL = "https://1105.api.green-api.com";

async function request(method, path, body) {
  try {
    var opts = { method };
    if (body) {
      opts.headers = { "Content-Type": "application/json" };
      opts.body = JSON.stringify(body);
    }
    var res = await fetch(BASE_URL + path, opts);
    var data = await res.json();
    responseArea.value = JSON.stringify(data, null, 2);
  } catch (err) {
    responseArea.value = err.message;
  }
}

document.getElementById("getSettingsBtn").addEventListener("click", function() {
  request("GET", `/waInstance${instanceId.value}/getSettings/${apiToken.value}`);
});

document.getElementById("getStateBtn").addEventListener("click", function() {
  request("GET", `/waInstance${instanceId.value}/getStateInstance/${apiToken.value}`);
});

document.getElementById("sendMessageBtn").addEventListener("click", function() {
  var phone = document.getElementById("sendPhone").value;
  var message = document.getElementById("messageText").value;
  request("POST", `/waInstance${instanceId.value}/sendMessage/${apiToken.value}`, {
    chatId: phone + "@c.us",
    message
  });
});

document.getElementById("sendFileBtn").addEventListener("click", function() {
  var phone = document.getElementById("filePhone").value;
  var url = document.getElementById("fileUrl").value;
  request("POST", `/waInstance${instanceId.value}/sendFileByUrl/${apiToken.value}`, {
    chatId: phone + "@c.us",
    urlFile: url,
    fileName: "file"
  });
});
