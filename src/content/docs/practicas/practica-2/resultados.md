---
title: Resultados
description: Análisis final.
sidebar:
  order: 3
---

<!-- EDITA: los números y las capturas son lo más valioso de esta página. -->

## Análisis

El coche completa de forma correcta la ejecución de todos los circuitos. Siguiendo la línea y realizando las menos oscilaciones posibles.

Estos son los valores finales utilizados en el controlador y velocidad para todos los circuitos:

| Kp | Ki | Kd | V recta | V curva | V mínima (curva) |
| --- | --- | --- | --- | --- | --- |
| 0,006 | 0,0001 | 0,02 | 9 | 5,5 | 4,5 |

### Circuito Simple

El circuito simple consiguió realizarse en 66,56 segundos.

<video controls width="100%" src="https://github.com/user-attachments/assets/917b76ca-2080-42aa-9e99-0ca5c8314d07"></video>

### Otros circuitos

| Circuito | Tiempo |
| --- | --- |
| Montmeló | 112,89 s |
| Montreal | 186,72 s |
| Nürburgring | 92,24 s |

#### Montmeló

<video controls width="100%" src="https://github.com/user-attachments/assets/80705c40-24f6-4fec-87a8-01806c940fce"></video>

#### Montreal

<video controls width="100%" src="https://github.com/user-attachments/assets/96fbe4a4-f4bb-4665-877d-3471b224f5f8"></video>

#### Nürburgring

<video controls width="100%" src="https://github.com/user-attachments/assets/f9353b62-ce0e-461b-99a5-145452bf69d6"></video>

### Búsqueda de la línea

Aquí el coche empieza girado y sin ver la línea en las franjas. Gira hacia el lado donde ve algo de rojo, se endereza y continúa el circuito en el sentido correcto.

<video controls width="100%" src="https://github.com/user-attachments/assets/83314ac8-25d7-4b5e-8b23-4ca297d8c132"></video>

En este otro vídeo mostramos cómo sin ver nada de rojo girará por defecto hacia la izquierda.

<video controls width="100%" src="https://github.com/user-attachments/assets/a1c16084-3ffe-42e8-bde2-92a16367894c"></video>

Por último en este otro muestro la limitación, en caso de estar girado hacia la izquierda, sin ver nada de rojo, al girar por defecto a la izquierda recorrerá el circuito al contrario.

<video controls width="100%" src="https://github.com/user-attachments/assets/8fef0289-8a4d-4e9d-925b-dd4f8ffeedc8"></video>
