const form = document.getElementById("contact-form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  result.innerHTML = "Sending...";

  const formData = new FormData(form);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      let json = await response.json();

      if (response.status === 200) {
        result.innerHTML = "Message sent successfully!";
      } else {
        result.innerHTML = json.message;
      }
    })
    .catch(() => {
      result.innerHTML = "Something went wrong.";
    })
    .finally(() => {
      form.reset();
      setTimeout(() => {
        result.innerHTML = "";
      }, 3000);
    });
});

(function(){
  const correctCode = "SEND"; // 4-letter unlock code
  let userInput = "";
  const codeDisplay = document.getElementById("codeDisplay");
  const letterGrid = document.getElementById("letterGrid");
  const contactCard = document.getElementById("contactCard");
  const toggleBtn = document.getElementById("toggleBtn");
  const form = document.getElementById("contact-form");
  const result = document.getElementById("result");

  function generateLetters(){
    letterGrid.innerHTML = "";
    const letters = [...correctCode];
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    while(letters.length<12){ letters.push(alphabet[Math.floor(Math.random()*alphabet.length)]); }
    letters.sort(()=>Math.random()-0.5);
    letters.forEach(l=>{
      const btn = document.createElement("button");
      btn.type="button"; btn.className="letter-btn"; btn.textContent=l;
      btn.addEventListener("click", ()=>{
        if(userInput.length>=4) return;
        userInput+=l;
        updateDisplay();
        if(!toggleBtn.classList.contains("active")) toggleBtn.classList.add("active");
        if(userInput.length===4) checkCode();
      });
      letterGrid.appendChild(btn);
    });
  }

  function updateDisplay(){ codeDisplay.textContent = userInput.padEnd(4,"_").split("").join(" "); }

  function checkCode(){
    if(userInput===correctCode){
      contactCard.classList.add("unlocked");
      form.style.display="flex";
      document.querySelector(".code-ui").style.display="none";
      toggleBtn.style.display="none";
    } else {
      codeDisplay.classList.add("wrong");
      toggleBtn.classList.remove("active");
      setTimeout(()=>{
        codeDisplay.classList.remove("wrong");
        userInput="";
        updateDisplay();
        generateLetters();
      },600);
    }
  }

  // contact form submission
  form.addEventListener("submit", function(e){
    e.preventDefault();
    result.innerHTML="Sending...";
    const formData = new FormData(form);
    fetch("https://api.web3forms.com/submit", {method:"POST", body:formData})
      .then(async res=>{ let json=await res.json(); if(res.status===200){ result.innerHTML="Message sent successfully!"; } else { result.innerHTML=json.message; } })
      .catch(()=>{ result.innerHTML="Something went wrong."; })
      .finally(()=>{ form.reset(); setTimeout(()=>{ result.innerHTML=""; },3000); });
  });

  generateLetters();
  updateDisplay();
})();
