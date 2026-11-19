---
title: Conclusiones
description: Logros.
sidebar:
  order: 4
---

## Logros

En esta práctica he conseguido programar un coche de Fórmula 1 que recorre el circuito esquivando todos los obstáculos usando el algoritmo de navegación local VFF. El coche calcula una fuerza repulsiva a partir de las medidas del láser y una fuerza atractiva hacia cada subobjetivo, y con su suma decide en cada iteración la velocidad y el giro.

El coche completa la vuelta sin chocar con ningún obstáculo, tanto con los coches en su posición original como cambiándolos de sitio.

En cuanto al aprendizaje he podido ver qué aportaba cada parte del algoritmo. Al principio la repulsión salía enorme y apuntaba hacia atrás. Cuando dejé fija la componente de avance, el coche empezó a esquivar con decisión. Además, que los laterales pesaran menos quitó las oscilaciones entre las vallas, y la memoria local suavizó los tirones del láser. También me he apoyado en las flechas de la interfaz para entender qué estaba pasando.

Por último, la práctica tiene limitaciones propias del VFF. Por su miopía, el coche solo reaccionaba a lo que veía en cada momento y no planificaba por dónde había más hueco para pasar, así que a veces pasaba por el lado más estrecho de un obstáculo. Además, existe el caso en el que con un obstáculo justo delante y el subobjetivo detrás, las fuerzas no empujan hacia ningún lado y el coche se queda bloqueado. A esto lo llamamos mínimos locales, por ello hemos tenido que hacer que el coche elija un lado para poder esquivarlo.