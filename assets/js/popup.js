import { parse } from "./h.js";

document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrap.sigaa" }, (response) => {
            let payload = response?.payload;
            if (payload) {

                console.log("Payload:", payload)

                let data = payload.map(data => {
                    data.schedules = data.schedules.map(schedule => parse(schedule));
                    return data;
                })

                console.log("Data:", data)
            }
        });
    });
});