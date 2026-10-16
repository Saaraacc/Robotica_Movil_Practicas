---
title: Desarrollo
description: Planteamiento, lógica, decisiones y problemas encontrados.
sidebar:
  order: 2
---

<!-- EDITA: explica la idea en lenguaje natural ANTES de enseñar el código. -->

## Planteamiento

En primer lugar, el coche no tiene información sobre el circuito. Lo único que tiene es la imagen de su cámara así que debemos descartar la idea de planificar una ruta y nos centramos en crear un control reactivo. El coche mira dónde está la línea roja y corrige su dirección según lo que ve en ese momento. Al repetir esto termina recorriendo el circuito completo.

El problema se reduce a un único dato, el error, siendo la distancia en píxeles entre el centro de la línea y el centro de la imagen. Si el error es cero, el coche irá encima de la línea; si es positivo, la línea está a la derecha, y si es negativo, estará a la izquierda. Gracias al error decidiremos cuánto deberá girar el coche para ir centrado.

Para organizarlo, he dividido en cuatro partes el bucle infinito:
* Percepción: para filtrar el color rojo y localizar la línea en la imagen.
* Control de dirección: para calcular el giro con un controlador PID a partir del error.
* Control de velocidad: para conseguir ir más rápido en las rectas y poder frenar antes de las curvas.
* Búsqueda: para el caso en el que la línea deje de verse, girará hasta encontrarla de nuevo.


## Lógica y Decisiones

Creé el código poco a poco ajustando primero la dirección y después la velocidad. Primero comprobé que el filtro detectaba bien la línea, después añadí el controlador P con una velocidad baja y constante, luego el PD y por último el PID. Cuando el coche ya seguía la línea de una forma estable y oscilando lo menos posible empecé a subir la velocidad y a diferenciar entre rectas y curvas.

### Percepción de la línea

La imagen de la cámara llega en BGR y se pasa a HSV que separa el color (H), la saturación (S) y el brillo (V). Así conseguimos que el rojo se detecte igual aunque cambie la luz del circuito.

Utilizo dos rangos para controlar todos los tonos de rojo, de 0 a 10 y de 170 a 179 luego los junto en una máscara y utilizo una saturación y brillo mínimos para descartar píxeles grises u oscuros.

<img width="972" height="859" alt="image" src="https://github.com/user-attachments/assets/bb3bbee3-4aca-4102-80d2-5119ceab013f" />

*Círculo del tono (H) en OpenCV. El rojo queda en los dos extremos, por eso se usan dos rangos: 0–10 y 170–179.*

En cuanto a la máscara solo miro dos franjas horizontales:

| Franja | Altura | Para qué sirve |
| --- | --- | --- |
| Cercana | 72–82% | Calcular el error y controlar el giro |
| Lejana | 53–58% | Saber si viene una recta o una curva |

### Control PID

El giro se calcula a partir del error: la distancia entre la línea y el centro de la imagen.

```
W = −(Kp · error + Ki · integral + Kd · derivada)
```

* El signo menos se pone debido a que en el simulador, W positivo es girar a la izquierda.

El controlador tiene tres términos y cada uno corrige el giro de una forma:

1. P (proporcional): gira más cuanto más lejos esté la línea. Solo con el controlador P el coche hacía eses en las curvas.
2. D (derivativo): mira cuánto cambia el error entre las imágenes y frena el giro antes de pasarse. Con esto conseguí eliminar la mayoría de oscilaciones.
3. I (integral): se utiliza para acumular el error y corregir desvíos pequeños en una curva larga. La limito en ±3000.

Mis valores finales fueron:

| Kp | Ki | Kd |
| --- | --- | --- |
| 0,006 | 0,0001 | 0,02 |

<img width="1103" height="522" alt="image" src="https://github.com/user-attachments/assets/d105b896-3945-43ef-925a-71855cc7e88d" />

*Bucle de control. El error se calcula a partir de la imagen, pasa por los tres términos del PID y su suma da el giro del coche, que al moverse genera una nueva imagen.*

### Control de velocidad

La velocidad va cambiando dependiendo de lo que viene y para saber eso se mira la franja lejana:
* Recta, la línea está a menos de 25 px del centro y la velocidad es 9.
* Curva, bajará la velocidad dependiendo del error con un mínimo de 4,5. Cuanto más cerrada detecte la curva más despacio irá.
Al establecer los cambios de una manera gradual, en cada imagen se acelera como mucho 0,2 y se frena 0,5. De esta manera conseguimos eliminar los acelerones o frenazos bruscos.

### Búsqueda de la línea

En el caso de que se pierda la línea y no se vea en ninguna franja el coche se parará y girará sobre sí mismo:
1. Si hay rojo en cualquier parte de la imagen girará hacia ese lado.
2. Si no, hacia donde vio la línea por última vez.
3. Si no ha llegado a verla, a la izquierda por defecto.

## Dificultades y soluciones

* La integral arrastraba error: al salir de una curva, la integral seguía cargada y el coche iba desplazado en la recta. Entonces la vacío al entrar en una recta y cuando el error cambia de signo, es decir, cuando el coche cruza la línea.

* Frenazos: al principio la velocidad saltaba de golpe de la de recta a la curva. Así que lo cambié por una aceleración y frenada gradual.

* Limitaciones: si el coche empieza girado 90° o más podría encontrar la línea mirando hacia atrás y empezar a recorrer el circuito al revés. Debido a que solo con la cámara no puede saber el sentido.
