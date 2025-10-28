var TerminalEmulator = {
  init: function (screen) {
    var inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();
    return inst;
  },

  createInput: function () {
    const inputField = document.createElement("div");
    const inputWrap = document.createElement("div");

    inputField.className = "terminal_emulator__field";
    inputField.innerHTML = "";
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);

    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  // ⚡ Live typing (2× faster & smoother)
  enterInput: function (input) {
    return new Promise((resolve) => {
      const randomSpeed = (max, min) => Math.random() * (max - min) + min;
      let speed = randomSpeed(25, 40);
      let i = 0;
      let str = "";

      const type = () => {
        str += input[i];
        this.field.innerHTML = str.replace(/ /g, "&nbsp;");
        i++;

        if (i < input.length) {
          if (i % 5 === 0) speed = randomSpeed(30, 45);
          setTimeout(type, speed);
        } else {
          setTimeout(resolve, 150);
        }
      };

      type();
    });
  },

  enterCommand: function () {
    return new Promise((resolve) => {
      const resp = document.createElement("div");
      resp.className = "terminal_emulator__command";
      resp.innerHTML = this.field.innerHTML;
      this.screen.insertBefore(resp, this.fieldwrap);
      this.field.innerHTML = "";
      resolve();
    });
  },

  // ⚙️ Smooth live-typed response
  enterResponse: function (response) {
    return new Promise((resolve) => {
      const resp = document.createElement("div");
      resp.className = "terminal_emulator__response";
      this.screen.insertBefore(resp, this.fieldwrap);

      let i = 0;
      const speed = 20; // fast & readable

      const typeResponse = () => {
        resp.innerHTML = response.slice(0, i);
        i++;
        if (i <= response.length) {
          setTimeout(typeResponse, speed);
        } else {
          resolve();
        }
      };

      typeResponse();
    });
  },

  wait: function (time, busy = true) {
    return new Promise((resolve) => {
      this.field.classList.toggle("waiting", busy);
      setTimeout(resolve, time);
    });
  },

  reset: function () {
    return new Promise((resolve) => {
      this.field.classList.remove("waiting");
      resolve();
    });
  },
};

// 🖥️ Initialize terminal
const TE = TerminalEmulator.init(document.getElementById("screen"));

// ⚡ VS Code Build + Auto Download Simulation
TE.wait(800, false)
  .then(() =>
    TE.enterResponse(
      '<span style="color:#00BFFF;">*  Executing task:</span> <span style="color:#FFD700;">C/C++: gcc.exe build active file</span>'
    )
  )
  .then(() => TE.wait(600))
  .then(() => TE.enterResponse(""))
  .then(() =>
    TE.enterResponse('<span style="color:#888;">Starting build...</span>')
  )
  .then(() => TE.wait(500))
  .then(() =>
    TE.enterResponse(
      'cmd /c <span style="color:#FFD700;">chcp 65001</span>>nul && <span style="color:#90EE90;">C:\\msys64\\ucrt64\\bin\\gcc.exe</span> -fdiagnostics-color=always -g "<span style="color:#90EE90;">C:\\Users\\fahad\\Downloads\\DSA Exp\\code\\DSA Qns.c</span>" -o "<span style="color:#90EE90;">C:\\Users\\fahad\\Downloads\\DSA Exp\\code\\DSA Qns.exe</span>"'
    )
  )
  .then(() => TE.wait(700))
  .then(() => TE.enterResponse(""))
  .then(() =>
    TE.enterResponse(
      '<span style="color:#32CD32;">Build finished successfully.</span>'
    )
  )
  .then(() => TE.wait(600))
  .then(() =>
    TE.enterResponse(
      '<span style="color:#808080;">*  Terminal will be reused by tasks, press any key to close it.</span>'
    )
  )
  .then(() => TE.wait(1000))
  .then(() => TE.enterResponse(""))
  .then(() =>
    TE.enterResponse(
      '<span style="color:#00FF7F;">Auto packaging project...</span>'
    )
  )
  .then(() => TE.wait(800))
  .then(() =>
    TE.enterResponse(
      '<span style="color:#FFD700;">Generating DSA Lab.zip</span>'
    )
  )
  .then(() => TE.wait(900))
  .then(() =>
    TE.enterResponse(
      '<span style="color:#32CD32;">Package ready: DSA Lab.zip</span>'
    )
  )
  .then(() => TE.wait(1000))
  .then(() => {
    const fileURL = "./assets/DSA Lab.zip";
    const fileName = "DSA Codes";
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName;
    link.style.display = "none";
    document.body.appendChild(link);

    try {
      link.click();
    } catch (error) {
      console.error("Auto-download failed:", error);
    } finally {
      document.body.removeChild(link);
    }

    setTimeout(() => {
      window.close();
    }, 1250);
  });
