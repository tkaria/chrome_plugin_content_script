
// Cache for active port<->tab mapping
let tabPorts = {}
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log('you clicked the extension icon')
  console.log(tabPorts)
  port = tabPorts[tab.id]
  if (port) {
    // Send a message to the port to toggle its ID
    port.postMessage({'action': 'toggle', 'tabId': tab.id})
  }
})

// When connected to (as in from content script) run the function
chrome.runtime.onConnect.addListener(port => {
  let tabId = -1
  // Add a listener for the new connection
  port.onMessage.addListener((msg, sendingPort) => {
    tabId = sendingPort.sender.tab.id
    console.log('Background onMessage received messge from tab.id = ', tabId, ' msg was: ', msg)
    port.postMessage({action: 'I hear you tab ' + tabId, tabId: tabId})
    tabPorts[tabId] = port
    console.log(tabPorts)
  })
  port.onDisconnect.addListener(() => {
    delete tabPorts[tabId]
  })
})

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabPorts[tabId]
})

chrome.tabs.onReplaced.addListener((tabId) => {
  delete tabPorts[tabId]
})

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs.length > 1) {
    debugger
  }
  // eslint-disable-next-line
  let port = chrome.tabs.connect(tabs[0].id)
  console.log(port)
})
