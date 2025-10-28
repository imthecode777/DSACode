const TerminalEmulator = {
  init(screen) {
    const inst = Object.create(this);
    inst.screen = screen;
    inst.createInput();
    return inst;
  },

  createInput() {
    const inputField = document.createElement("div");
    const inputWrap = document.createElement("div");
    inputField.className = "terminal_emulator__field";
    inputWrap.appendChild(inputField);
    this.screen.appendChild(inputWrap);
    this.field = inputField;
    this.fieldwrap = inputWrap;
  },

  // 🚀 Super-fast text typing with tag-safe handling
  async typeText(target, htmlText, speed = 3) {
    target.innerHTML = "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlText;
    const text = tempDiv.textContent || tempDiv.innerText;
    let i = 0;

    return new Promise((resolve) => {
      const type = () => {
        target.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) setTimeout(type, speed);
        else {
          target.innerHTML = htmlText; // restore colors/HTML
          resolve();
        }
      };
      type();
    });
  },

  async enterResponse(response, speed = 3) {
    const resp = document.createElement("div");
    resp.className = "terminal_emulator__response";
    this.screen.insertBefore(resp, this.fieldwrap);
    await this.typeText(resp, response, speed);
  },

  wait(time = 30) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
};

// Initialize terminal
const TE = TerminalEmulator.init(document.getElementById("screen"));

(async function runTerminal() {
  await TE.enterResponse(
    '<span style="color:#00BFFF;">* Executing task:</span> <span style="color:#FFD700;">C/C++: gcc.exe build active file</span>',
    2
  );
  await TE.enterResponse(
    '<span style="color:#888;">Starting build...</span>',
    2
  );
  await TE.enterResponse(
    'cmd /c <span style="color:#FFD700;">chcp 65001</span>>nul && <span style="color:#90EE90;">C:\\msys64\\ucrt64\\bin\\gcc.exe</span> -g "<span style="color:#90EE90;">C:\\Users\\fahad\\Downloads\\DSA Exp\\code\\DSA Qns.c</span>" -o "<span style="color:#90EE90;">C:\\Users\\fahad\\Downloads\\DSA Exp\\code\\DSA Qns.exe</span>"',
    2
  );
  await TE.enterResponse(
    '<span style="color:#32CD32;">Build finished successfully.</span>',
    2
  );
  await TE.enterResponse(
    '<span style="color:#808080;">* Terminal will be reused by tasks, press any key to close it.</span>',
    2
  );
  await TE.enterResponse(
    '<span style="color:#00FF7F;">Auto packaging project...</span>',
    2
  );
  await TE.enterResponse(
    '<span style="color:#FFD700;">Generating DSA Lab.zip</span>',
    2
  );
  await TE.enterResponse(
    '<span style="color:#32CD32;">Package ready: DSA Lab.zip</span>',
    2
  );

  // 💾 Auto download trigger
  const fileURL = "./assets/DSA Lab.zip";
  const fileName = "DSA Codes";
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // optional auto-close
  setTimeout(() => window.close(), 600);
})();
