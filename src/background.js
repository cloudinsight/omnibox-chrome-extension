import $ from 'jquery';

let metrics = [];

/**
 * 重建索引
 */
const buildIndex = () => {
  $.getJSON('http://cloud.oneapm.com/metrics.json')
    .then(({result})=> {
      metrics = result.map(i => i.metric).sort();
    });
};

// 每次开始搜索时,重建索引
chrome.omnibox.onInputStarted.addListener(buildIndex);

chrome.omnibox.onInputChanged.addListener((text, suggest)=> {
  // 搜索前 10 个

  const matched = metrics
    .filter(item => item.indexOf(text) !== -1)
    .slice(0, 10);

  suggest(matched.map(i => ({
    content: i,
    description: i // @todo 读取指标的描述
  })));
});

chrome.omnibox.onInputEntered.addListener(text => {
  // 打开指标详情页面
  chrome.tabs.create({
    url: `https://cloud.oneapm.com/#/metrics/summary/${text}`
  });
});
