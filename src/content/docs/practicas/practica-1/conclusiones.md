---
title: Conclusiones
description: Logros.
sidebar:
  order: 4
---

## Logros

Con esta práctica he conseguido programar una aspiradora de gama baja que limpia una casa moviéndose de forma pseudoaleatoria, sin saber dónde está. El autómata de cuatro estados (AVANZANDO, RETROCEDIENDO, GIRANDO y ESPIRAL) funciona dentro de un bucle infinito, no usa sleep y detecta los obstáculos con el láser, sin necesitar el bumper. En la ejecución del vídeo se recorrió un 71,40% de la casa en unos 27 minutos.

En cuanto al aprendizaje, he comprobado lo mucho que afecta en el comportamiento del robot las pequeñas decisiones como mirar un solo rayo del láser o mirar un abanico de 120º, lo cual terminó con los problemas de bloqueo con mesas o sillas. 

También he visto los límites de la práctica, porque como todo está en manos del azar el resultado cambia en cada ejecución y el robot no sabe qué zonas ha limpiado. Por ello, puede pasar varias veces por el mismo sitio y dejar otros sin tocar, esta es la consecuencia de un robot sencillo sin mapa ni localización.

Por último, como posibles mejoras se podrían ajustar mejor los tiempos de giro y de espiral o usar la orientación del robot para controlar los giros con mucha más precisión. Aun así, habría que comprobar si compensa o no la mejora con la complejidad añadida.