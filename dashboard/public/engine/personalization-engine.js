import { trackClicks, trackScroll } from './src/tracking.js';
import { extractFeatures } from './src/features.js';
// The 'predictCluster' import is no longer needed for personalization
// import { predictCluster } from './src/ml.js'; 
import { personalize } from './src/dom.js';
import { clearBehaviorData } from './src/privacy.js';

// Read config from localStorage or use defaults
const savedConfig = JSON.parse(localStorage.getItem("personalization_config")) || {};
const savedABTest = JSON.parse(localStorage.getItem("ab_test_status")) || {};

const CONFIG = {
  parentSelector: '.personalize',
  trackingSelector: '.personalize > section',
  storageKey: 'user_behavior_data',
  // Use saved labels or fall back to the default list
  clusterLabels: savedConfig.clusterLabels || ['sports', 'politics', 'tech', 'other'],
  isABTestActive: savedABTest.isActive !== false // Default to true if not set
};

let behaviorData = JSON.parse(localStorage.getItem(CONFIG.storageKey)) || [];

function saveData() {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(behaviorData));
}

function runPersonalization() {
  // First, check if the A/B test is active
  const abTestStatus = JSON.parse(localStorage.getItem("ab_test_status")) || {};
  if (abTestStatus.isActive === false) {
    // If the test is explicitly inactive, do nothing.
    console.log("A/B Test is inactive. Personalization is disabled.");
    return;
  }

  const clickCounts = extractFeatures(behaviorData, CONFIG.clusterLabels);
  personalize(CONFIG.parentSelector, clickCounts);
}

function addTracking() {
  const sections = document.querySelectorAll(CONFIG.trackingSelector);
  trackClicks(sections, (event) => {
    behaviorData.push(event);
    saveData();
    runPersonalization();
  });
  trackScroll((event) => {
    behaviorData.push(event);
    saveData();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  addTracking();
  runPersonalization();
  // Expose controls for privacy
  window.AIPersonalizationEngine = {
    getBehaviorData: () => JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]'),
    clear: () => clearBehaviorData(CONFIG.storageKey)
  };
});