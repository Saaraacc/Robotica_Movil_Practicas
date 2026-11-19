---
title: Conclusiones
description: Logros.
sidebar:
  order: 4
---

## Logros

He conseguido programar un taxi autónomo que usa solo el GPS y el mapa de la ciudad para llegar a cualquier punto de carretera que elija el usuario. Al elegir un destino se calcula un campo, suma de un subcampo de propagación y otro de penalización por cercanía a las paredes, que el coche consulta en cada iteración para decidir hacia dónde moverse y con qué velocidades.

El taxi recoge al cliente, espera un nuevo destino, replanifica si se cambia el destino a mitad de camino y rechaza los destinos que están sobre edificios. En todas las pruebas ha llegado sin rozar las esquinas y sin quedarse atascado.

Cada parte del algoritmo ha aportado algo concreto. La penalización cuadrática aparta al coche de las paredes sin crear casi mínimos locales, y disminuirla cerca del destino permite llegar aunque el cliente esté junto a una pared. Mirar en un círculo de 6 celdas, en lugar de solo los 8 vecinos, fue clave para que el coche no se quedara atascado, y el margen a las paredes compensa que el coche no es un punto. Parar la onda al alcanzar el taxi hizo el cálculo mucho más rápido, y la animación de la onda me ayudó a entender cómo se construye el campo.