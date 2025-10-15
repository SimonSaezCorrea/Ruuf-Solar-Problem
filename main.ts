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

  let maximoPaneles = 0;

  const filas1 = Math.floor(roofHeight / panelHeight);
  const columnas1 = Math.floor(roofWidth / panelWidth);
  let totalOrientacion1 = filas1 * columnas1;

  // Espacio restante en altura alturaRestanteWidth
  const alturaRestanteHeight = roofWidth % panelWidth;
  const alturaRestanteWidth = roofHeight % panelHeight;

  // Intentar colocar paneles girados en el espacio restante
  if (alturaRestanteWidth >= panelWidth) {
    const filas2 = Math.floor(alturaRestanteWidth / panelWidth);
    const columnas2 = Math.floor(roofWidth / panelHeight);
    const totalOrientacion2 = filas2 * columnas2;

    totalOrientacion1 = totalOrientacion1 + totalOrientacion2;
  }

  if (alturaRestanteHeight >= panelWidth) {
    const filas2 = Math.floor(alturaRestanteHeight / panelWidth);
    const columnas2 = Math.floor(roofHeight / panelHeight);
    const totalOrientacion2 = filas2 * columnas2;

    totalOrientacion1 = totalOrientacion1 + totalOrientacion2;
    
  }

  maximoPaneles = totalOrientacion1;

  // 🔹 Intentar dividir el techo en franjas verticales
  const columnas3 = Math.floor(roofHeight / panelWidth);
  const filas3 = Math.floor(roofWidth / panelHeight);
  let totalOrientacion3 = filas3 * columnas3;
  
  // Espacio restante en altura
  const alturaRestanteWidth2 = roofWidth % panelHeight;
  const alturaRestanteHeight2 = roofHeight % panelWidth;

  // Intentar colocar paneles girados en el espacio restante
  if (alturaRestanteWidth2 >= panelHeight) {
    const filas4 = Math.floor(alturaRestanteWidth2 / panelHeight);
    const columnas4 = Math.floor(roofWidth / panelWidth);
    const totalOrientacion4 = filas4 * columnas4;

    totalOrientacion3 = totalOrientacion3 + totalOrientacion4;
  }
  if (alturaRestanteHeight2 >= panelHeight) {
    const filas4 = Math.floor(alturaRestanteHeight2 / panelHeight);
    const columnas4 = Math.floor(roofHeight / panelWidth);
    const totalOrientacion4 = filas4 * columnas4;

    totalOrientacion3 = totalOrientacion3 + totalOrientacion4;
  }

  maximoPaneles = Math.max(maximoPaneles, totalOrientacion3);

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
