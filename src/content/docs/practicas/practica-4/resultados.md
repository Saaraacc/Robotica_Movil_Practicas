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

<video controls width="100%" src="https://github.com/user-attachments/assets/d9ca1c0e-c3aa-4dc0-8e96-2c43d02b5a4c"></video>

### Varias carreras seguidas

Al llegar, el taxi se detiene y espera. Cada nuevo destino se planifica y se recorre sin reiniciar el programa.

<video controls width="100%" src="https://github.com/user-attachments/assets/11b9dc91-7df7-4ecc-9ac2-3168d6445555"></video>

### Cambio de destino a mitad de camino

Si se elige otro destino mientras el taxi va hacia el primero, se detiene, replanifica y se dirige al nuevo.

<video controls width="100%" src="https://github.com/user-attachments/assets/c52db731-aa49-4e6b-a29a-084682cf00fd"></video>

### Destino en un edificio

Al elegir un punto sobre un edificio, se muestra un aviso y el taxi no se mueve.

<video controls width="100%" src="https://github.com/user-attachments/assets/1ed79269-17a2-4a04-a850-f7d16708ed90"></video>
