// new proj/engine/src/features.js
export function extractFeatures(events, clusterLabels) {
  let counts = {};
  clusterLabels.forEach(label => counts[label] = 0);
  events.forEach(ev => {
    if (ev.type === 'click' && ev.elementData?.cluster) {
      counts[ev.elementData.cluster]++;
    }
  });
  return counts; // Return the full object
}