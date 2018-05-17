var findShortestPath = function(startCoordinates, grid) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];
  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start'
  };
  var queue = [location];
  while (queue.length > 0) {
    var currentLocation = queue.shift();
    var newLocation = exploreInDirection(currentLocation, 'Top', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, 'Right', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, 'Down', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }

    var newLocation = exploreInDirection(currentLocation, 'Left', grid);
    if (newLocation.status === 'Goal') {
      return newLocation.path;
    } else if (newLocation.status === 'Valid') {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;

};

var locationStatus = function(location, grid) {
  var gridSize = grid.length;
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (location.distanceFromLeft < 0 ||
      location.distanceFromLeft >= gridSize ||
      location.distanceFromTop < 0 ||
      location.distanceFromTop >= gridSize) {

    // location is not on the grid--return false
    return 'Invalid';
  } else if (grid[dft][dfl] === 'Goal') {
    return 'Goal';
  } else if (grid[dft][dfl] !== 'Empty') {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else {
    return 'Valid';
  }
};


var exploreInDirection = function(currentLocation, direction, grid) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'Top') {
    dft -= 1;
  } else if (direction === 'Right') {
    dfl += 1;
  } else if (direction === 'Down') {
    dft += 1;
  } else if (direction === 'Left') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown'
  };
  newLocation.status = locationStatus(newLocation, grid);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
  }

  return newLocation;
};
