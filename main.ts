import * as fs from 'fs';

interface TestCase {
  panelW: number;
  panelH: number;
  roofW: number;
  roofH: number;
  expected: number;
}

interface TestData {
  testCases: TestCase[];
}

function calculateByForm(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  const filas = Math.floor(roofHeight / panelHeight);
  const columnas = Math.floor(roofWidth / panelWidth);
  let totalOrientacion = filas * columnas;

  // Espacio restante en altura alturaRestanteWidth
  const alturaRestanteHeight = roofWidth % panelWidth;
  const alturaRestanteWidth = roofHeight % panelHeight;

  // Intentar colocar paneles girados en el espacio restante
  if (alturaRestanteWidth >= panelWidth) {
    const filasSobrantes = Math.floor(alturaRestanteWidth / panelWidth);
    const columnasSobrantes = Math.floor(roofWidth / panelHeight);
    const totalOrientacionSobrante = filasSobrantes * columnasSobrantes;

    totalOrientacion = totalOrientacion + totalOrientacionSobrante;
  }

  if (alturaRestanteHeight >= panelWidth) {
    const filasSobrantes = Math.floor(alturaRestanteHeight / panelWidth);
    const columnasSobrantes = Math.floor(roofHeight / panelHeight);
    const totalOrientacionSobrante = filasSobrantes * columnasSobrantes;

    totalOrientacion = totalOrientacion + totalOrientacionSobrante;

  }  
  
  return totalOrientacion;
}

function calculatePanels(
  panelWidth: number,
  panelHeight: number,
  roofWidth: number,
  roofHeight: number
): number {
  /*
   * w*h es la forma normalizada 
  */

  // Si el panel no cabe en ninguna orientación, no hay nada que hacer
  if (
    (panelWidth > roofWidth || panelHeight > roofHeight) &&
    (panelHeight > roofWidth || panelWidth > roofHeight)
  ) {
    return 0;
  }

  // Calcular ambas orientaciones y devolver la máxima
  // Orientación 1: panelWidth x panelHeight (normal)
  const totalOrientacionNormal = calculateByForm(panelWidth, panelHeight, roofWidth, roofHeight);

  // Orientación 2: panelHeight x panelWidth (girado)
  const totalOrientacionGirado = calculateByForm(panelHeight, panelWidth, roofWidth, roofHeight);

  const maximoPaneles = Math.max(totalOrientacionNormal, totalOrientacionGirado);

  return maximoPaneles;
}


function main(): void {
  console.log("🐕 Wuuf wuuf wuuf 🐕");
  console.log("================================\n");
  
  runTests();
}

function runTests(): void {
  const data: TestData = JSON.parse(fs.readFileSync('test_cases.json', 'utf-8'));
  const testCases = data.testCases;
  
  console.log("Corriendo tests:");
  console.log("-------------------");
  
  testCases.forEach((test: TestCase, index: number) => {
    const result = calculatePanels(test.panelW, test.panelH, test.roofW, test.roofH);
    const passed = result === test.expected;
    
    console.log(`Test ${index + 1}:`);
    console.log(`  Panels: ${test.panelW}x${test.panelH}, Roof: ${test.roofW}x${test.roofH}`);
    console.log(`  Expected: ${test.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

main();
