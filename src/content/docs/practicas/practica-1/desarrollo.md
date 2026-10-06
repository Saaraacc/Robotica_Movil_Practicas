---
title: Desarrollo
description: Planteamiento, algoritmo y código de la práctica 1.
sidebar:
  order: 2
---

<!-- EDITA: explica la idea en lenguaje natural ANTES de enseñar el código. -->

## Planteamiento

En primer lugar, sabemos que la aspiradora no sabe donde está situada en la casa por lo tanto descartamos directamente el planteamiento de rutas y nos centramos en la idea de la exploración aleatoria, que consistirá en avanzar hasta detectar un objeto, y sin chocarse cambiar de dirección al azar y repetir. Con muchas repeticiones el robot acaba pasando por la gran mayoría de la casa.

Para organizarlo, se crea un autómata de estados dentro de un bucle infinito. Partí de los tres estados iniciales avanzar, retroceder y girar, y después añadí un cuarto estado de espiral, con el fin de mejorar el barrido. Por lo tanto el autómata está formado por cuatro estados: AVANZANDO, RETROCEDIENDO, GIRANDO y ESPIRAL.


## Lógica y Decisiones

Empecé contruyendo el código poco a poco, al principio solo con el estado AVANZANDO, para avanzar en línea recta y después fui añadiendo más estados una vez probado el funcionamiento. Después del AVANZANDO, añadí el estado para retroceder, RETROCEDIENDO, seguido del de giro, GIRANDO, primero con un ángulo fijo y después con un ángulo aleatorio. Al final añadí el estado ESPIRAL para cubrir aún más zonas de la casa.

Algunas decisiones importantes fueron:
* Detectar los choques, al estar el bumper desactivado se sustituye utilizando el láser. Si la distancia por delante bajaba de cierto valor, se consideraba la existencia de un obstáculo y se cambiaba de estado sin esperar al golpe.

* Controlas el tiempo sin sleep, al no estar permitido interrumpir el bucle, guardaba los instantes en los que empezaba cada estado para después mirar en cada vuelta cuánto tiempo llevaban, hacía uso de time.time(). Así, el bucle nunca se detiene y el robot puede reaccionar en cualquier momento.

* Giros aleatorios, para ello fijé una velocidad angular y sorteba la duración del giro. Elegí esta manera por ser un modelo sencillo y porque realmente no importa hacia donde mire exactamente el robot, solo que no salga en la misma dirección siempre.

<img width="654" height="552" alt="image" src="https://github.com/user-attachments/assets/ea0adff6-14f4-4254-83ec-0598e5a31614" />

Figura 1. Recorrido de la aspiradora en un ciclo completo. Cuando se acerca a un obstáculo retrocede, gira y después sigue recto o hace una espiral, según el azar.

## Estados



## Dificultades y soluciones

- Problema encontrado y cómo lo resolviste.
