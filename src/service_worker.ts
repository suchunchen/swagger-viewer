import { MessagePayload } from "src/universal/types/App"

chrome.action.onClicked.addListener((tab) => {
  if (tab.id == null) {
    throw new Error(`Unexpected tab: ${JSON.stringify(tab)}`)
  }

  chrome.tabs.sendMessage<MessagePayload>(tab.id, {
    type: "CALL_CONVERT_SWAGGER",
  })
})

chrome.contextMenus.create({
  id: "parent",
  title: 'Convert swagger',
  type: 'normal'
});

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((_item, tab) => {
  if (tab == null) {
    throw new Error(`Unexpected tab: ${JSON.stringify(tab)}`)
  }

  if (tab.id != null) {
    chrome.tabs.sendMessage<MessagePayload>(tab.id, {
      type: "CALL_CONVERT_SWAGGER",
    })
  }
});
