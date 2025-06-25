export function predictCluster(features, clusterLabels) {
    let maxIdx = features.indexOf(Math.max(...features));
    return clusterLabels[maxIdx];
  }