// ==UserScript==
// @name         TapswapAutoTaskClaimerClaimer
// @namespace    https://github.com/sizifart/
// @version      1.1
// @description  Auto Claim Tasks TapSwapBot
// @author       FoadDavoodi
// @match        https://app.tapswap.club/*
// @icon         https://i.postimg.cc/7LJ24T7F/tapsw-aplogo.png
// @grant        GM_webRequest
// @downloadURL  https://raw.githubusercontent.com/rahanesh/TapswapAutoTaskClaimer/main/tapswapautotaskclaim2.js
// @updateURL    https://raw.githubusercontent.com/rahanesh/TapswapAutoTaskClaimer/main/tapswapautotaskclaim2.js
// @homepage     https://github.com/rahanesh/TapswapAutoTaskClaimer/
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==
(function () {
  function onready(fn) {
    if (document.readyState != "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  
  // Add pause/play functionality
  let paused = false;
  function togglePause() {
    paused = !paused;
    if (paused) {
      console.log('%c[TapSwapBot] Paused', 'background: #ffc107; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
    } else {
      console.log('%c[TapSwapBot] Resumed', 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
    }
  }

  onready(function () {
    const styles = {
      success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
      info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    };
    
    const logPrefix = '%c[TapSwapBot] ';
    const originalLog = console.log;
    console.log = function () {
      if (typeof arguments[0] === 'string' && arguments[0].includes('[TapSwapBot]')) {
        originalLog.apply(console, arguments);
      }
    };
    console.error = console.warn = console.info = console.debug = () => { };
    
    let listnumber = 0;
    var $ = window.jQuery;
    var fullurl = window.location.hash;
    var username = fullurl.split("%2522%252C%2522language_code")[0].split("username%2522%253A%2522")[1];
    var tapname = fullurl.split("%2522%252C%2522last_name")[0].split("first_name%2522%253A%2522")[1];
    var tapfamily = fullurl.split("%2522%252C%2522username")[0].split("last_name%2522%253A%2522")[1];
    
    var buttonn = document.createElement("Button");
    buttonn.style.cssText =
      "BACKGROUND-COLOR: red;top: 0px; right: 0px; position: absolute; z-index: 99999; padding: 7px 12px; border-radius: 5px;border: none;color: #fff;background: rgb(62,22,149);background: linear-gradient(63deg, rgb(62, 22, 149) 0%, rgb(94, 61, 166) 100%);font-size: 13px;text-transform: uppercase;";
    buttonn.id = "sizifart";
    buttonn.innerHTML = tapname + " ( " + username + " )";
    document.body.appendChild(buttonn);
    
    var pauseButton = document.createElement("Button");
    pauseButton.style.cssText =
      "BACKGROUND-COLOR: yellow;top: 40px; right: 0px; position: absolute; z-index: 99999; padding: 7px 12px; border-radius: 5px;border: none;color: #000;background: rgb(255,255,0);font-size: 13px;text-transform: uppercase;";
    pauseButton.id = "pauseButton";
    pauseButton.innerHTML = "Pause";
    pauseButton.addEventListener("click", function () {
      togglePause();
      this.innerHTML = paused ? "Play" : "Pause";
    });
    document.body.appendChild(pauseButton);

    var backbutton = document.createElement("Button");
    backbutton.style.cssText =
      "display:none;BACKGROUND-COLOR: blue;bottom: 0px; right: 0px; position: absolute; z-index: 99999; padding: 3px 2px;";
    backbutton.id = "sizifart";
    backbutton.innerHTML = "Back";
    document.body.appendChild(backbutton);
    
    backbutton.addEventListener("click", async () => {
      try {
        Array.from(document.querySelectorAll("button")).find((el) => el.textContent.includes("Account")).click();
      } catch (err) {
        console.error(err.name, err.message);
      }
    });

    function getanswer(soal = "") {
      if (paused) return; // Skip function if paused
      var storedText = "";
      var answers = "NotFound";
      soal = soal.replace("+", "").replace("`", "");
      console.log("Shahan Question : ---" + soal + "---");
      
      fetch("https://raw.githubusercontent.com/rahanesh/TapswapAutoTaskClaimer/main/list.json")
        .then(response => response.text())
        .then(text => {
          storedText = text;
          done();
        });

      function done() {
        if (storedText) {
          const bigObj = JSON.parse(storedText, (key, value) => key === soal ? value : storedText);
          const input = document.evaluate(
            "/html/body/div/div[1]/div[2]/div[3]/div[2]/div/div[3]/div/div/input",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;

          if (storedText.includes("{")) storedText = "";

          if (input) {
            input.value = storedText;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            const close1 = Array.from(document.querySelectorAll("button")).find(el => el.textContent.includes("Submit"));
            if (close1) close1.click();
            setTimeout(() => close1.click(), 1000);
          }
          answers = storedText;
        } else {
          answers = "NotFound";
        }
        console.log("Shahan Answer : ---" + answers + "---");
      }
    }

    function taskHandler() {
      if (paused) return; // Skip task if paused

      const clos = document.querySelectorAll('img[alt="close"]')[0];
      const close1 = Array.from(document.querySelectorAll("button")).find(el => el.textContent.includes("Get it!"));
      const taskkk = Array.from(document.querySelectorAll("button")).find(el => el.textContent.includes("Task"));
      const relod = Array.from(document.querySelectorAll("button")).find(el => el.textContent.includes("Reload"));

      if (clos) clos.click();
      if (close1) close1.click();
      if (taskkk) taskkk.click();
      if (relod) location.reload();
    }

    setInterval(taskHandler, 2000);
  });
})();
