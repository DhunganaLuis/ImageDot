class Segment {
    constructor(posX, posY, startX, startY) {
      this.x = posX;
      this.y = posY;
      this.startX = startX;
      this.startY = startY;
      this.color = '#000';
      this.size = 5;
    }
    draw(context) {
      context.beginPath();
      context.lineWidth = this.size;
      context.strokeStyle = this.color;
      context.moveTo(this.startX, this.startY);
      context.lineTo(this.x, this.y);
      context.stroke();
    }
  }
  function segmentStart(event) {
    if (canSegment) {
      shouldSegment = true;
      var startDragCoo = getMousePosition(canvas, event);
      starDragX = startDragCoo[0];
      starDragY = startDragCoo[1];
    }
  }
  function makeSegment(event) {
    if (shouldSegment) {
      refreshCanvas(context);
      var lastCoo = getMousePosition(canvas, event);
      var segment = new Segment(lastCoo[0], lastCoo[1], starDragX, starDragY);
      segment.size = segmentSize;
      segment.color = segmentColor;
      segment.draw(context);
      lastSegment = segment;
    }
  }
  function segmentStop() {
    if (lastSegment != undefined) {
      shouldSegment = false;
      segments.push(lastSegment);
      lastSegment = undefined;
    }
  }
  function segmentRedraw() {
    for (var i = 0; i < segments.length; i++) {
      segments[i].draw(context);
    }
  }
  function getSegmentSize() {
    var grandezza = document.getElementById("segmSize").value;
    segmentSize = grandezza;
    document.getElementById("Seg-size-value").innerHTML = grandezza;
    setSegmentSize();
  }
  function setSegmentSize() {
    if (segments != 0) {
      for (var i = 0; i < segments.length; i++) {
        segments[i].size = segmentSize;
      }
      refreshCanvas(context);
    }
  }
  function getSegmentColor() {
    var color = document.getElementById("segmColor").value;
    segmentColor = color;
    setSegmentColor();
  }
  function setSegmentColor() {
    if (segments != 0) {
      for (var i = 0; i < segments.length; i++) {
        segments[i].color = segmentColor;
      }
      refreshCanvas(context);
    }
  }