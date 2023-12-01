// Variabili e costanti globali
let fileInput = document.getElementById('fileinput');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Costanti
const MAIN_MOUSE_BUTTON = 0;

// Variabili punti
let dotCount = 1;
let dotColor = '#000';
let dotSize = 5;
let puntini = [];
let lastColorDot;
let pointSelected = -1;
let isConnectedPoint = false;
let isPressbtn = false;
let isSelectedPoint = false;
let shouldMoveDot = false;
let canMakePoint = false;

// Variabili linee
let xLine = 0;
let yLine = 0;
let widthLine = 4;
let colorLine = "#000";
let linee = [];
let canDraw = false;
let shouldDraw = false;

// Variabili rettangoli
let lastRect;
let rectSize = 5;
let rectColor = '#000';
let canRect = false;
let shouldRect = false;
let rettangoli = [];
let rectSelected = -1;
let lastColorRect;
let shouldMoveRect = false;

// Variabili ellissi
let ellSize = 5;
let ellColor = '#000';
let canEll = false;
let shouldEll = false;
let lastEll;
let ellissi = [];
var ellSelected = -1;
var shouldMoveEll = false;
var lastColorEll = '#000';

// Variabili segmenti
let segmentSize = 5;
let segmentColor = '#000';
let canSegment = false;
let shouldSegment = false;
let lastSegment;
let segments = [];

// Drag
let starDragX = 0;
let starDragY = 0;

// Immagine
let ImgSrc;

// Altre variabili
let isPressButton = false;
let canMove = false;