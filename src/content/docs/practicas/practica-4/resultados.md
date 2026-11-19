---
title: Resultados
description: Análisis final.
sidebar:
  order: 3
---

<!-- EDITA: los números y las capturas son lo más valioso de esta página. -->

## Análisis

El taxi llega siempre al destino por el centro de las calles, sin rozar ninguna esquina ni quedarse atascado, tanto en recorridos cortos como en recorridos largos con muchas curvas. En ninguna de las pruebas ha aparecido un mínimo local. 

Los parámetros finales que he utilizado son:

| Penalización máx. | Radio de seguridad | Margen de onda | Radio de mirada | Distancia mín. a pared | V máx. | W máx. | Ganancia K_W |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 20 | 6 celdas (7,5 m) | 30 | 6 celdas (7,5 m) | 2,5 celdas (3 m) | 10 m/s | 3,5 rad/s | 1,5 |

Se considera que el taxi ha llegado al cliente cuando está a menos de 3,75 m del destino. El subcampo de penalización tarda unos 0,8 s en calcularse y solo se calcula una vez. El de propagación, sin la animación, tarda entre 0,04 y 0,3 s según la distancia al destino.

### Carrera larga

Al elegir un destino lejano, la onda crece desde el destino hasta el taxi, se dibuja el camino sugerido y el coche lo recorre hasta recoger al cliente.

videooooooooo

### Varias carreras seguidas

Al llegar, el taxi se detiene y espera. Cada nuevo destino se planifica y se recorre sin reiniciar el programa.

videooooooo

### Cambio de destino a mitad de camino

Si se elige otro destino mientras el taxi va hacia el primero, se detiene, replanifica y se dirige al nuevo.

videooooooooo

### Destino en un edificio

Al elegir un punto sobre un edificio, se muestra un aviso y el taxi no se mueve.

videooooooo