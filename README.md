# Tarea Dev Junior - Ruuf

## 🎯 Objetivo

El objetivo de este ejercicio es poder entender tus habilidades como programador/a, la forma en que planteas un problema, cómo los resuelves y finalmente cómo comunicas tu forma de razonar y resultados.

## 🛠️ Problema

El problema a resolver consiste en encontrar la máxima cantidad de rectángulos de dimensiones "a" y "b" (paneles solares) que caben dentro de un rectángulo de dimensiones "x" e "y" (techo).

## 🚀 Cómo Empezar

### Opción 1: Solución en TypeScript
```bash
cd typescript
npm install
npm start
```

### Opción 2: Solución en Python
```bash
cd python
python3 main.py
```

## ✅ Casos de Prueba

Tu solución debe pasar los siguientes casos de prueba:
- Paneles 1x2 y techo 2x4 ⇒ Caben 4
- Paneles 1x2 y techo 3x5 ⇒ Caben 7
- Paneles 2x2 y techo 1x10 ⇒ Caben 0

---

## 📝 Tu Solución

[Link a youtube](https://youtu.be/UTqXnQfMr7k)

---

## 💰 Bonus (Opcional)

Si completaste alguno de los ejercicios bonus, explica tu solución aquí:

### Bonus Implementado
*[Indica cuál bonus implementaste: Opción 1 (techo triangular) o Opción 2 (rectángulos superpuestos)]*




### Explicación del Bonus
*[Explica cómo adaptaste tu algoritmo para resolver el bonus]*




---

## 🤔 Supuestos y Decisiones

Se decidio hacer un algoritmo que resuelva los 3 de los test_cases y algunos otros, sin considerar casos bordes en los cuales requería una mayor combinación de los rectangulos para sacar la mayor capacidad, como por ejemplo:

```
{
  "testCases": [
    {
      "panelW": 3,
      "panelH": 2,
      "roofW": 5,
      "roofH": 5,
      "expected": 5
    },
    {
      "panelW": 3,
      "panelH": 4,
      "roofW": 12,
      "roofH": 14,
      "expected": 14
    }
  ]
} 
```

El método para ordenar es buscar todos los espacios que se puedan colocar verticalmente u horizontalmente y lo sobrante ver si caben en la forma contraria a la puesta.

Un método para abarcar todos los casos posibles, es mediante una busqueda exahustiva de caso por caso, colocando cada rectangulo vertical y horizontalmente generando muchas posibilidades, pero es un algoritmo caro que no da a basto. Con una complejidad muy alta (Al rededor de O(N^4)) para ser puesta a prueba en este ejercicio (BES), pero adaptado para buscar todas la solución con mayor cantidad de rectangulos puestos (o que tenga puesto todos)
