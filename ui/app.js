const nextButton = document.getElementById("next")
const downloadButton = document.getElementById("download")
nextButton.style.display = "none"
downloadButton.style.display = "none"
let i = 0;
let rawCount = 0;
var table = document.getElementById("table");


const callLlmMFirstTime = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/llmreq', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const compareButton = document.getElementById("compare")
            compareButton.style.display = "none"
            nextButton.style.display = "block"
            var response = JSON.parse(xhr.responseText);
            console.log(response);
            rawCount = response.totalChanges;
            i++;
        } else {
            console.error('Error: ' + xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Network error');
    };
    const payload = JSON.stringify({
        data: "",
        i: 0
    });
    xhr.send(payload);
}

const callLlmMNextTime = () => {
    if (i <= rawCount) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/llmreq', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                i++;
                var newRow = table.insertRow();
                // Create new cells in the row
                var cell1 = newRow.insertCell(0);
                var cell2 = newRow.insertCell(1);

                // Set the text content of the cells with dummy data
                cell1.textContent = "Dummy Data 1";
                cell2.textContent = "Dummy Data 2";
            } else {
                console.error('Error: ' + xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.error('Network error');
        };
        // Prepare the payload data
        const payload = JSON.stringify({
            data: "",
            i
        });
        xhr.send(payload);
    }else{
        nextButton.style.display = "none";
        downloadButton.style.display = "block";
    }
}
