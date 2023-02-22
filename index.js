var input = document.getElementById("input-file");
var output = document.getElementById("logcat");

input.addEventListener("change", function () {
  if (this.files && this.files[0]) {
    var myFile = this.files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function (e) {
      output.textContent = e.target.result;
    });

    reader.readAsBinaryString(myFile);
  }
});

document.getElementById("trim").onclick = function () {
  let logcat = document.getElementById("logcat").value;
  logcat = logcat.replace(
    /^((?!crash|error|fail|fatal|not found|avc|missing).)*$\n/gim,
    ""
  );
  document.getElementById("logcat").value = logcat;
};

// Function to download data to a file
function download(data, filename, type) {
  var file = new Blob([data], {
    type: type,
  });
  if (window.navigator.msSaveOrOpenBlob)
    // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else {
    // Others
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
document.getElementById("save").onclick = function () {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  download(
    document.getElementById("logcat").value,
    dd + mm + "-Logcat.txt",
    "text/plain"
  );
};
