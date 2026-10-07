---
title: Desarrollo
description: Planteamiento, lógica, decisiones, estados y problemas encontrados.
sidebar:
  order: 2
---

<!-- EDITA: explica la idea en lenguaje natural ANTES de enseñar el código. -->

## Planteamiento

En primer lugar, sabemos que la aspiradora no sabe dónde está situada en la casa por lo tanto descartamos directamente el planteamiento de rutas y nos centramos en la idea de la exploración aleatoria, que consistirá en avanzar hasta detectar un objeto, y sin chocarse cambiar de dirección al azar y repetir. Con muchas repeticiones el robot acaba pasando por la gran mayoría de la casa.

Para organizarlo, se crea un autómata de estados dentro de un bucle infinito. Partí de los tres estados iniciales avanzar, retroceder y girar, y después añadí un cuarto estado de espiral, con el fin de mejorar el barrido. Por lo tanto el autómata está formado por cuatro estados: AVANZANDO, RETROCEDIENDO, GIRANDO y ESPIRAL.


## Lógica y Decisiones

Empecé construyendo el código poco a poco, al principio solo con el estado AVANZANDO, para avanzar en línea recta y después fui añadiendo más estados una vez probado el funcionamiento. Después del AVANZANDO, añadí el estado para retroceder, RETROCEDIENDO, seguido del de giro, GIRANDO, primero con un ángulo fijo y después con un ángulo aleatorio. Al final añadí el estado ESPIRAL para cubrir aún más zonas de la casa.

Algunas decisiones importantes fueron:
* Detectar los choques, al estar el bumper desactivado se sustituye utilizando el láser. Si la distancia por delante bajaba de cierto valor, se consideraba la existencia de un obstáculo y se cambiaba de estado sin esperar al golpe.

* Control del tiempo sin sleep, al no estar permitido interrumpir el bucle, guardaba los instantes en los que empezaba cada estado para después mirar en cada vuelta cuánto tiempo llevaban, hacía uso de time.time(). Así, el bucle nunca se detiene y el robot puede reaccionar en cualquier momento.

* Giros aleatorios, para ello fijé una velocidad angular y sorteaba la duración del giro. Elegí esta manera por ser un modelo sencillo y porque realmente no importa hacia dónde mire exactamente el robot, solo que no salga en la misma dirección siempre.


## Estados

<img width="654" height="552" alt="image" src="https://github.com/user-attachments/assets/ea0adff6-14f4-4254-83ec-0598e5a31614" />

Figura 1. Recorrido de la aspiradora en un ciclo completo. Cuando se acerca a un obstáculo retrocede, gira y después sigue recto o hace una espiral, según el azar.

En cada vuelta el programa lee el láser, calcula la distancia mínima delante del robot y mira en qué estado está. Según el estado manda unas velocidades al robot y comprueba si tiene que cambiar a otro. Para eso utilizo unas variables compartidas como estado, inicio_estado (instante en que empezó el estado actual), duracion_giro y velocidad_giro. El robot comienza siempre en AVANZANDO.

### AVANZANDO

Se trata del estado base, en el que pasa la mayor parte del tiempo. El robot va recto a 0,4 m/s con velocidad angular 0 y no hace nada más hasta que algo se pone a menos de 0,2 m. En ese momento imprime el cambio, anota la hora de inicio del nuevo estado y pasa a RETROCEDIENDO.

Elegí 0,2 m para que así haya margen para frenar sin llegar a tocar el obstáculo. Con el bucle a 50 Hz, que es la frecuencia por defecto, el robot avanza menos de 1 cm entre lectura y lectura, así que la detección es bastante precisa.

### RETROCEDIENDO

El robot da marcha atrás a 0,2 m/s (la mitad de la velocidad de avance), el láser solo cubre la parte de delante y cuando retrocede va a ciegas por ello este estado es corto y lento.

Termina cuando hay más de 0,35 m libres delante, o cuando ha pasado 1 segundo, lo que ocurra antes. Con el límite de tiempo, como mucho retrocedería 20 cm, si no existiera tal límite y hubiera algún fallo en la lectura del láser podría hacer que el robot retrocediera sin parar. 

Al salir de este estado preparo el giro, primero sorteo cuánto durará el giro con un valor entre 0,5 y 2 segundos. Para ello utilizo random.uniform, donde cualquier valor del intervalo puesto tiene la misma probabilidad de salir. Después de esto, decido el sentido del giro comparando la zona izquierda y la derecha del láser. Giro hacia el lado donde el obstáculo más cercano esté más lejos. Si gana la izquierda, la velocidad angular es +2 rad/s y si gana la derecha, -2 rad/s. 
El lado se decide una sola vez, en este momento y se guarda en velocidad_giro. Así el robot no cambia de idea a mitad del giro.

### GIRANDO

El robot se queda en su sitio girando sobre sí mismo a 2 rad/s en el sentido que se eligió antes. Para salir de este estado tienen que cumplirse dos cosas, que haya pasado el tiempo sorteado y que delante haya más de 0,6 m libres. Si el tiempo ya ha pasado pero hay algo delante, sigue girando hasta que se despeje.

Esto tiene un riesgo, y es que el robot podría quedarse dando vueltas para siempre si estuviera rodeado. Para evitarlo hay un límite de 4 segundos. A 2 rad/s, 4 segundos son 8 rad, más de una vuelta completa, así que si no encuentra salida después de dar la vuelta entera, dejará de girar de todas formas.

Al terminar el giro se toma una decisión con random.random(), el 40% de las veces pasa a ESPIRAL y el 60% vuelve a AVANZANDO. 

### ESPIRAL

Para este estado, el robot avanza y gira a la vez, la velocidad lineal no es constante. Empieza en 0,12 m/s y sube 0,04 m/s por cada segundo que pasa, mientras que la velocidad angular se queda fija en 1 rad/s. Es la mitad de la velocidad de giro anterior y va hacia el mismo lado. Como el radio de la curva es v/w, el radio va creciendo y el recorrido se va abriendo en círculos más grandes. 

Luego, la espiral tiene dos salidas, si aparece un obstáculo a menos de 0,2 m pasa a RETROCEDIENDO igual que en el avance normal. Si no pasa nada, a los 4 segundos vuelve a AVANZANDO.

Solo se entra en la espiral justo después de un giro, y lo normal es que el giro haya terminado con más de 0,6 m libres delante, dejando espacio para empezar a abrir círculos. La excepción es cuando el giro acaba por el límite de 4 s.


## Dificultades y soluciones

Robot enganchado en mesas y sillas: Al principio solo miraba el rayo central del láser para detectar obstáculos, pero con mesas y sillas fallaba y se quedaba enganchado porque no las veía a tiempo, esto se debía a que un solo rayo puede pasar entre las patas o junto al borde de una mesa sin detectarlas. Para arreglarlo pasé a coger la distancia mínima de un abanico de 120º delante del robot (de los 30º a los 150º del láser), de forma que cualquier cosa que esté en esa zona se detecta aunque no esté justo en el centro. Con la misma idea añadí dos zonas a los lados, una a la izquierda y otra a la derecha, para comparar cuál estaba más despejada y así girar hacia ese lado.