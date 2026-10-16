---
title: Conclusiones
description: Logros.
sidebar:
  order: 4
---

## Logros

En esta práctica he conseguido programar un coche de Fórmula 1 que recorre el circuito siguiendo la línea roja usando solo la imagen de su cámara. El coche detecta la línea con un filtro de color en HSV, corrige su dirección con un controlador PID, adapta la velocidad según vea una recta o una curva y si pierde la línea gira hasta volver a encontrarla.

En el circuito simple se completa la vuelta en 66,56 segundos, dentro del rango propuesto en clase y también se consigue recorrer el resto de circuitos.

En cuanto al aprendizaje he podido observar qué aportaba cada término del PID. El proporcional seguía la línea recta pero hacía eses en las curvas, el derivativo eliminó las oscilaciones y el integral ayudó a corregir desviaciones. 

Por último, la práctica tiene sus limitaciones ya que el coche solo cuenta con cámara. Según lo girado que esté puede encontrar la línea mirando hacia atrás y recorrer el circuito al revés dado que la línea se ve igual en ambos sentidos.