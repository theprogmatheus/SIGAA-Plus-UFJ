import { parse } from "./h.js";

document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrap.sigaa" }, (response) => {
            if (chrome.runtime.lastError)
                return;
            
            let payload = response?.payload;
            if (payload) {

                console.log("Payload:", payload)

                let data = payload.map(data => {
                    data.schedules = data.schedules.map(schedule => parse(schedule));
                    return data;
                })

                render(data);

                console.log("Data:", data)
            }
        });
    });
});

function render(data) {
    if (data) {
        let contentDiv = document.getElementById("content");
        data.forEach(element => {

            let rowDiv = document.createElement("div");
            rowDiv.className = "row";

            let nameDiv = document.createElement("div");
            nameDiv.className = "name";

            let locationDiv = document.createElement("div");
            locationDiv.className = "location";

            let scheduleDiv = document.createElement("div");
            scheduleDiv.className = "schedule"

            let nameSpan = document.createElement("span");
            nameSpan.innerText = element.name;

            let locationSpan = document.createElement("span");
            locationSpan.innerText = element.location;

            let scheduleSpans = element.schedules.map(schedule => {
                let scheduleSpan = document.createElement("span");
                scheduleSpan.innerText = schedule;
                return scheduleSpan;
            });


            nameDiv.appendChild(nameSpan);
            locationDiv.appendChild(locationSpan);
            scheduleSpans.forEach(element => {
                scheduleDiv.appendChild(element);
            });


            rowDiv.appendChild(nameDiv);
            rowDiv.appendChild(locationDiv);
            rowDiv.appendChild(scheduleDiv);


            contentDiv.appendChild(rowDiv);

        });

        let noSigaaP = document.getElementById("no-sigaa");
        if (noSigaaP)
            noSigaaP.remove();
    }
}
