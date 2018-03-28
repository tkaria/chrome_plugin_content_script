let port = chrome.runtime.connect()
// Connect to background script and send a message
port.postMessage({message: 'hello from content script'})

port.onMessage.addListener((message) => {
  console.log('Content script received: ', message)
  switch (message.action) {
    case 'toggle':  
          toggleAnchor(document, message.tabId)
          break;
  }

})

function toggleAnchor (tabId) {
  document.getElementById('viq-anchor').classList.toggle('in')
}

(function addAnchor () {
  let anchor = document.getElementById('viq-anchor')
  if (anchor) {
    return
  }
  let viqAnchorDiv = document.createElement('iframe')
  viqAnchorDiv.addEventListener('transitionend', () => { console.log('I have finished animating')}, false);
  viqAnchorDiv.id = 'viq-anchor'
  // viqAnchorDiv.src = 'chrome-extension://kfpainkapdpnibpgdkacklmofembhmlm/dist/index.html#/EntityView'
  // viqAnchorDiv.src = 'https://www.ventureiq.nl'
  // viqAnchorDiv.classList.add('viqInvisible')
  // viqAnchorDiv.classList.add('viq-invisible')
  // viqAnchorDiv.margin  = 
  // viqAnchorDiv.innerHTML = tabId 
  viqAnchorDiv.onclick = ((e) => { 
    console.log(e);
    port.postMessage({'action': 'help'})
  })
  viqAnchorDiv.setAttribute('seamless', 'seamless')

  viqAnchorDiv.style = 'background-color: cornflowerblue; min-width: 400px; height: 600px; font-family: "sans-serif"; text-align:center; font-size: 10em; line-height: 1em; border:0;z-index:99999;position: fixed;right: -620px;top: 20px;'

  viqAnchorDiv.classList.add('slide')
  document.body.appendChild(viqAnchorDiv)
  
}())

// chrome.runtime.onConnect.addListener(function(port) {
//   port.onMessage.addListener(function(msg) {
//     port.postMessage({counter: msg.counter+1});
//   });
// });

// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     sendResponse({counter: request.counter+1});
//   })