---
title: Conclusiones
description: Balance de la práctica 1.
sidebar:
  order: 4
---

## Logros

Con esta práctica eh conseguido programar una aspiradora de gama baja que limpia una casa moviéndose de forma pseudoaleatoria, sin saber donde está. El autómata de cuatro estados (AVANZANDO, RETROCEDIENDO, GIRANDO y ESPIRAL) funciona dentro de un bucle infinito, no usa sleep y detecta los obstáculos con el láser, sin necesitar el bumper. En la ejecución el vídeo recorrió un 71,40% de la casa en unos 27 minutos aproximadamente.

En cuanto al aprendizaje he comprobado lo mucho que afecta en el comportamiento del robot las pequeñas decisiones como mirar un solo rayo del láser o mirar un abanico de 120º, lo cuál terminó con los problemas de bloqueo con mesas o sillas. 

También he visto los límites de la práctica, porque como todo está en manos del azar el resultado cambia en cada ejecución y el robot no sabe que zonas ha limpiado. Por ello, puede pasar varias veces pro el mismo sitio y dejar otros sin tocar, está es la consecuencia de un robot sencillo sin mapa ni localización.

Por último, como posibles mejoras se podría ajusta mejor los tiempos de giro y de espiral o usar la orientación del robot para controlar los giros con mucha más precisión. Aún así, habría que comprobar si compensar o no la mejora con la complejidad añadida.